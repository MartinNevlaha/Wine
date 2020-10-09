const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const adminWineRoutes = require('./routes/adminWine');
const adminDegRoutes = require('./routes/adminDeg');
const adminDegGroupsRoutes = require('./routes/adminDegGroups');
const adminOsInfoRoutes = require('./routes/adminOsInfo');
const degustatorRoutes = require('./routes/degustator');
const loginAdminRoutes = require('./routes/adminLogin');


const inicializeAdmin = require('./utils/initializeAdmin');


//ENV Variables
const MONGO_DB_URI = 'mongodb://127.0.0.1:27017/wine';
const PORT = 8080;

const app = express();

app.use(express.json()); // aplications/json

//Handle CORS error
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

//routes
app.use('/admin', adminWineRoutes);
app.use('/admin', adminDegRoutes);
app.use('/admin', adminDegGroupsRoutes);
app.use('/admin', adminOsInfoRoutes);
app.use('/admin', loginAdminRoutes)
app.use('/degustator', degustatorRoutes);

app.use(helmet());

//Error handler
app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data});
})

//Conect to db and start server
mongoose.connect(MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => {
        app.listen(PORT);
        inicializeAdmin(); // inicialised admin, only first time
        console.log(`Connect to DB succes and server listen on ${PORT}`)

    })
    .catch(err => {
        console.log('Connect to DB failled', err)
    })
