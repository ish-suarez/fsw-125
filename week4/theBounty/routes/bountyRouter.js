
//  ------------------------------------------------------------------ Importing Express
const express = require('express');

//  ------------------------------------------------------------------ Setting bountyRouter with express.Router()
const bountyRouter = express.Router();

//  ------------------------------------------------------------------ Using uuid To Set A Unique id
const { v4: uuidv4 } = require('uuid');

//  ------------------------------------------------------------------ Bounty Endpoint
const bounties = [
    {firstName: 'Anakin', lastName: 'Skywalker', isAlive: true, bountyAmount: 54244574657654, type: 'Sith', _id: uuidv4() },
    {firstName: 'Savage', lastName: 'Opress', isAlive: true, bountyAmount: 80594564645, type: 'Sith', _id: uuidv4() },
    {firstName: 'Dessel', lastName: 'Bane', isAlive: false, bountyAmount: 464665464, type: 'Sith', _id: uuidv4() },
    {firstName: 'Tarre', lastName: 'Vizsla', isAlive: false, bountyAmount: 788446, type: 'Sith', _id: uuidv4() },
    {firstName: 'Darth', lastName: 'Zannah', isAlive: false, bountyAmount: 12435465, type: 'Sith', _id: uuidv4() }
]

// ------------------------------------------------------------------- Server Request For Users
bountyRouter.route('/')
    //  -------------------------------------------------------------- Get All Request
    .get((req, res) => {
        res.send(bounties)
    })
    // ---------------------------------------------------------------  Get One Request
    bountyRouter.get('/:bountyId', (req, res) => {
        const bountyId = req.params.bountyId
        const selected = bounties.find(bounty => bounty._id === bountyId)
        res.send(selected)
    })
    // ---------------------------------------------------------------  Query Selector
    // -------------------------------------------------- Get If Bounty Is Alive
    bountyRouter.get('/search/isAlive', (req, res) => {
        // const isAlive = req.query.isAlive ---- Not Needed But Useful For Other Queries
        const queryIsAlive = bounties.filter(bounty => bounty.isAlive === true)
        res.send(queryIsAlive)
    })
    // -------------------------------------------------- Post Request
    .post((req, res) => {
        const newBounty = req.body
        newBounty._id = uuidv4()
        bounties.push(newBounty)
        res.send(`Successfully Added ${newBounty.firstName} ${newBounty.lastName} To The Data Base`)
    })
    //--------------------------------------------------- Delete Request
    bountyRouter.delete('/:bountyId', (req, res) => {
        const bountyId = req.params.bountyId
        const bountyIndex = bounties.findIndex(bounty => bounty._id === bountyId)
        bounties.splice(bountyIndex, 1)
        res.send(`Deleted Bounty`)

    })
    //---------------------------------------------------- Update One
    bountyRouter.put('/:bountyId', (req, res) => {
        const bountyId = req.params.bountyId
        const updateObject = req.body
        const bountyIndex = bounties.findIndex(bounty => bounty._id === bountyId)
        const updatedBounty = Object.assign(bounties[bountyIndex], updateObject)
        res.send(updatedBounty)
    })


module.exports = bountyRouter