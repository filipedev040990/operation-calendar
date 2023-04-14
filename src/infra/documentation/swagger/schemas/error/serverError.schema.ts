export const serverErrorSchema = {
  type: 'object',
  properties: {
    error: {
      type: 'string',
      example: 'Internal server error'
    }
  }
}
