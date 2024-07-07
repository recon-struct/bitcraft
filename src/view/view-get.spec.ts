import { describe, expect, it } from 'bun:test'
import createStruct from '../create-struct'
import { u16, u8 } from '../data-types'
import viewGet from './view-get'

describe('viewGet', () => {
  it('should get the dataStruct', () => {
    const view = new DataView(new ArrayBuffer(1))
    const expected = 8
    view.setUint8(0, expected)
    const actual = viewGet(view, u8, 0)

    expect(actual).toBe(expected)
  })

  it('should get the dataStruct with offset', () => {
    const view = new DataView(new ArrayBuffer(2))
    const expected = 8
    view.setUint8(1, expected)
    const actual = viewGet(view, u8, 1)

    expect(actual).toBe(expected)
  })

  it('should get the dataStruct with struct', () => {
    const view = new DataView(new ArrayBuffer(3))
    const struct = createStruct([u8, u16])
    const expected = [8, 0]
    view.setUint8(0, expected[0])
    view.setUint16(1, expected[1])
    const actual = viewGet(view, struct, 0)

    expect(actual).toEqual(expected)
  })

  it('should get the dataStruct with struct and offset', () => {
    const view = new DataView(new ArrayBuffer(4))
    const struct = createStruct([u8, u16])
    const expected = [8, 0]
    view.setUint8(1, expected[0])
    view.setUint16(2, expected[1])
    const actual = viewGet(view, struct, 1)

    expect(actual).toEqual(expected)
  })

  it('should throw a RangeError if the offset is outside the bounds of the buffer', () => {
    const view = new DataView(new ArrayBuffer(1))

    expect(() => viewGet(view, u8, 1)).toThrow(RangeError)
  })

  it('should throw a RangeError if the offset is outside the bounds of the buffer with struct', () => {
    const view = new DataView(new ArrayBuffer(1))
    const struct = createStruct([u8, u16])

    expect(() => viewGet(view, struct, 1)).toThrow(RangeError)
  })

  it('should get the dataStruct with little-endian byte order', () => {
    const view = new DataView(new ArrayBuffer(2))
    const expected = 2048
    view.setUint16(0, expected, true)
    const actual = viewGet(view, u16, 0, true)

    expect(actual).toBe(expected)
  })

  it('should get the dataStruct with little-endian byte order and offset', () => {
    const view = new DataView(new ArrayBuffer(3))
    const expected = 2048
    view.setUint16(1, expected, true)
    const actual = viewGet(view, u16, 1, true)

    expect(actual).toBe(expected)
  })

  it('should get the dataStruct with big-endian byte order', () => {
    const view = new DataView(new ArrayBuffer(2))
    const expected = 8
    view.setUint16(0, expected, false)
    const actual = viewGet(view, u16, 0, false)

    expect(actual).toBe(expected)
  })

  it('should get the dataStruct with big-endian byte order and offset', () => {
    const view = new DataView(new ArrayBuffer(3))
    const expected = 8
    view.setUint16(1, expected, false)
    const actual = viewGet(view, u16, 1, false)

    expect(actual).toBe(expected)
  })
})
