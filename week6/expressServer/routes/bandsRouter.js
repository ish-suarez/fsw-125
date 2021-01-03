const express = require('express');
const bandsRouter = express();

const {v4: uuidv4} = require('uuid');

const bands = [
    {bandName: 'The Read Pears', origin: 'california', type: 'alternative', _id: uuidv4()},
    {bandName: 'Foo Fighters', origin: 'washington', type: 'rock', _id: uuidv4()},
    {bandName: 'Red Hot Chili Peppers', origin: 'california', type: 'alternative', _id: uuidv4()},
    {bandName: 'AC/DC', origin: 'australia', type: 'rock', _id: uuidv4()}
]

bandsRouter.route('/')
    // get all
    .get((req, res) => res.status(200).send(bands))
    // post one
    .post((req, res) => {
        const newBand = req.body;
        newBand._id = uuidv4();
        bands.push(newBand);
        res.status(201).send(`${newBand} has been added to your bands`);
    })
// get one
bandsRouter.get('/:bandId', (req, res, next) => {
    const bandId = req.params.bandId;
    const bandSelected = bands.find(band => band._id === bandId);
    if(!bandSelected) {
        const error = new Error(`The band with id: ${bandId} does not exist or is not found`);
        return next(error);
    }
    res.status(200).send(bandSelected);
})
// Query Selector for band origin
bandsRouter.get('/search/origin', (req, res, next) => {
    const bandOrigin = req.query.origin;
    const bandOriginQuery = bands.filter(band => band.origin === bandOrigin);
    if (!bandOrigin) {
        const error = new Error(`You must query for bands origin`);
        return next(error);
    }
    res.status(200).send(bandOriginQuery);
})
// query for band type
bandsRouter.get('/search/type', (req, res, next) => {
    const bandType = req.query.type;
    const bandTypeQuery = bands.filter(band => band.type === bandType);
    if (!bandTypeQuery) {
        const error = new Error(`${bandType} is not valid. You must query for a music type`);
        return next(error);
    }
    res.status(200).send(bandTypeQuery);
})

module.exports = bandsRouter;

