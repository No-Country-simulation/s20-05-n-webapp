const getAllMovement = {
  get: {
    tags: ['Movimientos'],
    summary: 'Obtener todos los movimientos',
    description: 'Devuelve una lista de todos los movimientos registrados en el sistema.',
    security: [
      {
        BearerAuth: []
      }
    ],
    responses: {
      200: {
        description: 'Lista de movimientos obtenida correctamente',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                    description: 'ID del movimiento',
                    example: '123e4567-e89b-12d3-a456-426614174001'
                  },
                  sku: {
                    type: 'string',
                    description: 'SKU del movimiento',
                    example: 'SKU-034'
                  },
                  name: {
                    type: 'string',
                    description: 'Descripción ampliada del movimiento',
                    example: 'Venta de herramienta',
                    nullable: true
                  },
                  type: {
                    type: 'string',
                    description: 'Tipo de movimiento',
                    enum: ['Entrada', 'Salida'],
                    example: 'Entrada'
                  },
                  motive: {
                    type: 'string',
                    enum: ['devolución', 'reabastecimiento', 'venta', 'caducidad', 'dañado'],
                    description: 'Motivo del movimiento',
                    example: 'reabastecimiento'
                  },
                  movQuantity: {
                    type: 'integer',
                    description: 'Cantidad del movimiento',
                    example: 10
                  },
                  userId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'ID del usuario que realizó el movimiento',
                    example: '123e4567-e89b-12d3-a456-426614174000'
                  },
                  productId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'ID del producto relacionado con el movimiento',
                    example: '077eff87-4076-4c01-938c-5623c91aedc2'
                  },
                  createdAt: {
                    type: 'string',
                    format: 'date-time',
                    description: 'Fecha de creación del movimiento'
                  },
                  updatedAt: {
                    type: 'string',
                    format: 'date-time',
                    description: 'Fecha de actualización del movimiento'
                  }
                }
              }
            }
          }
        }
      },
      500: {
        description: 'Error interno del servidor'
      }
    }
  }
};

export default getAllMovement;
