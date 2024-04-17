const express = require('express')
const router = express.Router();
const Product = require('../models/product');
const mongoose = require('mongoose')

router.get('/',(req, res, next)=>{
    Product.find()
    .select('name price _id')
    .exec()
    .then(docs => {
        const response = {
            total_count: docs.length,
            products: docs.map(doc=>{
                return {
                   name: doc.name,
                   price :doc.price,
                   _id: doc._id,
                   request: {
                    type: 'GET',
                    url: 'http://localhost:3000/products/'+doc._id
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

router.post('/', (req,res,next)=>{

    const new_product  = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    new_product
    .save()
    .then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));

    res.status(201).json({
        message: 'Handling POST requests to /products',
        createdProduct: new_product
    });
});

router.get('/:productID', (req,res,next)=>{
    const id =req.params.productID;
    Product.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        if(doc)
        {
        res.status(200).json(doc);
        } else {
            res.status(404).json({message: "didn't find any valid information for provided ID"})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: err})
    });

});

router.patch('/:productID', (req,res,next)=>{
    const id = req.params.productID;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.updateOne({_id:id}, {$set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error : err})
    });

})

router.delete('/:productID', (req,res,next)=>{
    const id = req.params.productID;
    Product.deleteOne({_id:id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err=>
        {
            console.log(err)
            res.status(500).json(
                {
                    error: err
                }
            )
        });
    res.status(200).json({
        message: 'Deleted product!'
    });
})

module.exports = router;