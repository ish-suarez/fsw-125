import React from 'react';

import './shoe.css';

export default function Shoe(props) {
    const {_id, shoeName, shoeGender, shoeImage, price, colors, isAvailable} = props;

    return (
        <div className='shoe' id={_id}>
            <h4>{shoeName}</h4>
            <h4>{shoeGender}</h4>
            <img src={shoeImage} alt='shoe'/>
            <h4>${price}.00</h4>
            <h4>Status: {isAvailable ? 'Is Available' : 'Is not Available'}</h4>
            <h4>{colors}</h4>
        </div>
    );
}
