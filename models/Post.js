const mongoose = require('mongoose');


const employeeSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email_address: String,
    Address: String,
    pincode: String,
    employeeId: String
});

module.exports = mongoose.model('employees',employeeSchema);
