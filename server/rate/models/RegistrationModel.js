const mongoose = require('mongoose');

const Registration = mongoose.model('Registration', {
  /*  msg:{
        type:String,
        required:true
    },*/
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    
   
  password:{
        type:String,
        required:true
    }
});

module.exports = Registration;
