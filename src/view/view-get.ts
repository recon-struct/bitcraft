import { getIsLittleEndian } from '@recon-struct/utils'
import type { Struct, StructValue } from '~/types'

/**
 * Retrieves structured data from a DataView object based on a given struct definition.
 *
 * @param view - The DataView object to retrieve data from.
 * @param struct - The struct definition that describes the data structure.
 * @param offset - The offset within the DataView object to start retrieving data from.
 * @param isLittleEndian - Optional. Specifies whether the data is in little-endian byte order. Defaults to the system's endianness.
 * @returns The structured data retrieved from the DataView object.
 * @throws If the offset is outside the bounds of the DataView object's buffer.
 * @category Struct
 */
const viewGet = <
  A extends DataView,
  B extends Struct,
  C extends number,
  D extends boolean = boolean,
>(
  view: A,
  struct: B,
  offset: C,
  isLittleEndian = getIsLittleEndian() as D,
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

  const traverseStruct = <E extends Struct>(
    currentStruct: E,
  ): StructValue<E> => {
    if (currentStruct.type === 'Tuple') {
      const items = []

      for (let i = 0; i < currentStruct.items.length; i++) {
        items.push(traverseStruct(currentStruct.items[i]))
      }

      return items as StructValue<E>
    } else {
      const { byteLength, type } = currentStruct
      const methodName = `get${type}` as const

      const result = view[methodName](offset + localOffset, isLittleEndian)

      localOffset += byteLength

      return result as StructValue<E>
    }
  }

  return traverseStruct(struct) as StructValue<B>
}

export default viewGet
