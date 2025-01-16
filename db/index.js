const mongoose = require("mongoose");
const config = require("../config/env.config");
const chalk = require("chalk");

mongoose.connect(config.dbUrl);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.once("open", () => {
  let isDev = process.env.NODE_ENV === "development";
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
    "*********** database disconnected, try reconnect again after 3 secs ************",
  );
  setTimeout(() => {
    mongoose.connect(config.dbUrl);
  }, 3000)
});

module.exports = db;
