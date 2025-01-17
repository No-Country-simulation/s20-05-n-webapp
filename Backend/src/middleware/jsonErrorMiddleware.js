// ./src/middlewares/jsonErrorMiddleware.js

const jsonErrorMiddleware = (err, req, res, next) => {
    if (err instanceof SyntaxError) {
        return res.status(400).json({
            success: false,
            message: 'El cuerpo de la solicitud no es un JSON válido.'
        });
    }
    next(); // Pasa al siguiente middleware si no es un error de JSON
};

export default jsonErrorMiddleware;
