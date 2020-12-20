// ---------------------------------------------------------------- Importing React
import React, { useState, useEffect} from 'react';

// ---------------------------------------------------------------- Importing Axios
import axios from 'axios';

// ------------------------------ Importing Lodash
import _ from 'lodash';

// ---------------------------------------------------------------- Importing Components
import Header from './components/Header';
import Bounty from './components/Bounty';
import AddBounty from './components/post/AddBounty';

// ---------------------------------------------------------------- APP FUNCTION
export default function App() {
    const [bounties, setBounties] = useState([]);

    // ------------------------------ Get All bounties
    const getBounties = () => {
        axios.get('/bounties')
            .then(res => setBounties(res.data))
            .catch(err => console.log(err));
    }

    // ------------------------------ Add Bounty Function
    const addNewBounty = newBounty => {
        axios.post('/bounties', newBounty)
            .then(res => {
                setBounties(prevBounties => [...prevBounties, res.data]);
            })
            .catch(err => console.log(err));
    }
    // ------------------------------ Delete A Bounty
    const deleteBounty = bountyId => {
        axios.delete(`/bounties/${bountyId}`)
            .then(res => {
                setBounties(prevBounties => _.filter(prevBounties, bounty => bounty._id !== bountyId));
            })
            .catch(err => console.log(err));
    }

    const editBounty = (updates, bountyId ) => {
        axios.put(`/bounties/${bountyId}`, updates) 
            .then(res => {
                setBounties(prevBounties => _.map(prevBounties, bounty => bounty._id !== bountyId ? bounty : res.data))
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getBounties();
    }, [])

    return (
        <>
            <Header />
            <div className='map-container'>
                <AddBounty submit={addNewBounty} btnText='Add Bounty'/>
                {_.map(bounties, bounty => <Bounty {...bounty} key={bounty.firstName} deleteBounty={deleteBounty} editBounty={editBounty}/>)}
            </div>
        </>
    );
}
