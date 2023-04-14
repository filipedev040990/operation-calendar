export const addEventInputSchema = {
  type: 'object',
  properties: {
    calendar_id: {
      type: 'string',
      required: true,
      example: 'd8dc0b4d-e438-4204-8173-58f8d96c2cc8'
    },
    name: {
      type: 'string',
      required: true,
      example: 'New Event'
    },
    category: {
      type: 'string',
      enum: ['NORMAL', 'WARNING', 'CRITICAL'],
      required: true,
      example: 'NORMAL'
    },
    start_date: {
      type: 'Date',
      required: true,
      example: '2023-04-01 16:00:00'
    },
    end_date: {
      type: 'Date',
      example: '2023-04-01 22:00:00'
    }
  },
  example: {
    calendar_id: 'd8dc0b4d-e438-4204-8173-58f8d96c2cc8',
    name: 'New Event',
    category: 'NORMAL',
    start_date: '2023-04-01 16:00:00',
    end_date: '2023-04-01 22:00:00'
  }
}
