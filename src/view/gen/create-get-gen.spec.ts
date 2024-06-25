import { describe, expect, it } from 'bun:test'
import { u8 } from '../../data-types'
import createGetGen from './create-get-gen'

describe('createGetGen', () => {
  it('should create a get generator', () => {
    const view = new DataView(new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]).buffer)
    const struct = u8
    const getGen = createGetGen(view, struct, 0)

    const actual = Array.from(getGen)
    const expected = [1, 2, 3, 4, 5, 6, 7, 8]
    expect(actual).toEqual(expected)
  })

  it('should create a get generator with offset', () => {
    const view = new DataView(new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]).buffer)
    const struct = u8
    const getGen = createGetGen(view, struct, 4)

    const actual = Array.from(getGen)
    const expected = [5, 6, 7, 8]
    expect(actual).toEqual(expected)
  })
})
