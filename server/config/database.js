const config = require("../config/application");
const mongoose = require("mongoose");

mongoose.connect(config.MONGODB, {
  useNewUrlParser: true,
  useCreateIndex: true
});

module.exports = mongoose;
