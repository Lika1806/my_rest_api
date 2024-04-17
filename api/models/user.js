const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String, 
        default: function() {
        return 'User'+this._id
    }},
    email: {
        type: String, 
        required: true, 
        unique: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    password:  {
        type: String, 
        required: true},
    // surname: String,
    // age: Number,
})


module.exports = mongoose.model('User', userSchema)