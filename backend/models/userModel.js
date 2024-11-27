const mongoose=require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
   role: {
      type:String,
      required:true
   },
   name: {
      type:String,
      required:true
   },
   email: {
      type:String,
      required:true,
      unique:true
   },
   contact: {
      type:Number,
      required:true,
      unique:true
   },
   password: {
      type:String,
      required:true
   }
},{ timestamps:true });


//static signup method
userSchema.statics.signup = async function(role,name,email,contact,password) {

   if(!email || !password || !name || !contact) {
      //console.log(email,password,name,contact);
      throw Error('All fields must be filled');
   }
   if(!role) {
      throw Error('Please select a role');
   }
   if(!validator.isEmail(email)) {
      throw Error('Not a valid Email');
   }
   if(contact<Math.pow(10,9) || contact>=Math.pow(10,10)) {
      throw Error('Not a valid Contact Number');
   }
   if(!validator.isStrongPassword(password)) {
      throw Error('Password must include uppercase, lowercase, number, and special character.');
   }

   const checkemail = await this.findOne({email});
   const checkcontact = await this.findOne({contact});

   if(checkemail) throw Error('Email already in use');
   if(checkcontact) throw Error('Contact already in use');

   const hashPass = await bcrypt.hash(password,10);
   const user = await this.create({role,name,email,contact,password:hashPass});

   return user;
}

//static login method
userSchema.statics.login = async function(email,password) {
   if(!email || !password) {
      //console.log(email,password);
      throw Error('All fields must be filled');
   }

   const user = await this.findOne({email});
   if(!user) throw Error('Incorrect Email');

   const match = await bcrypt.compare(password,user.password);
   if(!match) throw Error('Incorrect Password');
   
   return user;
}

module.exports = mongoose.model('Users',userSchema);