require("dotenv").config()
const chalk = require("chalk");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const mount = require("mount-routes");
const { createServer } = require("http");
const envConfig = require('./config/env.config')

console.log('ENV CONFIG ', envConfig)

const apiResponse = require("./utils/utils.apiResponse");
const SocketIOService = require("./services/socket.service");

const isDev = envConfig.nodeEnv === "development";

require("express-async-errors");
require("./db/index");

const { sessionAuth, attachUserToLocals } = require("./middlewares/session");
const app = express();
const httpServer = createServer(app);

SocketIOService.instance().initialize(httpServer);
const io = SocketIOService.instance().getServer();
io.on("connection", SocketIOService.handleConnection);

app.use(sessionAuth);
app.use(attachUserToLocals);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.set("views", path.join(__dirname, "public/views"));
app.set("view engine", "ejs");

app.all("/api/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, token");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Authorization");
  if (req.accepts("html")) {
    res.set("Content-Type", "text/html");
  } else {
    res.header("Content-Type", "application/json;charset=UTF-8");
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Length, Authorization, Accept,X-Requested-With",
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  if (req.method === "OPTIONS") res.send(200);
  else next();
});

if (isDev) {
  console.log(chalk.bold.yellow("env: dev"));
  app.use(logger("dev"));
} else {
  console.log(chalk.bold.yellow("env: prod"));
}

// express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// swagger
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = require("./config/swagger.config");
const swaggerSpec = swaggerJsdoc(options);
var swaggerJson = function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
};
app.get("/swagger.json", swaggerJson);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

mount(app, path.join(process.cwd(), "/routes"), isDev);

//  throw 404 if URL not found
app.all("*", function (req, res) {
  // Check if the client expects text/html
  if (req.accepts("text/html")) {
    res.status(404).render("./error/404", { pageTitle: "404 Page Not Found" });
  } else {
    return apiResponse.notFoundResponse(res, "404 --- api not found");
  }
});

// unauthorized error
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    return apiResponse.unauthorizedResponse(res, "token expired or invalid");
  }

  if (err.name === "Error") {
    return apiResponse.ErrorResponse(res, err.message);
  }
  
  if (err.name === "TypeError") {
    console.log(err.message);
    return apiResponse.ErrorResponse(res, "Invalid data type");
  }
  next(err);
});

httpServer.listen(envConfig.app.port, () => {
  console.log(
    chalk.bold.green(
      `project start http://${envConfig.app.host}:${envConfig.app.port}`,
    ),
  );
  console.log(
    chalk.bold.green(
      `swagger address http://${envConfig.app.host}:${envConfig.app.port}/docs`,
    ),
  );
});

module.exports = app;
