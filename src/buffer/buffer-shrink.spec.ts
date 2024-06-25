import { describe, expect, it } from 'bun:test'
import { u16, u8 } from '../data-types'
import bufferShrink from './buffer-shrink'

describe('bufferShrink', () => {
  it('should shrink the buffer', () => {
    const buffer = new ArrayBuffer(1, { maxByteLength: 1 })

    bufferShrink(buffer, u8)

    expect(buffer.byteLength).toBe(0)
  })

  it('should shrink the buffer with offset', () => {
    const buffer = new ArrayBuffer(2, { maxByteLength: 2 })

    bufferShrink(buffer, u8)

    expect(buffer.byteLength).toBe(1)
  })

  it('should shrink the buffer appropriately for multi-byte structs', () => {
    const buffer = new ArrayBuffer(2, { maxByteLength: 2 })

    bufferShrink(buffer, u16)

    expect(buffer.byteLength).toBe(0)
  })

  it('should shrink the buffer with offset for multi-byte structs', () => {
    const buffer = new ArrayBuffer(3, { maxByteLength: 3 })

    bufferShrink(buffer, u16)

    expect(buffer.byteLength).toBe(1)
  })
})
