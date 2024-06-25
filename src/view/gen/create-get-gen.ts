import { getIsLittleEndian } from '@recon-struct/utils'
import type { Struct } from '../../types'
import viewGet from '../view-get'

/**
 * Creates a generator function that iterates over a DataView and yields values based on a given Struct.
 *
 * @generator
 * @param {DataView} view - The DataView to iterate over.
 * @param {Struct} struct - The Struct that defines the structure of the data.
 * @param {number} [offset=0] - The starting offset within the DataView.
 * @param {boolean} [isLittleEndian=getIsLittleEndian()] - Indicates whether the data is in little endian format.
 * @yields {any} The value extracted from the DataView based on the Struct.
 * @category Struct
 */
function* createGetGen(
  view: DataView,
  struct: Struct,
  offset: number = 0,
  isLittleEndian: boolean = getIsLittleEndian(),
) {
  const bufferLength = view.buffer.byteLength
  let localOffset = offset

  while (localOffset < bufferLength) {
    const value = viewGet(view, struct, localOffset, isLittleEndian)
    localOffset += struct.byteLength

    yield value
  }
}

export default createGetGen
