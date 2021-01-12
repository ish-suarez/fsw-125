import React, {useState} from 'react';

import Shoe from '../get/Shoe';
import ShoeForm from '../post/ShoeForm';

import './shoes.css';

export default function Shoes(props) {
    // Setting Props
    const {_id, shoeName, shoeImage, shoeGender, isAvailable, price, colors, deleteShoe, editShoe} = props;
    
    // Edit Function
    const [toggleEdit, setToggleEdit] = useState(false);

    const [toggleGet, setToggleGet] = useState(false);

    return (
        <div>
            {!toggleGet ?
                <>
                    {!toggleEdit ? 
                        <>
                            <div className='shoe-card' >
                                <div className='shoe-name'>
                                    <h3 onClick={() => setToggleGet(prevToggle => !prevToggle)}>{shoeName} - {shoeGender}</h3> 
                                </div>
                                <div className='image-container'>
                                    <img className='shoe-image' src={shoeImage} alt='shoe' />
                                </div>
                                <div className='buttons'>
                                    <button onClick={() => deleteShoe(_id)}>Delete Shoe</button>
                                    <button onClick={() => setToggleEdit(prevToggle => !prevToggle)} >Shoe Edit</button>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <div className='edit-container'>
                                <h4>Edit Shoe</h4>
                                <div>
                                    <ShoeForm 
                                        _id={_id} 
                                        shoeName={shoeName} 
                                        shoeImage={shoeImage} 
                                        shoeGender={shoeGender} 
                                        isAvailable={isAvailable}
                                        price={price} 
                                        colors={colors} 
                                        btnText='Submit Edit'
                                        submit={editShoe}
                                    />
                                </div>
                                <div className='close-form'>
                                    <button onClick={() => setToggleEdit(prevToggle => !prevToggle)}>Cancel Edit</button>
                                </div>
                            </div>
                        </>
                    }
                </>
            :
                <>
                    <div className='get-container'>
                    <button className='close-button' onClick={() => setToggleGet(prevToggle => !prevToggle)}>X</button>
                        <Shoe 
                            _id={_id} 
                            shoeName={shoeName} 
                            shoeImage={shoeImage} 
                            shoeGender={shoeGender} 
                            isAvailable={isAvailable}
                            price={price} 
                            colors={colors} 
                            submit={editShoe}
                        />
                    </div>
                </>
            }
        </div>
    );
}

