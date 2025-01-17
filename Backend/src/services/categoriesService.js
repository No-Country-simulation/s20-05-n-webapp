import CategoryModel from '../models/CategoryModel.js';

export const createCategory = async (data) => {
    return await CategoryModel.create(data);
};

export const getAllCategories = async () => {
    return await CategoryModel.findAll({
        where: { deletedAt: null },
    });
};

export const getCategoryById = async (id) => {
    const category = await CategoryModel.findOne({
        where: { id, deletedAt: null },
    });
    if (!category) throw new Error('Categoría no encontrada.');
    return category;
};

export const updateCategory = async (id, data) => {
    const category = await CategoryModel.findByPk(id);
    if (!category) throw new Error('Categoría no encontrada.');
    await category.update(data);
    return category;
};

export const deleteCategory = async (id) => {
    const category = await CategoryModel.findByPk(id);
    if (!category) throw new Error('Categoría no encontrada.');
    await category.update({ deletedAt: new Date() });
};

export const restoreCategory = async (id) => {
    const category = await CategoryModel.findOne({
        where: { id, deletedAt: { [Op.ne]: null } },
        paranoid: false,
    });
    if (!category) throw new Error('Categoría no encontrada.');
    await category.update({ deletedAt: null });
    return category;
};
