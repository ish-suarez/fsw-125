const express = require('express'); // Importing Express
const app = express(); // Declaring Server Variable
const morgan = require('morgan'); // Importing Morgan
// ------------------------------------------- Installing Express-Query-Boolean
const booleanParser = require('express-query-boolean');
// Middleware (for every request) // Looks For A Request Body, And Turns It Into 'req.body'
    app.use(express.json());
    app.use(booleanParser());
    app.use(morgan('dev')); // Logs Request To The Console
// ---------------------------------------------------------------- Setting More Middle Ware
// ---------------------------------------------------------------- Server Imports
app.use('/bounties', require('./routes/bountyRouter'));
app.use('/todo', require('./routes/todoRouter'));
// ------------------------------------------------------------------- Server Is Set To Listen
//  -------------------Two Arguments: PORT, CB
app.listen(9000, () => {
    console.log('The Server Is Listening'); 
})