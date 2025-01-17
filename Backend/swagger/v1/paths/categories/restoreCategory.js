const restoreCategory = {
    put: {
        tags: ['Categorías'],
        summary: 'Restaurar categoría eliminada',
        description: 'Restaura una categoría que ha sido eliminada lógicamente.',
        security: [
            {
                BearerAuth: []
            }
        ],
        parameters: [
            {
                name: 'id',
                in: 'path',
                required: true,
                description: 'ID de la categoría a restaurar',
                schema: {
                    type: 'string',
                    example: "077eff87-4076-4c01-938c-5623c91aedc2"
                }
            }
        ],
        responses: {
            200: {
                description: 'Categoría restaurada correctamente'
            },
            404: {
                description: 'Categoría no encontrada'
            },
            500: {
                description: 'Error interno del servidor'
            }
        }
    }
};

export default restoreCategory