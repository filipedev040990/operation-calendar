export const calendarPath = {
  post: {
    tags: ['Calendar'],
    summary: 'Cadastra um novo calendário.',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addCalendarInputSchema'
          }
        }
      }
    },
    responses: {
      201: {
        description: 'Sucesso.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/addCalendarOutputSchema'
            }
          }
        }
      },
      400: {
        description: 'Requisição inválida.',
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
  },
  get: {
    tags: ['Calendar'],
    summary: 'Lista os calendários cadastrados.',
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
  },
  put: {
    tags: ['Calendar'],
    summary: 'Atualiza dados de calendário cadastrado.',
    parameters: [{
      in: 'path',
      name: 'id',
      required: true,
      schema: {
        type: 'string'
      }
    }],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addCalendarInputSchema'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Sucesso.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/addCalendarOutputSchema'
            }
          }
        }
      },
      400: {
        description: 'Requisição inválida.',
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
  },
  delete: {
    tags: ['Calendar'],
    summary: 'Deleta um calendário cadastrado.',
    parameters: [{
      in: 'path',
      name: 'id',
      required: true,
      schema: {
        type: 'string'
      }
    }],
    responses: {
      204: {
        description: 'Sucesso.'
      },
      400: {
        description: 'Requisição inválida.',
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
