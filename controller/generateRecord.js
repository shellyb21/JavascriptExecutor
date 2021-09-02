const Post = require('../models/Post');
const Transform = require('../models/Transformation');

const getAlltransformedData = async (req, res) => {
    var data = await getAllData();
    for (i in data) {
        data[i] = await performTransformation(data[i]);
    }
    res.json(data);
};

const getsingleData = async (req, res) => {
    console.log(req.params.postId);
    var data = await getSpecificData(req.params.postId);
    for (i in data) {
        data[i] = await performTransformation(data[i]);
    }
    res.json(data);
};

const getSpecificData = async (id) => {
    const post = await Post.find({ employeeId: id });
    return post;
};

const getAllData = async () => {
    const post = await Post.find();
    return post;
};

const performTransformation = async function (oData) {

    var data = {
        fullName: "",
        email_address: "",
        Address: "",
        employeeId: ""
    };
    var fields = ["fullName", "email_address", "Address", "employeeId"];
    for (i in fields) {
        fieldData = await getTransformationRule(fields[i]);
        if (fieldData != undefined && fieldData != "") {
            eval(fieldData[0].transformationLogic);
            data[fields[i]] = transform(oData);
        } else if (!!oData[fields[i]]) {
            data[fields[i]] = oData[fields[i]];
        }
    }

    return data;
};
const getTransformationRule = async (fieldName) => {
    const fieldData = await Transform.find({ field: fieldName });
    return fieldData;
};
module.exports = { getAlltransformedData, getsingleData }

