const mongoose = require('mongoose');

const transformationSchema = mongoose.Schema({
    field : String,
    transformationLogic: String
});

module.exports = mongoose.model('transformationData', transformationSchema);
