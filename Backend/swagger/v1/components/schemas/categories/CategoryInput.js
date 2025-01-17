const CategoryInput = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            minLength: 3,
            description: 'El nombre de la categoría.',
            example: 'Electrónica'
        },
        description: {
            type: 'string',
            description: 'La descripción de la categoría.',
            example: 'Productos electrónicos como teléfonos, computadoras, etc.'
        },
        custom: {
            type: 'boolean',
            description: 'Indica si la categoría es personalizada.',
            example: true
        }
    },
    required: ['name'], // El nombre es obligatorio
    additionalProperties: false // Para evitar propiedades adicionales
};

export default CategoryInput;