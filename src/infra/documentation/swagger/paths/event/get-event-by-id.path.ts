export const GetEventById = {
  get: {
    tags: ['Event'],
    summary: 'Lista evento pelo Id',
    parameters: [{
      in: 'path',
      name: 'id',
      required: true,
      schema: {
        type: 'string'
      },
      example: 'dfed3c59-1ce2-42dd-9504-1749d80c96b8'
    }],
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/addEventOutputSchema'
            }
          }
        }
      },
      204: {
        description: 'Sem conteúdo'
      },
      400: {
        description: 'Requisição inválida',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  example: 'Invalid param: id'
                }
              }
            }
          }
        }
      },
      500: {
        description: 'Erro interno do servidor.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/serverErrorSchema'
            }
          }
        }
      }
    }
  }
}
