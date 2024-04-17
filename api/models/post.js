const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, default: ''},
    context: {type: String, default: ''},
    userId: { type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'}
})


module.exports = mongoose.model('Post', postSchema)