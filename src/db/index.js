
const mongoose = require("mongoose");

const config = require('../config/config')

mongoose.Promise = global.Promise;

console.log('DB URL: ', config.dbUrl)
mongoose.connect(config.dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", function (err) {
  console.log(`Could not connect to the database: ${err}`);
  mongoose.disconnect();
});

db.on('close', function () {
    console.log('database disconnected, try reconnect again');
    setTimeout(() => {
        mongoose.connect(dbConfig.mongoUrl)
    }, 3000)
});

db.once("open", function () {
  console.log("Successfully connected to the database");
});

module.exports = db;