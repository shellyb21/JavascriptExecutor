const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// get all the data
router.get('/', async (req,res)=>{
    try{
        const post = await Post.find();
        res.json(post);
    }catch(err){
        res.json({message:err});
    }
});
//get specific id
router.get('/:postId', async (req,res)=>{
    try{
        const post = await Post.find({firstName: req.params.postId});
        res.json(post);
    }catch(err){
        res.json({message:err});
    }
});
//post the data
router.post('/', async (req,res)=> { 
    const post = new Post({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email_address: req.body.email_address,
        Address: req.body.Address,
        pincode: req.body.pincode,
        employeeId: req.body.employeeId
    });
    try{
    const savePost = await post.save();
    res.status(201).json(savePost);
    }catch(err){
        res.json({message: err});
    }
}
);

//delete the data
router.delete('/', async (req,res)=> {
    try{
        const removePost = await Post.remove({firstName : req.body.firstName});
        res.json(removePost);
    }catch(err){
        res.json({message : err});
    }
});
//Update the data
router.patch('/', async (req,res)=> {
    try{
        const param = req.body.param;
        console.log(param);
       const updatePost = await Post.updateOne({firstName : req.body.firstName}, {$set: { city : req.body.value }});
        res.json(updatePost);
    }catch(err){
        res.json({message : err});
    }
});

router.post("/simulate", async (req, res) => {
    var inputData = req.body;
    var outputPayload;
    if (inputData.operation.toLowerCase() === "javascript") {
        eval(inputData.extractionPath);
        outputPayload = transform(inputData.inputPayload);
    }

    res.json({ "outputPayload": outputPayload, "payloadType": typeof outputPayload });
});
module.exports = router;