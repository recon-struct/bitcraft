import { describe, expect, it } from 'bun:test'
import { u16, u8 } from '../data-types'
import bufferExtend from './buffer-extend'

describe('bufferExtend', () => {
  it('should extend the buffer', () => {
    const buffer = new ArrayBuffer(0, { maxByteLength: 1 })

    bufferExtend(buffer, u8)

    expect(buffer.byteLength).toBe(1)
  })

  it('should extend the buffer with offset', () => {
    const buffer = new ArrayBuffer(1, { maxByteLength: 2 })

    bufferExtend(buffer, u8)

    expect(buffer.byteLength).toBe(2)
  })

  it('should extend the buffer appropriately for multi-byte structs', () => {
    const buffer = new ArrayBuffer(0, { maxByteLength: 2 })

    bufferExtend(buffer, u16)

    expect(buffer.byteLength).toBe(2)
  })

  it('should extend the buffer with offset for multi-byte structs', () => {
    const buffer = new ArrayBuffer(1, { maxByteLength: 3 })

    bufferExtend(buffer, u16)

    expect(buffer.byteLength).toBe(3)
  })
})
