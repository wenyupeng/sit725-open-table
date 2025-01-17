const chalk = require("chalk");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const { createServer } = require("http");

const apiResponse = require("./utils/api-response.util");
const SocketIOService = require("./services/socket.service");
const routes = require("./routes/index");

const isDev = process.env.NODE_ENV === "development";

require("dotenv");
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

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// @TODO: Is this all necessary?
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
const envConfig = require("./config/env.config");
const swaggerSpec = swaggerJsdoc(options);
var swaggerJson = function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
};
app.get("/swagger.json", swaggerJson);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(routes);

//  throw 404 if URL not found
app.all("*", function (req, res) {
  // Check if the client expects text/html
  if (req.accepts("text/html")) {
    res.status(404).render("./error/404", { pageTitle: "404 Page Not Found" });
  } else {
    return apiResponse.notFoundResponse(res, "404 --- 接口不存在");
  }
});

// unauthorized error
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    return apiResponse.unauthorizedResponse(res, "token不存在或已过期");
  }
  next(err);
});

httpServer.listen(envConfig.port, () => {
  console.log(
    chalk.bold.green(
      `project start http://${envConfig.appUrl}:${envConfig.port}/api`,
    ),
  );
  console.log(
    chalk.bold.green(
      `swagger address http://${envConfig.appUrl}:${envConfig.port}/docs`,
    ),
  );
});

module.exports = app;
