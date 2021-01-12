import React, {useState}from 'react'

import './shoeForm.css';

export default function ShoeForm(props) {
    const {_id, shoeName, shoeImage, shoeGender, isAvailable, price, colors, submit, btnText} = props;

    // Setting Initial Inputs and Setting Hook For Inputs 
    const initialInputs = {
        shoeName: shoeName ||  '',
        shoeImage: shoeImage || '',
        shoeGender: shoeGender || '', 
        isAvailable: isAvailable || null, 
        price: price ||  undefined, 
        colors: colors || []
    }
    // Inputs
    const [input, setInput] = useState(initialInputs);
    
    // Handeling Changes From The Form
    const handleChange = (e) => {
        const {name, value} = e.target;
        setInput(prevInput => ({...prevInput, [name]: value}));
    }
    // Handeling The Radio Input Changes
    const handleRadio = (e) => {
        const isShoeAvailable = e.currentTarget.value === 'true' ? true : false;
        setInput(prevInput => ({...prevInput, isAvailable: isShoeAvailable}));
        
    }

    // Submitting Form / POST
    const formSubmit = (e) => {
        e.preventDefault();
        submit(input, _id);
        setInput(initialInputs);
    }
    // Form With Required inputs
    return (
        <form className="form-container" onSubmit={formSubmit}>
            <input 
                type='text' 
                name='shoeName' 
                value={input.shoeName} 
                onChange={handleChange} 
                placeholder='Shoe Name'
                required
            />            
            <input 
                type='text' 
                name='shoeGender' 
                value={input.shoeGender} 
                onChange={handleChange} 
                placeholder='Shoe Gender'
                required 
            />
            <input 
                type='url'
                name='shoeImage'
                value={input.shoeImage}
                onChange={handleChange}
                placeholder='Shoe Image'
                required
            />
            {/* Radio Inputs To State Whether Bounty is Dead Or Alive */}
            <div className='radio-container'>
                <span>Is Available</span>
                    <input 
                        type='radio' 
                        name='isAvailable' 
                        value='true'
                        onChange={handleRadio}
                        checked={input.isAvailable === true} 
                    />
                    
                <span>Is Not Available</span>
                    <input 
                        type='radio' 
                        name='isAvailable' 
                        value='false' 
                        onChange={handleRadio}
                        checked={input.isAvailable ? false : true}  
                    />
            </div>
            <input 
                type='number' 
                name='price' 
                value={input.price} 
                onChange={handleChange} 
                placeholder='Bounty Ammount $$$'
                required 
            />
            <input 
                type='text' 
                name='colors' 
                value={input.colors} 
                onChange={handleChange} 
                placeholder='Shoe Colors'
                required 
            /> 
            <div>
                <button>{btnText}</button>        
            </div>
        </form>
    );
}