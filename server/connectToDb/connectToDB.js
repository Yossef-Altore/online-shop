const mongoose = require("mongoose");
const chalk = require("chalk");
mongoose
  .connect("mongodb://localhost:27017/online-shop")
  .then(() => {
    console.log(chalk.green("connected to DB"));
  })
  .catch((e) => {
    console.log(chalk.red("can't connected to DB. Error" + e));
  });
