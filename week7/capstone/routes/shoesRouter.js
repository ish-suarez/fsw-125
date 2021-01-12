const express = require('express');
const shoesRouter = express.Router();

const {v4: uuidv4} = require('uuid');

const shoes = [
    {
        _id: uuidv4(),
        shoeName: 'Jordan Aerospace 720',
        shoeImage: 'https://stockx.imgix.net/Air-Jordan-Aerospace-720-Rookie-of-the-Year.png?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&q=90&trim=color&updated_at=1603481985&w=1000',
        shoeGender: 'Mens', 
        isAvailable: false, 
        price: 200, 
        colors: ['white', 'tan', 'orange', 'cream']
    },
    {
        _id: uuidv4(),
        shoeName: 'Converse All Star Disrupt CX',
        shoeImage: 'https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw527c5ffb/images/a_107/167754C_A_107X1.jpg?sw=964', 
        shoeGender: 'Mens', 
        isAvailable: true, 
        price: 120, 
        colors: ['blue slate', 'white', 'wild mango']
    },
    {
        _id: uuidv4(),
        shoeName: 'Vintage Check Cotton Sneakers',
        shoeImage: 'https://image.s5a.com/is/image/saks/0400011832238_A1?wid=984&hei=1312&qlt=90&resMode=sharp2&op_usm=0.9,1.0,8,0', 
        shoeGender: 'Womens', 
        isAvailable: false, 
        price: 750, 
        colors: ['archive beige']
    },
    {
        _id: uuidv4(),
        shoeName: 'Nike SB What The Dunk Shoes',
        shoeImage: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQG1vhwz6hc9vCcZPmp2LgiVwXCHzPSCZ8ddcscgHfFh1bV-xjVjHX1jd3lVrj_55oHpK_PJ-j7PiwIlFs0EF4Yl0wjOX1dMg&usqp=CAY', 
        shoeGender: 'Mens', 
        isAvailable: true, 
        price: 24465, 
        colors: ['red', 'tan', 'yellow', 'white', 'green', 'gold']
    }

]

shoesRouter.route('/')
    .get((req, res) => {
        res.status(200).send(shoes);
    })

    .post((req, res) => {
        const newShoe = req.body;
        newShoe._id = uuidv4();
        res.status(201).send(newShoe);
    })

shoesRouter.put('/:shoeId', (req, res) => {
    const shoeId = req.params.shoeId;
    const updateObject = req.body;
    const shoeIndex = shoes.findIndex(shoe => shoe._id === shoeId);
    const updatedShoe = Object.assign(shoes[shoeIndex], updateObject);
    res.status(201).send(updatedShoe);
})

shoesRouter.delete('/:shoeId', (req, res) => {
    const shoeId = req.params.shoeId;
    const filterShoe = shoes.findIndex(shoe => shoe._id === shoeId);
    shoes.splice(filterShoe, 1);
    res.status(200).send('Shoe has been deleted');
})

shoesRouter.get('/:shoeId', (req, res, next) => {
    const shoeId = req.params.shoeId;
    const selected = shoes.find((shoe => shoe._id === shoeId));
    if (!selected) {
        const error = new Error(`The shoe with id: '${shoesId}' does not exist`);
        res.status(500);
        return next(error);

    }
    res.status(200).send(selected);
})

shoesRouter.get('/search/isAvailable', (req, res, next) => {
    const isAvailable = req.query.isAvailable;
    if (!isAvailable) {
        const error = new Error('You must provide a an availability staus');
        res.status(500);
        return next(error);
    }
    const filterIsAvailable = shoes.filter(shoe => shoe.isAvailable === true);
    res.status(200).send(filterIsAvailable);
})

shoesRouter.get('/search/shoeGender', (req, res, next)=> {
    const gender = req.query.shoeGender;
    if (!gender) {
        const error = new Error(`You must enter a gender`);
        res.status(500);
        return next(error);
    }
    const filterGender = shoes.filter(shoe => shoe.shoeGender);
    res.status(500).send(filterGender);
})

shoesRouter.get('/search/shoeName', (req, res, next) => {
    const shoeName = req.query.shoeName;
    if (!shoeName) {
        const error = new Error('You must enter a shoe name');
        res.status(500);
        return next(error);
    }
    const filterShoeName = shoes.filter(shoe => shoe.shoeName.toLocaleLowerCase().includes(shoeName.toLowerCase()));
    res.status(200).send(filterShoeName);
})

module.exports = shoesRouter;









// shoesRouter.get('/:shoeId', (req, res) => {
//     const shoeId = req.params.shoeId;
//     const shoeSelected = shoes.find(shoe => shoe._id === shoeId);
//     if (!shoeSelected) {
//         const error = new Error(`The shoe with id: '${shoeId}' was not found or does not exist.`);
//         res.status(500);
//     }
//     res.status(200).send(shoeSelected);
// })

// shoesRouter 
