import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';

function GuitarUpdate(){
    const {idguitar} = useParams();
    const [guitar, setGuitar] = useState([]);
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const usertype = localStorage.getItem('usertype');
    const navigate = useNavigate();

    useEffect(() => {
        Axios.get(`http://localhost:3001/getguitar/${idguitar}`, { withCredentials: true })
        .then( res => {
            setGuitar(res.data[0]);

            let mydata = res.data[0]
            setBrand(mydata.brand)
            setModel(mydata.model)
            setPrice(mydata.price)
            setStock(mydata.stock)
        })
        .catch(error => {
            console.log(error);
        })
    }, [idguitar]);

    const back = () => {
        navigate('/guitarview')
    }

    const submitdata = (e) => {
        e.preventDefault()
        Axios.put('http://localhost:3001/updateguitar', {
            idguitar: idguitar, brand: brand, model: model, price: price, stock: stock, usertype: usertype
        }).then(res => {
            alert(res.data.message);
            navigate('/guitarview')
        }).catch(err => {
            console.log(err)
            alert("Error updating guitar")
        })
    }

    return(
        <div class="container mt-4">
            <h1>Update Guitar</h1>
            <h2>{guitar.brand} {guitar.model} - ID: {idguitar}</h2>
            <button type="button" class="btn btn-outline-dark mb-3" onClick={back}>Back</button>
            <div>
                <h2>Update guitar details:</h2>
                <form>
                    <label>Brand</label>
                    <input 
                        type = "text"
                        className='form-control'
                        required
                        maxLength={100}
                        value = {brand}
                        onChange={(e) => setBrand(e.target.value)}
                    />
                    <label>Model</label>
                    <input 
                        type = "text"
                        className='form-control'
                        required
                        maxLength={100}
                        value = {model}
                        onChange={(e) => setModel(e.target.value)}
                    />
                    <label>Price</label>
                    <input 
                        type = "number"
                        className='form-control'
                        required
                        step="0.01"
                        value = {price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <label>Stock</label>
                    <input 
                        type = "number"
                        className='form-control'
                        required
                        value = {stock}
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

export default GuitarUpdate;
