const express = require('express');
const mongoose = require('mongoose');

const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Handling CORS errors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});

const productRoutes = require('./api/routers/products');
const userRouters = require('./api/routers/users');
const orderRouters = require('./api/routers/orders');
const postRouters = require('./api/routers/posts');


// connecting to mongodb
const dbURI ='mongodb+srv://admin-user:admin@users-posts-rest.7w8e7cj.mongodb.net/?retryWrites=true&w=majority&appName=users-posts-rest';
mongoose.connect(dbURI
    // {
    //     useNewUrlParser: true, 
    //     useUnifiedTopology: true
    // }
    )
    .then((result) => {
        console.log('connected to db')
    })
    .catch((err) => console.log(err))




app.use('/products', productRoutes);
app.use('/users', userRouters);
app.use('/orders', orderRouters);
app.use('/posts', postRouters);

app.use((req,res,next)=>
{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);

})

app.use((error, req, res, next)=>
{
    res.status(error.status || 500);
    res.json({
        message: 'Something went wrong:',
        error:
        {
            message: error.message
        }
    })
})
module.exports = app;

