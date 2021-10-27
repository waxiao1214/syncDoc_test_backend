const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

require("dotenv").config()

const createToken = (id) => {
  return jwt.sign({ _id: id }, process.env.jwtSecret);
}

const login = async (req, res) => {
  const request = JSON.stringify(req.body)
  const { username, password, hostname } = JSON.parse(request)

  const user = await User.findOne({
    "username": username,
  }, function(err, result) {
    
    if(err) return res.status(403).json(err)
    return result;
  })
  if(!user) 
    return res.status(403).json({
      error: "There is not user"
    })

  // const salt = await bcrypt.genSalt(10);
  // const cpassword = await bcrypt.hash(password, salt)
  // console.log(cpassword)
  const isMatch = await bcrypt.compare(password, user.password);
 
  if(!isMatch)
    return res.status(403).json({
      error: "Incorrect Password"
    })
  res.status(200).json({
    token: createToken(user.id),
    id: user._id
  })
}

module.exports = { login, createToken }