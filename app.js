const chalk = require('chalk');
const express = require("express");

const connectDB = require("./db/d_base").connectDB;
const session = require('express-session');

const path = require("path");
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mount = require('mount-routes');

const apiResponse = require('./utils/utils.apiResponse');

const auth = require('./routes/api/auth');
const bookingRoutes = require('./routes/api/bookingRoutes');
const restaurantRoutes = require('./routes/api/restaurantRoutes'); 
const homeRoutes = require('./routes/api/homeRoutes');
const errorController = require('./controllers/ErrorController');

const isDev = process.env.NODE_ENV === 'development';
require('dotenv').config({path: isDev ? './.env.development' : './.env.production'})

require('express-async-errors');
// require('./db/index')

const {sessionAuth, attachUserToLocals} = require('./middlewares/session')
// Init app
const app = express();

// Middleware functions
app.use(session({ secret: 'sit725', resave: false, saveUninitialized: true, cookie: { secure: false } }));
app.use(sessionAuth);
app.use(attachUserToLocals);
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public/views'));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");  
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

if (isDev) {
    console.log(chalk.bold.yellow('env: dev'))
    app.use(logger('dev'))
} else {
    console.log(chalk.bold.yellow('env: prod'))
}

// Middleware to set user in response locals
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// Use Routes
app.use('/api/auth', auth); // User routes for registration and login
app.use('/api/bookings', bookingRoutes); // API routes for bookings ???
app.use('/api/restaurants', restaurantRoutes); // API routes for restaurants
app.use('/', homeRoutes); // Home page route

// swagger
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const options = require('./config/swagger.config') ;
const swaggerSpec = swaggerJsdoc(options);
var swaggerJson = function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  };
app.get("/swagger.json", swaggerJson);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

mount(app, path.join(process.cwd(), '/routes'), isDev)

// Error handling middleware for views
app.use(errorController.get404);

//  throw 404 if URL not found
// app.all("*", function (req, res) {
//     return apiResponse.notFoundResponse(res, "404 --- 接口不存在");
// });

// unauthorized error
app.use(function (err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        return apiResponse.unauthorizedResponse(res, 'token不存在或已过期');
    } 
    next(err);
});

connectDB(() => {
  app.listen(process.env.PORT, () => {
    console.log(`App is running on http://${process.env.URL}:${process.env.PORT}`);
    console.log(chalk.bold.green(`project start http://${process.env.URL}:${process.env.PORT}/api`));
    console.log(chalk.bold.green(`swagger address http://${process.env.URL}:${process.env.PORT}/docs`));
  });
});

module.exports = app;