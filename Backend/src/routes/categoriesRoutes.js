import express from 'express';
import {
    createCategoryController,
    getAllCategoriesController,
    getCategoryByIdController,
    updateCategoryController,
    deleteCategoryController,
    restoreCategoryController,
} from '../controllers/categoryController.js';
import { validateCategory } from '../middleware/validation/categoryValidation.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { handleValidationErrors } from '../middleware/handleValidationErrors.js';


const router = express.Router();

router.post('/categories', authenticateToken, validateCategory, handleValidationErrors, createCategoryController);
router.get('/categories', getAllCategoriesController);
router.get('/categories/:id', getCategoryByIdController);
router.put('/categories/update/:id', authenticateToken, validateCategory, handleValidationErrors, updateCategoryController);
router.delete('/categories/delete/:id', authenticateToken, deleteCategoryController);
router.put('/categories/restore/:id', authenticateToken, restoreCategoryController);

export default router;
