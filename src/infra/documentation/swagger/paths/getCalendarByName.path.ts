export const getCalendarByNamePath = {
  get: {
    tags: ['Calendar'],
    summary: 'Lista um calendário pelo nome.',
    parameters: [{
      in: 'path',
      name: 'name',
      required: true,
      schema: {
        type: 'string'
      }
    }],
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/addCalendarOutputSchema'
            }
          }
        }
      },
      400: {
        description: 'Nome inválido.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/errorSchema'
            }
          }
        }
      },
      500: {
        description: 'Erro interno do servidor.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/errorSchema'
            }
          }
        }
      }
    }
  }
}
