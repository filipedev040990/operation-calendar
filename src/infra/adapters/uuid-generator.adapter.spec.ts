import crypto from 'crypto'
import { UUIDGeneratorAdapter } from './uuid-generator.adapter'

jest.mock('crypto', () => ({
  randomUUID: jest.fn().mockReturnValue('anyUUID')
}))

describe('UUIDGeneratorAdapter', () => {
  test('should call randomUUID', () => {
    const sut = new UUIDGeneratorAdapter()

    sut.uuid()

    expect(crypto.randomUUID).toHaveBeenCalledTimes(1)
  })

  test('should return an uuid', () => {
    const sut = new UUIDGeneratorAdapter()

    const uuid = sut.uuid()

    expect(uuid).toBe('anyUUID')
  })
})
