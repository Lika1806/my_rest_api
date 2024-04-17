const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User', userSchema)

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    user: {
        type: String
    }
}, {timestamps: true})

const Post = mongoose.model('Post', postSchema)


const tokenSchema = new Schema({
    title: {
        type: String,
        required: true
    }
    })

const Token = mongoose.model('Token', tokenSchema)