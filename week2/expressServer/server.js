const express = require('express') // Importing Express
const app = express() // Declaring Server Variable

// User Endpoint
const users = [
    {name: 'Ismael', age: 29},
    {name: 'Bob', age: 29},
    {name: 'Carlos', age: 29},
    {name: 'Mel', age: 29},
    {name: 'Zac', age: 29}
]

// Mythical God Endpoint
const mythicalGods = [
    {name: 'Zeus', godOf: 'God of Sky'},
    {name: 'Poseidon', godOf: 'God of The Sea'},
    {name: 'Hades', godOf: 'God of The Dead'},
    {name: 'Ares', godOf: 'God of War'},
    {name: 'Aphrodite', godOf: 'God of Love'}
]

// DC Characters Endpoint
const dcCharacters = [
    {name: 'Bat Man'},
    {name: 'Joker'},
    {name: 'Wonder Woman'},
    {name: 'Deathstroke'},
    {name: 'Harley Quinn'}
]

    // Endpoint (mount path) , CallBack function

// Server Request For Users
app.get('/users', (req, res) => {
    res.send(users)
})

// Server Request For Mythical Gods
app.get('/mythicalGods', (req, res) => {
    res.send(mythicalGods)
})

// Server Request For DC Characters
app.get('/dcCharacters', (req, res) => {
    res.send(dcCharacters)
})

    // Two Arguments: PORT, CB
app.listen(9000, () => {
    console.log('The Server Is Listening') // Server Is Set To Listen
})