import React, {useState, useEffect} from 'react';
import { useNavigate, generatePath } from 'react-router-dom';
import Axios from 'axios';

function GuitarView(){

    const [guitars, setGuitars] = useState([]);
    const [clickedRow, setClickedRow] = useState(0);
    const usertype = localStorage.getItem('usertype');
    const navigate = useNavigate();
    
    const selectidguitar = (idguitar) => {
        setClickedRow(idguitar);
    }
    console.log(clickedRow)

    const gotoupdate = () => {
        let idguitar = clickedRow
        if(idguitar === 0){
            alert("Select a guitar first to update")
        }
        else{
            navigate(generatePath("/updateguitar/:idguitar", {idguitar}))
        }
    }

    const gotoadd = () => {
        navigate('/guitaradd')
    }

    useEffect(() => {
        Axios.get('http://localhost:3001/viewguitars', { withCredentials: true })
        .then( res => {
            console.log(res.data)
            setGuitars(res.data);
        })
        .catch(error => {
            console.log(error);
        })
    }, []);

    return(
        <div class="container mt-4">
            <h1>List of Guitars</h1>
            {usertype === 'admin' && (
                <div class="mb-3">
                    <button type="button" class="btn btn-success me-2" onClick={gotoadd}>Add Guitar</button>
                    <button type="button" class="btn btn-outline-info" onClick={gotoupdate}>Update Guitar</button>
                </div>
            )}
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Brand</th>
                        <th scope="col">Model</th>
                        <th scope="col">Price</th>
                        <th scope="col">Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {guitars.map((guitar, index) => (
                        <tr key={index} class={clickedRow === guitar.idguitar ? "table-success border-5" : "table-primary"}
                            onClick={() => selectidguitar(guitar.idguitar)}
                        >
                            <th scope="row">{guitar.idguitar}</th>
                            <td>{guitar.brand}</td>
                            <td>{guitar.model}</td>
                            <td>${guitar.price}</td>
                            <td>{guitar.stock}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default GuitarView;
