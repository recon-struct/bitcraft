import type { Add } from '@recon-struct/utility-types/dist/math/add'
import * as DataTypes from './data-types'

export type BigIntTypes = 'BigInt64' | 'BigUint64'

export type StructData = (typeof DataTypes)[keyof typeof DataTypes]

export interface StructTuple<A extends Struct[] = Struct[]> {
  type: 'Tuple'
  items: A
  byteLength: TupleByteLength<A>
}

export type Struct = StructData | StructTuple

export type TupleByteLength<
  A extends Struct[],
  B extends number | bigint = 0,
> = A extends []
  ? B
  : A extends [infer C extends Struct, ...infer E extends Struct[]]
    ? TupleByteLength<E, Add<C['byteLength'], B>>
    : B

export type Scalar = number | bigint

export type ScalarArray = (Scalar | ScalarArray)[]

export type StructDataValue<A extends StructData> =
  A['type'] extends BigIntTypes ? bigint : number

export type StructTupleValues<
  A extends Struct[],
  B extends ScalarArray = [],
> = A extends []
  ? B
  : A extends [infer C extends Struct, ...infer D extends Struct[]]
    ? StructTupleValues<D, [...B, StructValue<C>]>
    : B

export type StructValue<A extends Struct> = A extends StructData
  ? StructDataValue<A>
  : A extends StructTuple<infer B>
    ? StructTupleValues<B>
    : never
