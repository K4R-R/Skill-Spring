const BusinessInfo = require('../models/businessModel');
const Users = require('../models/userModel');

const addBusiness = async (req,res) => {

   const {industry,startupName,investmentStage,productionStage,customerGroup} = req.body;
   //console.log(userId,industry,investmentStage,productionStage,customerGroup);
   
   const founder = await Users.findOne({_id:req.user._id});

   try {
      const business = await BusinessInfo.addBusiness(founder.email,founder.name,startupName,industry,investmentStage,productionStage,customerGroup);

      res.status(200).json({message:'Business Info Added Successfully'});
      
   } catch (err) {
      res.status(400).json({error:err.message})
   }
}

const getBusiness = async(req,res) => {
   
   const founder = await Users.findOne({_id:req.user._id})
   
   try {
      const business = await BusinessInfo.findOne({founderEmail:founder.email});

      res.status(200).json(business);
      
   } catch (err) {
      res.status(400).json({error:err.message});
   }
}

const getAll = async(req,res) => {
   
   try {
      const businesses = await BusinessInfo.find();

      res.status(200).json(businesses);
   } catch (err) {
      res.status(400).json({error:err.message});
   }
   
}

module.exports = {
   addBusiness,getBusiness,getAll
}