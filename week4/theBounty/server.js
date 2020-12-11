const express = require('express') // Importing Express
const app = express() // Declaring Server Variable

// Middleware (for every request) // Looks For A Request Body, And Turns It Into 'req.body'
app.use(express.json())
// ------------------------------------------- Installing Express-Query-Boolean
const booleanParser = require('express-query-boolean')
app.use(booleanParser())

// ---------------------------------------------------------------- Setting More Middle Ware
app.use('/bounties', require('./routes/bountyRouter'))

//  ---------------------------------------------------------------------------------Two Arguments: PORT, CB
app.listen(9000, () => {
    console.log('The Server Is Listening') // Server Is Set To Listen
})