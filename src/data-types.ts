export const u8 = {
  type: 'Uint8',
  byteLength: 1,
} as const

export const u16 = {
  type: 'Uint16',
  byteLength: 2,
} as const

export const u32 = {
  type: 'Uint32',
  byteLength: 4,
} as const

export const i8 = {
  type: 'Int8',
  byteLength: 1,
} as const

export const i16 = {
  type: 'Int16',
  byteLength: 2,
} as const

export const i32 = {
  type: 'Int32',
  byteLength: 4,
} as const

// NOTE: Float16 is not supported by TypeScript yet
// export const Float16 = {
//   type: 'Float16',
//   byteLength: 2
//  as const,

export const f32 = {
  type: 'Float32',
  byteLength: 4,
} as const

export const f64 = {
  type: 'Float64',
  byteLength: 8,
} as const

export const i64 = {
  type: 'BigInt64',
  byteLength: 8,
} as const

export const u64 = {
  type: 'BigUint64',
  byteLength: 8,
} as const
