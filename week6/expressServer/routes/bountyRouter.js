
//  ------------------------------Importing Express
const express = require('express');

//  ------------------------------Setting bountyRouter with express.Router()
const bountyRouter = express.Router();

//  ------------------------------Using uuid To Set A Unique id
const { v4: uuidv4 } = require('uuid');

//–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– Bounty Endpoint ––––––––––––––––––––––––––––––––––––––––––––––
const bounties = [
    {firstName: 'Anakin', lastName: 'Skywalker', isAlive: true, bountyAmount: 54244574657654, type: 'Sith', _id: uuidv4() },
    {firstName: 'Savage', lastName: 'Opress', isAlive: true, bountyAmount: 80594564645, type: 'Sith', _id: uuidv4() },
    {firstName: 'Dessel', lastName: 'Bane', isAlive: false, bountyAmount: 464665464, type: 'Sith', _id: uuidv4() },
    {firstName: 'Tarre', lastName: 'Vizsla', isAlive: false, bountyAmount: 788446, type: 'Sith', _id: uuidv4() },
    {firstName: 'Darth', lastName: 'Zannah', isAlive: false, bountyAmount: 12435465, type: 'Sith', _id: uuidv4()}
];

//–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– Server Request For Bounties –––––––––––––––––––––––––––––––––––––––––––
bountyRouter.route('/')
    //  --------------------------Get All Request
    .get((req, res) => {
        res.status(200).send(bounties);
    })
    // ---------------------------Post Request
    .post((req, res) => {
        const newBounty = req.body;
        newBounty._id = uuidv4();
        bounties.push(newBounty);
        res.status(201).send(newBounty);
    })
    // --------------------------- Get One Request
    bountyRouter.get('/:bountyId', (req, res, next) => {
        const bountyId = req.params.bountyId;
        const selected = bounties.find(bounty => bounty._id === bountyId);
        if(!selected) {
            const error = new Error(`The Bounty with id ${bountyId} was not found`);
            res.status(500);
            return next(error);
        }
        res.status(200).send(selected);
    })
    // ––––––––––––––––––––––––––––––––– Query Selector For Bounty ––––––––––––––––––––––––––––––––––––––––––––––
    // --------------Get If Bounty Is Alive
    bountyRouter.get('/search/isAlive', (req, res, next) => {
        // const isAlive = req.query.isAlive ---- Not Needed But Useful For Other Queries 
        const isAlive = req.query.isAlive
        if(!isAlive) {
            const error = new Error(`You must provide a status if isAlive is true or false`);
            res.status(500);
            return next(error);
        }
        const queryIsAlive = bounties.filter(bounty => bounty.isAlive === true);
        res.status(200).send(queryIsAlive);
    })
    //---------------Delete Request
    bountyRouter.delete('/:bountyId', (req, res) => {
        const bountyId = req.params.bountyId;
        const bountyIndex = bounties.findIndex(bounty => bounty._id === bountyId);
        bounties.splice(bountyIndex, 1);
        res.status(200).send(`Deleted Bounty`);
    })
    // ----------------Update One
    bountyRouter.put('/:bountyId', (req, res) => {
        const bountyId = req.params.bountyId;
        const updateObject = req.body;
        const bountyIndex = bounties.findIndex(bounty => bounty._id === bountyId);
        const updatedBounty = Object.assign(bounties[bountyIndex], updateObject);
        res.status(201).send(updatedBounty);
    })

module.exports = bountyRouter;