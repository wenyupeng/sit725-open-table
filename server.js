const chalk = require('chalk');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const mount = require('mount-routes');

const apiResponse = require('./utils/utils.apiResponse');

const isDev = process.env.NODE_ENV === 'development';

require('dotenv').config({ path: isDev ? './.env.development' : './.env.production' })
require('express-async-errors');
require('./db/index')

const { sessionAuth, attachUserToLocals } = require("./middlewares/session");
const app = express();

app.use(sessionAuth);
app.use(attachUserToLocals);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.set('views', path.join(__dirname, 'public/views'))
app.set('view engine', 'ejs')

app.all('/api/*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, token')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization')
    if (req.accepts("html")) {
        res.set("Content-Type", "text/html");
    } else {
        res.header('Content-Type', 'application/json;charset=UTF-8');
    }
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    if (req.method === 'OPTIONS') res.send(200)
    else next()
})

if (isDev) {
    console.log(chalk.bold.yellow('env: dev'))
    app.use(logger('dev'))
} else {
    console.log(chalk.bold.yellow('env: prod'))
}

// express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// swagger
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const options = require('./config/swagger.config');
const swaggerSpec = swaggerJsdoc(options);
var swaggerJson = function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
};
app.get("/swagger.json", swaggerJson);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

mount(app, path.join(process.cwd(), '/routes'), isDev)

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
        return apiResponse.unauthorizedResponse(res, 'token不存在或已过期');
    }

    if(err.name === "Error"){
        return apiResponse.ErrorResponse(res, err.message);
    }
    
    next(err);
});

app.listen(process.env.PORT, () => {
    console.log(chalk.bold.green(`project start http://${process.env.URL}:${process.env.PORT}/api`));
    console.log(chalk.bold.green(`swagger address http://${process.env.URL}:${process.env.PORT}/docs`));
});

module.exports = app;