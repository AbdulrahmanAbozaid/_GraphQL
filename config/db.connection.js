const mongoose = require("mongoose");

const connection = () =>
  mongoose
    .connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected To MongoDB"))
    .catch((e) => console.log(`Mongoose Error: ${e}`));

module.exports = connection;
