export const addCalendarInputSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      required: true,
      example: 'New Calendar'
    }
  }
}
