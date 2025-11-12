import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

function GuitarAdd(){

    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const usertype = localStorage.getItem('usertype');
    const navigate = useNavigate();

    const submitdata = (e) => {
        e.preventDefault()
        Axios.post('http://localhost:3001/insertguitar', {
            brand: brand, model: model, price: price, stock: stock, usertype: usertype
        }).then(res => {
            alert(res.data.message)
            navigate('/guitarview')
        }).catch(err => {
            console.log(err)
            alert("Error adding guitar")
        })
    }

    const back = () => {
        navigate('/guitarview')
    }

    return(
        <div class="container mt-4">
            <h1>Add New Guitar</h1>
            <button type="button" class="btn btn-outline-dark mb-3" onClick={back}>Back</button>
            <div>
                <h2>Enter new guitar:</h2>
                <form>
                    <label>Brand</label>
                    <input 
                        type = "text"
                        className='form-control'
                        required
                        maxLength={100}
                        onChange={(e) => setBrand(e.target.value)}
                    />
                    <label>Model</label>
                    <input 
                        type = "text"
                        className='form-control'
                        required
                        maxLength={100}
                        onChange={(e) => setModel(e.target.value)}
                    />
                    <label>Price</label>
                    <input 
                        type = "number"
                        className='form-control'
                        required
                        step="0.01"
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <label>Stock</label>
                    <input 
                        type = "number"
                        className='form-control'
                        required
                        onChange={(e) => setStock(e.target.value)}
                    />
                    <button className='btn btn-success mt-4' onClick={submitdata}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default GuitarAdd;
