// ./src/models/userModel.js

import { pool } from '../../config/db.js';

export const createUserModel = async (username, email, password) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        // Verificar si el correo ya está en uso
        const [existingUser] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            throw new Error('El correo electrónico ya está en uso');
        }
        const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        const [result] = await connection.execute(query, [username, email, password]);
        await connection.commit();
        return { id: result.insertId, username, email };
    } catch (error) {
        await connection.rollback();
        console.error('Error al crear el usuario:', error.message);
        throw error;
    } finally {
        connection.release();
    }
};

export const getUserByEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email = ? AND is_deleted = ?';
    const [rows] = await pool.execute(query, [email, false]);
    return rows[0];
};

// Obtener todos los usuarios
export const getAllUsersModel = async () => {
    const [rows] = await pool.execute('SELECT id, username, email FROM users WHERE is_deleted = ?', [false]);
    return rows;
};

// Obtener usuario por ID
export const getUserByIdModel = async (id) => {
    const [rows] = await pool.execute('SELECT id, username, email FROM users WHERE id = ? AND is_deleted = ?', [id, false]);
    return rows[0];
};

// Actualizar usuario
export const updateUserModel = async (id, username, email, passwordHash) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        // Verificar si el correo ya está en uso por otro usuario
        const [existingUser] = await connection.execute(
            'SELECT * FROM users WHERE email = ? AND id != ? AND is_deleted = ?',
            [email, id, false]
        );
        if (existingUser.length > 0) {
            throw new Error('El correo electrónico ya está en uso.');
        }
        const query = `
            UPDATE users 
            SET username = ?, email = ?, password = ? 
            WHERE id = ? AND is_deleted = ?`;
        const [result] = await connection.execute(query, [username, email, passwordHash, id, false]);
        await connection.commit();
        return result.affectedRows > 0;
    } catch (error) {
        await connection.rollback();
        console.error('Error al actualizar el usuario:', error.message);
        throw error;
    } finally {
        connection.release();
    }
};

// Eliminar usuario
export const deleteUserModel = async (id) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const query = 'UPDATE users SET is_deleted = ? WHERE id = ?';
        const [result] = await connection.execute(query, [true, id]);
        await connection.commit();
        return result.affectedRows > 0;
    } catch (error) {
        await connection.rollback();
        console.error('Error al eliminar el usuario:', error.message);
        throw error;
    } finally {
        connection.release();
    }
};

export const restoreUserModel = async (id) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const query = 'UPDATE users SET is_deleted = ? WHERE id = ?';
        const [result] = await connection.execute(query, [false, id]);
        await connection.commit();
        return result.affectedRows > 0;
    } catch (error) {
        await connection.rollback();
        console.error('Error al restaurar el usuario:', error.message);
        throw error;
    } finally {
        connection.release();
    }
};