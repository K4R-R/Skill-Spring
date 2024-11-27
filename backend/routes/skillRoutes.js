const express = require('express');
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');

const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

const investorController = require('../controllers/investorController');

router.use(requireAuth);

//uploading investor preferences
router.post('/',investorController.addInvestor);

//getting investor selected values
router.get('/',investorController.getInvestor)

//getting preferences model of all investors for invitations
router.get('/all',investorController.getAll)

module.exports=router;