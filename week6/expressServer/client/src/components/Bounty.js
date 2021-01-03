// ---------------------------------------------------------------------- Importing React 
import React, {useState} from 'react';

// ---------------------------------------------------------------------- Importing Form Component
import AddBounty from './post/AddBounty';

// ---------------------------------------------------------------------- Bounty Function Reusable Component
export default function Bounty(props) {
    // ------------------------------------------------------------------ Setting Props
    const {firstName, lastName, isAlive, bountyAmount, type, _id} = props;
    
    // ------------------------------------------------------------------ Setting Toggle State Default To Inactive
    const [toggleEdit, setToggleEdit] = useState(false);

    // ------------------------------------------------------------------ Bounty Card
    return (
        <div className='cards-container'>
            <div>
                {/* Toggle Whether Or Not The Card Will Display The Individual Card Or A Edit Form */}
                {!toggleEdit ?
                    <>
                        <div className='bounty-name'>
                            <h1>{firstName}</h1>
                            <h1>{lastName}</h1>
                        </div>
                        <div className='status'>
                            <h4>Status: {isAlive ? 'Is Alive' : 'Is Dead'}</h4>
                            <h3>Reward: $ {bountyAmount}</h3>
                            <h3>Type: {type}</h3>
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
