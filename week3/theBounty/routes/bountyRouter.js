
//  -------------------------------------------------------------------------------- Importing Express
const express = require('express');

//  --------------------------------------------------------------------------------- Setting bountyRouter with express.Router()
const bountyRouter = express.Router();

//  --------------------------------------------------------------------------------- Using uuid To Set A Unique id
const { v4: uuidv4 } = require('uuid');

//  -------------------------------------------------------------------------------- Bounty Endpoint
const bounties = [
    {firstName: 'Anakin', lastName: 'Skywalker', alive: true, bountyAmount: 54244574657654, type: 'Sith', _id: uuidv4() },
    {firstName: 'Savage', lastName: 'Opress', alive: true, bountyAmount: 80594564645, type: 'Sith', _id: uuidv4() },
    {firstName: 'Dessel', lastName: 'Bane', alive: false, bountyAmount: 464665464, type: 'Sith', _id: uuidv4() },
    {firstName: 'Tarre', lastName: 'Vizsla', alive: false, bountyAmount: 788446, type: 'Sith', _id: uuidv4() },
    {firstName: 'Darth', lastName: 'Zannah', alive: false, bountyAmount: 12435465, type: 'Sith', _id: uuidv4() }
]

// -----------------------------------------------------Server Request For Users
bountyRouter.route('/')
    //  -------------------------------------------------------- Get Request
    .get((req, res) => {
        res.send(bounties)
    })
    // -------------------------------------------------------- Post Request
    .post((req, res) => {
        const newBounty = req.body
        newBounty._id = uuidv4()
        bounties.push(newBounty)
        res.send(`Successfully Added ${newBounty.firstName} ${newBounty.lastName} To The Data Base`)
    })

module.exports = bountyRouter