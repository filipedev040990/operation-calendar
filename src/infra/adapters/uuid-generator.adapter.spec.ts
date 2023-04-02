import crypto from 'crypto'
import { UUIDGeneratorAdapter } from './uuid-generator.adapter'

jest.mock('crypto')

describe('UUIDGeneratorAdapter', () => {
  test('should call randomUUID', () => {
    const sut = new UUIDGeneratorAdapter()

    sut.uuid()

    expect(crypto.randomUUID).toHaveBeenCalledTimes(1)
  })
})
