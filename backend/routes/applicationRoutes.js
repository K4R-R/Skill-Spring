const express = require('express');
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');

const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

const founderController = require('../controllers/applicatoinController');

router.use(requireAuth);

//uploading business model
router.post('/business',founderController.addBusiness);

//getting business values
router.get('/business',founderController.getBusiness);

//get all businesses
router.get('/',founderController.getAll);

module.exports=router;