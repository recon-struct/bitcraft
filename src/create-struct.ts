import type { Struct, StructTuple } from './types'

/**
 * Creates a tuple-like structure from an array of structs.
 *
 * @param structs - An array of structs.
 * @returns A tuple-like structure containing the input structs.
 * @category Struct
 */
const createStruct = <A extends Struct[]>(
  structs: [...A],
): StructTuple<typeof structs> => {
  return {
    type: 'Tuple',
    items: structs,
    byteLength: structs.reduce(
      (acc, { byteLength }) => acc + byteLength,
      0 as any,
    ),
  }
}

export default createStruct
