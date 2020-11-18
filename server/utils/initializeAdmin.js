const bcrypt = require('bcryptjs');
const Admin = require('../models/admin');
const timestamp = require('time-stamp');

const winston = require('../config/winston');

const DEFAULT_ADMIN_NAME = process.env.DEFAULT_ADMIN_NAME;
const DEFAULT_ADMIN_PASSWORD = process.env.DEFAULT_ADMIN_PASSWORD;

const inicializeAdmin = async () => {
    try {
        const admin = await Admin.find();
        if (!admin.length) {
            const hashedPassword = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, 12);
            const defaultAdmin = new Admin({
                name: DEFAULT_ADMIN_NAME,
                password: hashedPassword
            })
            await defaultAdmin.save();
            winston.log({
                time: timestamp('YYYY/MM/DD/HH:mm:ss'),
                level: 'info',
                message: 'Admin bol vytvorený v databáze'
            })
        }
    } catch (error) {
        winston.log({
            time: timestamp('YYYY/MM/DD/HH:mm:ss'),
            level: 'error',
            message: 'Nemôžem inicializovať admina v DB' + error
        })
    }
} 

module.exports = inicializeAdmin;