const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");

 const db = {};
db.mongoose = mongoose;
db.url      = dbConfig.url;
db.registration=require("./RegistrationModel.js")(mongoose);
db.login=require("./loginModel.js")(mongoose);

module.exports = db;
    