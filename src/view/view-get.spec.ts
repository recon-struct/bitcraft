import { describe, expect, it } from 'bun:test'
import createStruct from '../create-struct'
import { u16, u8 } from '../data-types'
import viewGet from './view-get'

describe('viewGet', () => {
  it('should get the dataStruct', () => {
    const view = new DataView(new ArrayBuffer(1))
    view.setUint8(0, 8)

    expect(viewGet(view, u8, 0)).toBe(8)
  })

  it('should get the dataStruct with offset', () => {
    const view = new DataView(new ArrayBuffer(2))
    view.setUint8(1, 8)

    expect(viewGet(view, u8, 1)).toBe(8)
  })

  it('should get the dataStruct with offset and littleEndian', () => {
    const view = new DataView(new ArrayBuffer(2))
    view.setUint16(0, 0x1234, true)

    expect(viewGet(view, u16, 0, true)).toBe(0x1234)
  })

  it('should get the dataStruct with offset and bigEndian', () => {
    const view = new DataView(new ArrayBuffer(2))
    view.setUint16(0, 0x1234, false)

    expect(viewGet(view, u16, 0, false)).toBe(0x1234)
  })

  it('should support dataTuple', () => {
    const s = createStruct([u8, u8])
    const view = new DataView(new ArrayBuffer(2))
    view.setUint8(0, 8)
    view.setUint8(1, 16)

    expect(viewGet(view, s, 0)).toEqual([8, 16])
  })

  it('should support nested dataTuple', () => {
    const s = createStruct([u8, createStruct([u8, u8])])
    const view = new DataView(new ArrayBuffer(3))
    view.setUint8(0, 8)
    view.setUint8(1, 16)
    view.setUint8(2, 32)

    expect(viewGet(view, s, 0)).toEqual([8, [16, 32]])
  })
})
