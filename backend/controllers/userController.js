const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

//creating token using jwt
const createToken = (_id) => {
   return jwt.sign({_id}, process.env.SECRET, {expiresIn: '5d'});
}

//login user
const loginUser = async (req,res) => {
   const {email,password} = req.body;

   try {
      const user = await User.login(email,password);

      //creating token if user found
      const token = createToken(user._id);
      const name = user.name;
      const role = user.role;
      const contact = user.contact;

      res.status(200).json({role,name,email,contact,token});
   } catch(err) {
      res.status(400).json({error:err.message});
   }
}

//signup new user
const signupUser = async (req,res) => {

   const {role,name,email,contact,password} = req.body;

   try{
      const user = await User.signup(role,name,email,contact,password);

      //creating token after signup
      const token = createToken(user._id);

      res.status(200).json({role,name,email,contact,token});
   } catch(err) {
      res.status(400).json({error:err.message});
   }
}

const upTime = (req,res) => {
   res.status(200).json({message:'function for keeping backend active'})
}


module.exports = {
   signupUser,loginUser,upTime
}