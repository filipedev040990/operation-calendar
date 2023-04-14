export const eventSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      required: true,
      example: 'd8e9efde-1162-492c-8b26-588b598ccaac'
    },
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
  example: [
    {
      id: 'd8e9efde-1162-492c-8b26-588b598ccaac',
      calendar_id: 'd8dc0b4d-e438-4204-8173-58f8d96c2cc8',
      name: 'New Event',
      category: 'NORMAL',
      start_date: '2023-04-01 16:00:00',
      end_date: '2023-04-01 22:00:00'
    },
    {
      id: 'dfed3c59-1ce2-42dd-9504-1749d80c96b8',
      calendar_id: '4a950ad2-d5fb-43ac-8bc8-d03f11ca1c5d',
      name: 'Old Event',
      category: 'WARNING',
      start_date: '2023-01-01 00:00:00',
      end_date: '2023-01-01 23:59:00'
    }
  ]
}
