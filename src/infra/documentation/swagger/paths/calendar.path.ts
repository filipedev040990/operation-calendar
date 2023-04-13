export const calendarPath = {
  get: {
    tags: ['Calendar'],
    summary: 'Lista todos os calendários cadastrados.',
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/calendarSchema'
            }
          }
        }
      }
    }
  }
}
