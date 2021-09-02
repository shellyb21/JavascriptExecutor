const express = require('express');
const router = express.Router();
const Controller = require('../controller/generateRecord');

router.get('/',Controller.getAlltransformedData);
router.get('/:postId',Controller.getsingleData);

module.exports = router;