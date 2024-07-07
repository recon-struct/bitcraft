import { getIsLittleEndian } from '@recon-struct/utils'
import type { Struct, StructValue } from '~/types'

/**
 * Sets the values of a given struct in a DataView at the specified offset.
 *
 * @typeParam A - The type of the DataView.
 * @typeParam B - The type of the struct.
 * @typeParam C - The type of the offset.
 * @typeParam D - The type of the struct value.
 * @typeParam E - The type of the isLittleEndian flag.
 * @param {A} view - The DataView to set the values in.
 * @param {B} struct - The struct whose values need to be set.
 * @param {C} offset - The offset at which to set the values.
 * @param {D} value - The value of the struct.
 * @param {E} isLittleEndian - Optional. The flag indicating whether the DataView is little endian.
 * @throws If the offset is outside the bounds of the buffer.
 * @category Struct
 */
const viewSet = <
  A extends DataView,
  B extends Struct,
  C extends number,
  D extends StructValue<B>,
  E extends boolean = boolean,
>(
  view: A,
  struct: B,
  offset: C,
  value: D,
  isLittleEndian: E = getIsLittleEndian() as E,
) => {
  const { byteLength: structByteLen } = struct
  const {
    buffer: { byteLength: bufferByteLen },
  } = view
  const end = offset + structByteLen

  if (end > bufferByteLen) {
    throw new RangeError('Offset is outside the bounds of the buffer')
  }

  let localOffset = 0

  const traverseStruct = <F extends Struct, G extends StructValue<F>>(
    currentStruct: F,
    currentvalue: G,
  ) => {
    if (currentStruct.type === 'Tuple') {
      for (let i = 0; i < currentStruct.items.length; i++) {
        traverseStruct(currentStruct.items[i], (currentvalue as any[])[i])
      }
    } else {
      const { byteLength, type } = currentStruct
      const methodName = `set${type}` as const

      // FIXME hackish
      ;(view[methodName] as any)(
        offset + localOffset,
        currentvalue,
        isLittleEndian,
      )
      localOffset += byteLength
    }
  }

  traverseStruct(struct, value)
}

export default viewSet
