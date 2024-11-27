const mongoose=require('mongoose');

const Schema = mongoose.Schema;

const investorSchema = new Schema({
   investorEmail: {
      type:String,
      required:true
   },
   investorType:{
      type:String,
      required:true
   },
   investmentRange:{
      type:Number,
      required:true
   },
   industry: {
      type:[String],
      required:true
   },
   investmentStage: {
      type:[String],
      required:true
   },
   productionStage: {
      type:[String],
      required:true
   },
   customerGroup: {
      type:[String],
      required:true
   }
},{ timestamps:true });

// //static method to add business info
investorSchema.statics.addInvestor = async function(investorEmail,investorType,investmentRange,industry,investmentStage,productionStage,customerGroup) {

   if(!investorType || !investmentRange || industry.length==0 || investmentStage.length==0 || productionStage.length==0 || customerGroup.length==0) {
      
      throw Error('All Fields are Required');
   }

   const checkInvestor = await this.findOne({investorEmail});
   let investor;

   if(checkInvestor) {
      checkInvestor.investorType = investorType;
      checkInvestor.investmentRange = investmentRange;
      checkInvestor.industry = industry;
      checkInvestor.investmentStage = investmentStage;
      checkInvestor.productionStage = productionStage;
      checkInvestor.customerGroup = customerGroup;

      investor = await checkInvestor.save();
   } else {
      investor = await this.create({investorEmail,investorType,investmentRange,industry,investmentStage,productionStage,customerGroup});
   }

   return investor;
}

module.exports = mongoose.model('InvestorPreferences',investorSchema);