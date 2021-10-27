const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    _id: String,
    data: Object
})

module.exports = mongoose.model('document', userSchema)