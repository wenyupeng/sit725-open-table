const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const config = require("./config/config.js");

const appTypeMiddleware = require("./middlewares/app-type.middleware.js");
const sessionAuth = require("./middlewares/session.middleware.js");

const routes = require("./routes/index.js");
const errorHandler = require("./middlewares/error.middleware.js");
const responseFormatter = require("./middlewares/response-formatter.middleware.js");

require("./db/index.js");

// create express app
const app = express();

app.use(sessionAuth);
app.use(responseFormatter);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(appTypeMiddleware);

// Serve static files from public folder
// based on app type
app.use((req, res, next) => {
  express.static(`src/public/${req.appType}`)(req, res, next);
});

app.use(routes);

app.use(errorHandler);

// listen for requests
const PORT = config.port;
app.listen(PORT, function () {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app; // Export the app for testing
