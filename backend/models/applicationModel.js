const mongoose=require('mongoose');

const Schema = mongoose.Schema;

const connectionSchema = new Schema({
   founderEmail: {
      type:String,
      required:true
   },
   founderName: {
      type:String,
      required:true
   },
   investorEmail: {
      type:String,
      required:true
   },
   investorName: {
      type:String,
      required:true
   },
   status: {
      type:String,
      required:true
   }
},{ timestamps:true });

module.exports = mongoose.model('Connections',connectionSchema);