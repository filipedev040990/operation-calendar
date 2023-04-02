import { UUIDGeneratorInterface } from '@/application/interfaces'
import crypto from 'crypto'

export class UUIDGeneratorAdapter implements UUIDGeneratorInterface {
  uuid (): string {
    return crypto.randomUUID()
  }
}
