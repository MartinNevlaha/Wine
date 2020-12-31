const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const compression = require("compression");
const timestamp = require("time-stamp");
const cors = require("cors");
const envExist = require("dotenv").config();

const winston = require("./config/winston");

if (envExist.error) {
  winston.error({
    level: "error",
    message: envExist.parsed,
  });
}

const adminWineRoutes = require("./routes/adminWine");
const adminDegRoutes = require("./routes/adminDeg");
const adminDegGroupsRoutes = require("./routes/adminDegGroups");
const adminOsInfoRoutes = require("./routes/adminOsInfo");
const adminFinalResultsRoutes = require("./routes/adminFinalResults");
const adminSettingsRoutes = require("./routes/adminSettings");
const degustatorRoutes = require("./routes/degustator");
const loginAdminRoutes = require("./routes/adminLogin");
const adminWineGroupsRoutes = require("./routes/adminWineGroups");

const inicializeAdmin = require("./utils/initializeAdmin");
const inicializeDefaultSettins = require("./utils/inicializeDefaultSettings");

//ENV Variables
const MONGO_DB_URI = process.env.MONGO_DB_URI;
const PORT = process.env.PORT;

const app = express();

app.use(express.json()); // aplications/json
app.use(express.static(path.join(__dirname, "assets/template/")));
app.use(express.static(path.join("public")));

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(
  morgan("combined", {
    stream: winston.stream,
  })
);

//routes
app.use("/admin", adminSettingsRoutes);
app.use("/admin", adminWineGroupsRoutes);
app.use("/admin", adminWineRoutes);
app.use("/admin", adminDegRoutes);
app.use("/admin", adminDegGroupsRoutes);
app.use("/admin", adminOsInfoRoutes);
app.use("/admin", adminFinalResultsRoutes);
app.use("/admin", loginAdminRoutes);
app.use("/degustator", degustatorRoutes);

app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

//Error handler
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  winston.error(
    `${timestamp("YYYY/MM/DD/HH:mm:ss")} - ${status} - ${message} - ${data} - ${
      req.originalUrl
    } - ${req.method} - ${req.ip}`
  );
  res.status(status);
  res.json({ message: message, data: data });
});

//Conect to db and start server
mongoose
  .connect(MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    const server = app.listen(PORT);
    inicializeAdmin(); // inicialised admin, only first time
    inicializeDefaultSettins();
    const io = require("./socket").init(server);
    io.on("connect", (socket) => {
      winston.log({
        time: timestamp("YYYY/MM/DD/HH:mm:ss"),
        level: "info",
        message: "Socket.io: client connected",
      });
    });
    winston.log({
      time: timestamp("YYYY/MM/DD/HH:mm:ss"),
      level: "info",
      message: `Connect to DB succes and server listen on ${PORT}`,
    });
  })
  .catch((err) => {
    winston.error({
      time: timestamp("YYYY/MM/DD/HH:mm:ss"),
      level: "error",
      message: `Connect to DB failled, due to: ${err}`,
    });
  });
