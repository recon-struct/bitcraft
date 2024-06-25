import type { Struct } from '~/types'

/**
 * Extends the given buffer by the length of the data.
 *
 * @param buffer - The buffer to extend.
 * @param struct - The data to append to the buffer.
 * @category Struct
 */
const bufferExtend = (buffer: ArrayBuffer, struct: Struct) => {
  buffer.resize(buffer.byteLength + struct.byteLength)
}

export default bufferExtend
