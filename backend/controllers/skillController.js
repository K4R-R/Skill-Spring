const InvestorPreferences = require('../models/skillModel');
const Users = require('../models/userModel');

const addInvestor = async (req,res) => {

   const {investorType,investmentRange,industry,investmentStage,productionStage,customerGroup} = req.body;
   
   const investor = await Users.findOne({_id:req.user._id});

   try {
      const investorPref = await InvestorPreferences.addInvestor(investor.email,investorType,investmentRange,industry,investmentStage,productionStage,customerGroup);

      res.status(200).json({message:'Investor Preferences Added Successfully'});
      
   } catch (err) {
      res.status(400).json({error:err.message});
   }
}

const getInvestor = async (req,res) => {
   
   const investor = await Users.findOne({_id:req.user._id});
   
   try {
      const investorPref = await InvestorPreferences.findOne({investorEmail:investor.email});

      res.status(200).json(investorPref);
      
   } catch (err) {
      res.status(400).json({error:err.message})
   }
}

const getAll = async (req,res) => {
   try {
      const allInvest = await InvestorPreferences.find();

      res.status(200).json(allInvest);
   } catch (err) {
      res.status(400).json({error:err.message});
   }
}

module.exports = {
   addInvestor,getInvestor,getAll
}