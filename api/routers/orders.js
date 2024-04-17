const express = require('express')
const router = express.Router()

router.get('/', (req,res,next)=>{
    res.status(200).json({
        message: 'Orders were fetched'
    })
})


router.post('/', (req,res,next)=>{
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message: 'Order were created',
        order: order,
    })
})

router.get('/:orderId', (req,res,next)=>{
    id = req.params.orderId
    if (id == 'test'){
        res.status(200).json({
            message: 'getting order by id function works well!',
            id: id
        });

    } else {
        res.status(200).json({
            message: 'You passed an ID'
        });
    }
});

router.delete('/:orderId', (req,res,next)=>{
    id = req.params.orderId
    res.status(200).json({
            message: 'Deleted order!',
            id: id
        });

});


router.patch('/:orderId', (req,res,next)=>{
    id = req.params.orderId
    res.status(200).json({
            message: 'Updated order!',
            id: id
        });

});
module.expor

module.exports = router