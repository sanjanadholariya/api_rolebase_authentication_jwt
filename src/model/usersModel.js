const mongoose = require('mongoose')

const usersSchema = mongoose.Schema({
  name : {
    type : String
  },
  email : {
    type : String
  },
  password : {
    type : String
  },
  gender : {
    type : String,
    enum : ["Male" , "Female"]
  },
  role : {
    type : String,
    enum : ["Admin" , "Manager" , "Employee"]
  },
  profile : {
    type : String
  },
  contactNo : {
    type : Number
  },
  isDelete : {
    type : Boolean,
    default : false
  }
},{
  timestamps : true,
  versionKey : false
})

module.exports = mongoose.model('user',usersSchema);