const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const Post = require('../models/post')


router.get('/',(req, res, next)=>{
    User.find()
    .select('email _id name')
    .exec()
    .then(docs => {
        const response = {
            total_count: docs.length,
            users: docs.map(doc=>{
                return {
                   email: doc.email,
                   _id: doc._id,
                   name: doc.name,
                   request: {
                    type: 'GET',
                    url: 'http://localhost:3000/users/'+doc._id
                   }
                }
            })
        }
        if (docs.length >0){
            res.status(200).json(response);
        } else {
            res.status(200).json({message: 'No entries found'})
        }
    })
    .catch(err =>
        {
            console.log(err);
            res.status(500).json({error: err})
        });
});


router.post('/signup', (req,res,next)=>{
    User.find({email: req.body.email}).exec()
    .then(user => {
        if(user.length>0) {
            return res.status(409).json({message: 'User with this email already exists'})
        } else {
            bcrypt.hash(req.body.password, 10,(err,hash)=>{
                if (err){
                    return res.status(500).json({
                        error: err
                    })
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        name: req.body.name,
                        password: hash
                        })
                    user.save()
                    .then(result => {
                        console.log(result);
                        res.status(200).json({message:'User with _id Created'}) //vonc enq tpum ID-n???
                    })
                    .catch(err=> res.status(500).json({'error': err}));
                        }
                    })
        }
    })
    .catch(err=> res.status(500).json({'error': 'err'}))
    
});

router.post('/login', (req,res,next) =>{
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if (user.length <1){
            return res.status(404).json({
                message: 'Authentication failed'})
        } 
        bcrypt.compare(req.body.password, user[0].password, (err,result)=>{
            if (err) {
                return res.status(404).json({
                message: 'Authentication failed'})
            } 
            if (result) {
                const new_token = jwt.sign({
                    email: user[0].email,
                    uresId: user[0]._id
                }, 
                'private', 
                {expiresIn: "2h"});
                return res.status(200).json({
                    message: 'Success',
                    token: new_token
                })

            }
            res.status(404).json({
                message: 'Authentication failed'})
        })
    })
    .catch(err => {
        res.status(404).json({message: 'Authentication failed'})
    })
})
router.delete('/:userId', (req,res,next)=>{
    User.deleteOne({_id: req.params.userId}).exec()
    .then(result => {
        res.status(200).json({message: 'The user is successfully deleted'})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(res)
    })

})


router.patch('/:userId', (req,res,next)=>{
    const id = req.params.userId;
    const updateOps = {};
    for (const ops of req.body){
        console.log(ops)
        updateOps[ops.propName] = ops.value;
    }
    User.updateOne({_id:id}, {$set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({message: 'User information was Successfully updated!'})
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error : err})
    });

})



router.get('/:userId', (req,res,next)=>{
    const id =req.params.userId;
    User.findById(id)
    .exec()
    .then(doc=>{
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({error: err});

    });

});


module.exports = router