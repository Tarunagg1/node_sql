const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.json());

const PORT = 4000;

const pool = mysql.createPool({
    connectionLimit:10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'work'
})

app.get('/',(req,res) => {
    pool.getConnection((err,connection) => {
        if(err) throw err;
        connection.query("SELECT * from registrations",(err,data) => {
            connection.release();
            if(err) throw err;
            res.send(data);
        });
    })
})

app.get('/:id',(req,res) => {
    pool.getConnection((err,connection) => {
        if(err) throw err;
        connection.query("SELECT * from registrations WHERE id=?",[req.params.id],(err,data) => {
            connection.release();
            if(err) throw err;
            res.send(data);
        });
    })
})


app.delete('/:id',(req,res) => {
    pool.getConnection((err,connection) => {
        if(err) throw err;
        connection.query("DELETE from registrations WHERE id=?",[req.params.id],(err,data) => {
            connection.release();
            if(err) throw err;
            return res.status(200).json({message:"Record deleted successfully"});
        });
    })
})


app.post('/',(req,res) => {
    const {name,email,number,password} = req.body;
    pool.getConnection((err,connection) => {
        if(err) throw err;
        connection.query("INSERT INTO registrations SET ?",{name,email,number,password},(err,data) => {
            connection.release();
            if(err) throw err;
            res.send(data);
        });
    })
})


app.put('/:id',(req,res) => {
    const id = req.params.id;
    const {name} = req.body;
    pool.getConnection((err,connection) => {
        if(err) throw err;
        connection.query("UPDATE registrations SET name= ? WHERE id=? ",[name,id],(err,data) => {
            connection.release();
            if(err) throw err;
            res.send(data);
        });
    })
})


app.listen(PORT,() => {
    console.log('Server listning at: ',PORT);
})



