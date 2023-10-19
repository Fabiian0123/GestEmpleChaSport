const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"empleados_crud"
});

app.post("/create",(req,res)=>{
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;
    if(!pais){
        return res.status(400).json({error: "El campo 'pais' es obligatorio"})
    }
    if(!nombre) {
        return res.status(400).json({error: "El campo 'nombre' es obligatorio"})
    }
    if(!edad) {
        return res.status(400).json({error: "El campo 'edad' es obligatorio"})
    }
    if(!cargo) {
        return res.status(400).json({error: "El campo 'cargo' es obligatorio"})
    }
    if(!anios) {
        return res.status(400).json({error: "El campo 'años' es obligatorio"})
    }
    db.query('INSERT INTO empleados(nombre,edad,pais,cargo,anios) VALUES(?,?,?,?,?)',[nombre,edad,pais,cargo,anios],
    (err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
    
});

app.get("/empleados",(req,res)=>{
     db.query('SELECT * FROM empleados',
    (err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });

});

app.put("/update",(req,res)=>{
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;
    const id = req.body.id;
    db.query('UPDATE empleados SET nombre=?,edad=?,pais=?,cargo=?,anios=? WHERE id=?',[nombre,edad,pais,cargo,anios,id],
    (err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
    
});

app.delete("/delete/:id",(req,res)=>{
    const id = req.params.id;
    
    db.query("DELETE FROM empleados WHERE id=?",id,
    (err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
    
});


app.listen(3001,()=>{
    console.log("corriendo en el puerto 3001")
});