import React, {useState, useEffect} from 'react';
import axios from 'axios';
import _ from 'lodash';

import Header from './components/header/Header';
import ShoeForm from './components/post/ShoeForm';
import Shoes from './components/shoes/Shoes';
import Shoe from './components/get/Shoe'

import './app.css';


export default function App() {
    // Use State For Array Of Shoes
    const [shoes, setShoes] = useState([]);

    // Mens Shoes
    const [mensShoes, setMensShoes] = useState([]);

    // Womens Shoes
    const [womensShoes, setWomensShoes] = useState([]);


    // Use State For One Shoe
    // const [shoe, setShoe] = useState([]);

    // Form Toggle
    const [toggleForm, setToggleForm] = useState(false);

    // Toggle Get One 
    const [toggleMensShoes, settoggleMensShoes] = useState(false);

    // Post One Shoe
    const addShoe = newShoe => {
        axios.post('/shoes', newShoe)
            .then(res => {
                setShoes(prevShoes => [res.data, ...prevShoes]);
            })
            .catch(err => console.log(err));
    }

    // Get All Shoes
    const getShoes = () => {
        axios.get('/shoes')
            .then(res => setShoes(res.data))
            .catch(err => console.log(err.response.data.errMsg));
    }

    // Update One Shoe
    const editShoe = (updates, shoeId) => {
        axios.put(`/shoes/${shoeId}`, updates)
            .then(res => {
                setShoes(prevShoes => _.map(prevShoes, shoe => shoe._id !== shoeId ? shoe : res.data));
                window.location.reload();
            })
            .catch(err => console.log(err));
    }

    // Delete One Shoe
    const deleteShoe = shoeId => {
        axios.delete(`/shoes/${shoeId}`)
            .then(res => {
                setShoes(prevShoes => _.filter(prevShoes, shoe =>  shoe._id !== shoeId));
            })
            .catch(err => console.log(err));
    }

    // Get One Shoe
    // const getShoeById = shoeId => {
    //     axios.get(`/shoes/${shoeId}`)
    //         .then(res => {
    //             setShoes(_.find(shoes, info => info._id === shoeId));
    //         })
    //         .catch(err => console.log(err));
    // }

    // Get Mens Shoes
    // const getMensShoes = () => {
    //     axios.get(`/shoes/search/shoeGender`, {params: {shoeGender: 'Mens'}})
    //         .then(res => console.log(res.data))
    // }
    // console.log(getMensShoes)
    // Get Womens Shoes
    // const getWomensShoes = () => {
    //     axios.get(`/shoes/search/shoeGender`, {params: {shoeGender: 'Womens'}})
    //         .then(res => {
    //             setWomensShoes(res.data)
    //         })
    //         .catch( err => console.log(err));
    // }

    // useEffect(() => {
    //     getMensShoes();
    // }, []);

    // Use Effect
    useEffect(() => {
        getShoes();
    }, []);

    return (
        <>  
            <div className='site-container'>
                <Header />
                {!toggleForm ?
                    <div className='activate-form'>
                        <h4>Have a new shoe for your inventory?</h4>
                        <div className='activate-button'>
                            <button onClick={() => setToggleForm(prevToggle => !prevToggle)}>Add A New Shoe here</button>
                        </div>
                    </div>
                :
                    <div className='form-active'>
                        <div>
                            <ShoeForm submit={addShoe} btnText='Add New Shoe' />
                        </div>
                        <div className='deactivate-button'>
                            <button onClick={() => setToggleForm(prevToggle => !prevToggle)}>Finished Adding Shoes</button>
                        </div>
                    </div>
                }
                <div className='shoes-container'>
                    {_.map(shoes, shoe => <Shoes {...shoe} key={shoe.shoeName} deleteShoe={deleteShoe} editShoe={editShoe} />)}
                </div>
            </div>
        </>
    );
}