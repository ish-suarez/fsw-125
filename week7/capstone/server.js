// Importing express packages
const express = require('express');
const app = express();
const morgan = require('morgan');

const booleanParser = require('express-query-boolean');
    // Middleware
    app.use(express.json());
    app.use(booleanParser());
    app.use(morgan('dev'));
    
    // Shoe Route
    app.use('/shoes', require('./routes/shoesRouter'));

// Error Handling
app.use((err, req, res, next) => {
    console.log(err);
    return res.send({errMsg: err.message});
})

// Server Set To Listen
app.listen(9000, () => {
    console.log('The Server Is Listening'); 
});
