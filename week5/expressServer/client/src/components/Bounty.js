import React, {useState} from 'react'
import AddBounty from './post/AddBounty'

export default function Bounty(props) {
    const {firstName, lastName, isAlive, bountyAmount, type, _id} = props;
    const [toggleEdit, setToggleEdit] = useState(false);
    return (
        <div className='cards-container'>
            <div>
                {!toggleEdit ?
                    <>
                        <div className='bounty-name'>
                            <h1>{firstName}</h1>
                            <h1>{lastName}</h1>
                        </div>
                        <div className='status'>
                            <h4>Status: {isAlive ? 'Is Alive' : 'Is Dead'}</h4>
                            <h3>Reward: $ {bountyAmount}</h3>
                        </div>
                        <button id={_id} className='btn' onClick={() => props.deleteBounty(_id)}>Delete</button>
                        <button id={_id} className='edit-btn' onClick={() => setToggleEdit(prevToggle => !prevToggle)} >Edit</button>
                    </>
                :
                    <>
                        <h2>Edit Bounty</h2>
                        <div className='edit-form'>
                            <AddBounty firstName={firstName} lastName={lastName} isAlive={isAlive} bountyAmount={bountyAmount} type={type} _id={_id}  btnText='Submit Edit' submit={props.editBounty}/>
                            <button onClick={() => setToggleEdit(prevToggle => !prevToggle)}>Cancel</button>
                        </div>
                    </>
                }
            </div>
        </div>
    );
}
