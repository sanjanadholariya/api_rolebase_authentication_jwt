const employeeModel = require('../model/usersModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.loginEmployee = async(req , res) => {
  try {
    const existEmployee = await employeeModel.findOne({email :  req.body.email})
    if(existEmployee && existEmployee.isDelete == false){
      const matchPass = await bcrypt.compare(req.body.password , existEmployee.password)
      if(matchPass){
        const token = jwt.sign({userId : existEmployee._id},process.env.JWT_SECRET)
        return res.status(200).json({message : "Login Employee Success",data : token})
      }else{
        return res.status(400).json({message : "Invalid Credential"})
      }
    }else{
      return res.status(404).json({message : "Employee Does Not Exist, Register First ."})
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({message : "Internal Server Error"})
  }
}

module.exports.changeEmployeePassword = async(req , res) => {
  try {
    const employee = await employeeModel.findById(req.query.id)
    console.log(req.body.cPassword)
    console.log(req.body.password)

    if(employee && employee.isDelete == false){

      const matchPass = await bcrypt.compare(req.body.cPassword , employee.password)
      if(matchPass){
        const newPassword = await bcrypt.hash(req.body.password , 10)
        await employeeModel.findByIdAndUpdate(req.query.id , {password : newPassword})
        return res.status(200).json({message : "Password Change Success"})
      }else{
        return res.status(400).json({message : "Invalid Credential"})
      }
    }else{
      return res.status(404).json({message : "Employee Not Found"})
    }
  
  } catch (error) {
    console.log(error)
    return res.status(500).json({message : "Internal Server Error"})
  }
}