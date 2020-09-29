const bcrypt = require('bcryptjs');

const Admin = require('../models/admin');

const DEFAULT_ADMIN_NAME = 'Admin';
const DEFAULT_ADMIN_PASSWORD = 'WineAdmin';

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
        }
    } catch (error) {
        console.log('Cant inicialze Admin')
    }
} 

module.exports = inicializeAdmin;