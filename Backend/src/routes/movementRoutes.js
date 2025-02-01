import express from 'express';
import {
    createMovementController,
    getMovementController,
    getIdMovementController,
    updateMovementController,
    deleteMovementController,
    productMovementController
} from '../controllers/movementController.js';
// import { validateMovement } from '../middleware/validation/movementValidation.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { handleValidationErrors } from '../middleware/handleValidationErrors.js';

const router = express.Router();

router.post('/movement',authenticateToken, handleValidationErrors, createMovementController);
router.get('/movement',authenticateToken, handleValidationErrors,getMovementController);
router.get('/movement/:id', authenticateToken, getIdMovementController);
router.put('/movements/update/:id', authenticateToken, handleValidationErrors, updateMovementController);
router.delete('/movements/delete/:id', authenticateToken, deleteMovementController);
router.get('/movements/product/:productId', authenticateToken, productMovementController);

export default router;
