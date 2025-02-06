const mongoose = require("mongoose");
const chalk = require("chalk");
const envConfig = require("../config/env.config");

mongoose.connect(envConfig.mongo.url);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.once("open", () => {
  let isDev = envConfig.nodeEnv === "development";
  console.log(
    chalk
      .rgb(123, 45, 67)
      .bold(
        `connect ${isDev ? chalk.blue.bold("dev") : chalk.blue.bold("prod")} database success：` +
          chalk.hex("#DEADED").underline(db.name),
      ),
  );
});

db.on("error", function (error) {
  console.error("Error in MongoDb connection: " + error);
  mongoose.disconnect();
});

db.on("close", function () {
  console.log(
    "***********database disconnected, try reconnect again************",
  );
  setTimeout(() => {
    mongoose.connect(envConfig.mongo.url);
  }, 3000);
});

module.exports = db;
