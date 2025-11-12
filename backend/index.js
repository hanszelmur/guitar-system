const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'guitar_db'
})
db.getConnection(function (err){
    if (err){
        return console.error('error: ' + err.message)
    }
    else{
        console.log("Connected to MySQL Server")
    }
})

app.post('/login', (req, res) => {
    const {username, password} = req.body;
    try{
        const myquery = "SELECT * from users where username = ? AND password = ?;"
        db.query(myquery, [username, password], (err, result) => {
            if (err){
                console.log('sql error: ' + err)
                res.status(500).json({error: "SQL error"})
            }
            else{
                if(result.length > 0){
                    res.send(result[0])
                }
                else{
                    res.status(401).json({error: "Invalid credentials"})
                }
            }
        })
    }
    catch(error){
        console.error(error)
        res.status(500).json({error: "SQL error"})
    }
});

app.get('/viewguitars', async (req, res) => {
    try{
        const myquery = "SELECT * from guitar;"
        db.query(myquery, (err, result) => {
            if (err){
                console.log('sql error: ' + err)
            }
            else{
                res.send(result)
            }
        })
    }
    catch(error){
        console.error(error)
        res.status(500).json({error: "SQL error"})
    }
});

app.get('/getguitar/:idguitar', async (req, res) => {
    const idguitar = req.params.idguitar;
    try{
        const myquery = "SELECT * from guitar where idguitar = ?;"
        db.query(myquery, [idguitar], (err, result) => {
            if (err){
                console.log('sql error: ' + err)
            }
            else{
                res.send(result)
            }
        })
    }
    catch(error){
        console.error(error)
        res.status(500).json({error: "SQL error"})
    }
});

app.put('/updateguitar', (req, res) => {
    const {idguitar, brand, model, price, stock, usertype} = req.body;
    if(usertype !== 'admin'){
        return res.status(403).json({error: "Unauthorized - Admin only"})
    }
    const myquery = "UPDATE guitar SET brand = ?, model = ?, price = ?, stock = ? where idguitar = ?;"
    db.query(myquery,[brand, model, price, stock, idguitar], (err, result) =>{
        if (err){
            console.log(err)
        }
        else{
            return res.status(200).json({ message: "Updated successfully", success: true, data: result });
        }
    } )
})

app.post('/insertguitar', (req, res) => {
    const {brand, model, price, stock, usertype} = req.body;
    if(usertype !== 'admin'){
        return res.status(403).json({error: "Unauthorized - Admin only"})
    }
    const myquery = "INSERT INTO guitar (brand, model, price, stock) VALUES (?, ?, ?, ?);"
    db.query(myquery,[brand, model, price, stock], (err, result) =>{
        if (err){
            console.log(err)
        }
        else{
            console.log(result)
            return res.status(200).json({ message: "Guitar inserted successfully", success: true, data: result });
        }
    } )
})

app.listen(3001, () => {
  console.log('Running in 3001');
});
