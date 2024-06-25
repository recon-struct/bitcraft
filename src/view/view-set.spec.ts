import { describe, expect, it } from 'bun:test'
import createStruct from '../create-struct'
import { u16, u8 } from '../data-types'
import viewSet from './view-set'

describe('viewSet', () => {
  it('should set the dataStruct', () => {
    const view = new DataView(new ArrayBuffer(1))
    viewSet(view, u8, 0, 8)

    expect(view.getUint8(0)).toBe(8)
  })

  it('should set the dataStruct with offset', () => {
    const view = new DataView(new ArrayBuffer(2))
    viewSet(view, u8, 1, 8)

    expect(view.getUint8(1)).toBe(8)
  })

  it('should set the dataStruct with offset and littleEndian', () => {
    const view = new DataView(new ArrayBuffer(2))
    viewSet(view, u16, 0, 0x1234, true)

    expect(view.getUint16(0, true)).toBe(0x1234)
  })

  it('should set the dataStruct with offset and bigEndian', () => {
    const view = new DataView(new ArrayBuffer(2))
    viewSet(view, u16, 0, 0x1234, false)

    expect(view.getUint16(0, false)).toBe(0x1234)
  })

  it('should support dataTuple', () => {
    const view = new DataView(new ArrayBuffer(2))
    viewSet(view, createStruct([u8, u8]), 0, [8, 16])

    expect(view.getUint8(0)).toBe(8)
    expect(view.getUint8(1)).toBe(16)
  })

  it('should support nested dataTuple', () => {
    const s = createStruct([u8, createStruct([u8, u8])])
    const view = new DataView(new ArrayBuffer(3))
    viewSet(view, s, 0, [8, [16, 32]])

    expect(view.getUint8(0)).toBe(8)
    expect(view.getUint8(1)).toBe(16)
    expect(view.getUint8(2)).toBe(32)
  })
})
