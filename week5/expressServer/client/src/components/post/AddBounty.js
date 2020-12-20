import React, {useState}from 'react'

export default function AddBounty(props) {
    const initialInputs = {firstName: props.firstName ||  '', lastName: props.lastName || '', isAlive: props.isAlive || null, bountyAmount: props.bountyAmount ||  undefined, type: props.type || ''}
    const [input, setInput] = useState(initialInputs);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInput(prevInput => ({...prevInput, [name]: value}));
    }

    const handleRadio = (e) => {
        const isAlive = e.currentTarget.value === 'true' ? true : false;
        setInput(prevInput => ({...prevInput, isAlive}));
        
    }

    const formSubmit = (e) => {
        e.preventDefault();
        props.submit(input, props._id);
        setInput(initialInputs);
    }

    return (
        <form className="form-container" onSubmit={formSubmit}>
            <div className='form-contents'>
                <h4 className='form-header'>Enter A New Bounty</h4>
                <input 
                    type='text' 
                    name='firstName' 
                    value={input.firstName} 
                    onChange={handleChange} 
                    placeholder='First Name'
                    required
                />            
                <input 
                    type='text' 
                    name='lastName' 
                    value={input.lastName} 
                    onChange={handleChange} 
                    placeholder='Last Name'
                    required 
                />
                <div className='radio-container'>
                    <span>Is Alive</span>
                        <input 
                            type='radio' 
                            name='isAlive' 
                            value='true'
                            onChange={handleRadio}
                            checked={input.isAlive === true} 
                        />
                    
                    <span>Is Dead</span>
                        <input 
                            type='radio' 
                            name='isAlive' 
                            value='false' 
                            onChange={handleRadio}
                            checked={input.isAlive === false}  
                        />
                </div>
                <input 
                    type='number' 
                    name='bountyAmount' 
                    value={input.bountyAmount} 
                    onChange={handleChange} 
                    placeholder='Bounty Ammount $$$'
                    required 
                />
                <input 
                    type='text' 
                    name='type' 
                    value={input.type} 
                    onChange={handleChange} 
                    placeholder='Type Of Bounty'
                    required 
                />    
                <button>{props.btnText}</button>        
            </div>
        </form>
    )
}
