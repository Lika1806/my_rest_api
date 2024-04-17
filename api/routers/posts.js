const express = require('express')
const router = express.Router();
const Post = require('../models/post')
const mongoose = require('mongoose')

router.get('/', (req,res,next)=>{
    res.status(200).json({
        message: 'Get of /posts'
    });
});

router.post('/', (req,res,next)=>{
    new_post = new Post({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        context: req.body.context,
        // userId: ???
    })
    new_post.save()
    .then(result => {
        console.log(result)
    })
    .catch(err => console.log(err));

    res.status(201).json({
        message: 'Post of /user',
        created_user: new_post
    });
});

router.get('/:postId', (req,res,next)=>{
    const id =req.params.userId;
    if (id == 'test'){
        res.status(200).json({
            message: 'getting test!',
            id: id
        });

    } else {
        res.status(200).json({
            message: 'You passed an ID'
        })
    }

});

router.patch('/:postId', (req,res,next)=>{
    const id =req.params.userId;
    res.status(200).json({
        message: 'Updated post',
        id: id
    })
})
router.delete('/:postId', (req,res,next)=>{
    const id =req.params.userId;
    res.status(200).json({
        message: 'Deleted post',
        id: id
    })
})

module.exports = router