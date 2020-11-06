const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const adminWineRoutes = require('./routes/adminWine');
const adminDegRoutes = require('./routes/adminDeg');
const adminDegGroupsRoutes = require('./routes/adminDegGroups');
const adminOsInfoRoutes = require('./routes/adminOsInfo');
const adminFinalResultsRoutes = require('./routes/adminFinalResults');
const adminSettingsRoutes = require('./routes/adminSettings');
const degustatorRoutes = require('./routes/degustator');
const loginAdminRoutes = require('./routes/adminLogin');
const adminWineGroupsRoutes = require('./routes/adminWineGroups');

const winston = require('./config/winston');

const inicializeAdmin = require('./utils/initializeAdmin');
const inicializeDefaultSettins = require('./utils/inicializeDefaultSettings');


//ENV Variables
const MONGO_DB_URI = 'mongodb://127.0.0.1:27017/wine';
const PORT = 8080;

const app = express();

app.use(express.json()); // aplications/json
app.use(express.static(path.join(__dirname, 'assets/template/')))

//Handle CORS error
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(helmet());
app.use(morgan('combined', {
    stream: winston.stream
}));


//routes
app.use('/admin', adminSettingsRoutes);
app.use('/admin', adminWineGroupsRoutes);
app.use('/admin', adminWineRoutes);
app.use('/admin', adminDegRoutes);
app.use('/admin', adminDegGroupsRoutes);
app.use('/admin', adminOsInfoRoutes);
app.use('/admin', adminFinalResultsRoutes)
app.use('/admin', loginAdminRoutes);
app.use('/degustator', degustatorRoutes);

//Error handler
app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    winston.error(`${status} - ${message} - ${data} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(status)
    res.json({message: message, data: data});
})

//Conect to db and start server
mongoose.connect(MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => {
        const server = app.listen(PORT);
        inicializeAdmin(); // inicialised admin, only first time
        inicializeDefaultSettins();
        const io = require('./socket').init(server);
        io.on('connect', socket => {
            console.log('Socket.io: client connected');
        })
        console.log(`Connect to DB succes and server listen on ${PORT}`)
    })
    .catch(err => {
        console.log('Connect to DB failled', err)
    })
