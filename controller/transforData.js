const e = require('express');
const Transform = require('../models/Transformation');

// Sample expacted form of transformation logic
// function transform(odata){
//    let firstName = odata.firstName;
//    let lastName = odata.lastName;
//    return firstName + " " + lastName;
// }

const getTransformationRule = async () => {
    const fieldData = await Transform.find();
    return fieldData;
};

const postData = async (req,res)=> { 
    const post = new Transform({
        field : req.body.field,
        transformationLogic: req.body.transformationLogic
    });
    try{
    const savePost = await post.save();
    res.status(201).json(savePost);
    }catch(err){
        res.json({message: err});
    }
};

const patchData = async (req,res)=> {
    try{
        const updatePost = await Transform.updateOne({field : req.body.field}, {$set: { transformationLogic : req.body.transformationLogic }});
        console.log(req.body.value);
        res.json(updatePost);
    }catch(err){
        res.json({message : err});
    }
};

const deleteData = async (req,res)=> {
    try{
        const removePost = await Transform.remove({field : req.body.field});
        res.json(removePost);
    }catch(err){
        res.status(404).json({message : err});
    }
};

const getAllData = async (req,res)=>{
    try{
        const post = await Transform.find();
        res.json(post);
    }catch(err){
        res.json({message:err});
    }
};

const addData = async (req,res)=>{
 var updatedData = [];
    try{
    var data = await getTransformationRule();
 
    req.body.forEach(async element => {
        if(data.some(value=> value.field === element.field)){
           const updatePost = await Transform.updateOne({field : element.field}, {$set: { transformationLogic : element.transformationLogic }});
         updatedData.push(updatePost);
           
        } else{
            const post = new Transform({
                field : element.field,
                transformationLogic: element.transformationLogic
        });
        const savePost = await post.save();
        updatedData.push(savePost);
    }
   
    res.status(201).json("Data updated");
    });
      
    }catch(err){
        res.json({message:err});
    }


};

module.exports = { addData, getAllData, deleteData, patchData, postData };