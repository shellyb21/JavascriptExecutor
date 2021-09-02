const express = require('express');
const Transform = require('../models/Transformation');
const router = express.Router();
const controller = require('../controller/transforData');

//post the data
router.post('/',controller.postData);

//update the data 
router.patch('/', controller.patchData);
// delete the data
router.delete('/', controller.deleteData);

// get all the data
router.get('/', controller.getAllData);

router.post('/massadd', controller.addData)

module.exports = router;