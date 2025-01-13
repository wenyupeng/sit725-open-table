const express = require("express");
const path = require('path')
const bodyParser = require("body-parser");

const config = require("./config/config.js");

const appTypeMiddleware = require('./middlewares/app-type.middleware.js')
const sessionAuth = require('./middlewares/session.middleware.js')

const routes = require("./routes/index.js");

// create express app
const app = express();

app.use(sessionAuth);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

require('./db/index.js')

app.use(appTypeMiddleware)

// Serve static files from public folder
// based on app type
app.use((req, res, next) => {
  express.static(`src/public/${req.appType}`)(req, res, next)
})

app.use(routes);

// listen for requests
const PORT = config.port;
app.listen(PORT, function () {
  console.log(`Server is listening on port ${PORT}`);
});


module.exports = app; // Export the app for testing