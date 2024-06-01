const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();//Creamos la instancia del servidor express

//middlewares
app.use(express.json());
app.use(cors())

//Iniciamos el servidor
const PORT =  3000;
app.listen(PORT,()=>{
    console.log("Corriendo servidor en http://localhost: " + PORT);
})

/*Conexion con mysql
const servidores=[{

},
{
    host:"roundhouse.proxy.rlwy.net",
    user:"root",
    password:"GupTpFYxXuwfLpJmzKizNOErbpxxSGRJ",
    port: 34363,
    database:"railway"
}]*/
const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Volcan5678",
    port: 3306,
    database:"topicos"
})
connection.connect((err)=>{
    if(err){
        //throw err
        console.error(err.message || "No se pudo conectar a la base de datos");
    }else{
        console.log("Conectado a la base de datos")
    }
})

app.get("/", (req,res)=>{
    connection.query('SELECT * FROM  usuarios',(error,resul)=>{
        if(error) res.status(500).json({message:error.message || "No se puede obtener datos en este momento"});
        else res.status(200).json(resul);
    });
});

/*app.post("/", (req,res)=>{
    connection.query(`INSERT INTO usuarios VALUES (DEFAULT, "`+nombre+'")',(error,resul)=>{
        if(error) res.status(500).json({message:error.message || "No se puede insertar el dato en este momento"});
            else res.json(resul);
    });
});*/
//insertar datos a la BD
app.post("/",(req,res)=>{
    var { nombre } = req.body;
    if(nombre == ""){
        res.json({
            message : "Inserta un nombre"
        });
    }else{
    conection.query(`INSERT INTO usuarios  (nombre) VALUES (?)`,[nombre],
    (error,results)=>{
        if(error){
        res.status(500).json({
        message: error.message || "No se puede hacer la insercion de datos"});
        } else {res.status(200).json({
            message: "Datos insertados correctamente",
            data: results});
        }    
    });
    }
});
//actualizar datos de la BD
app.patch("/", (req, res) => {
    const { id,nombre } = req.body;
    if(id == "" || nombre == ""){
        res.json({
            message : "Algun campo esta vacio"
        });
    }else{
    conection.query(`UPDATE usuarios SET nombre = ? WHERE id = ?`, [nombre, id], (error, results) => {
        if (error) {
            res.status(500).json({
                message: error.message || "No se puede actualizar el usuario"
            });
        } else {
            res.status(200).json({
                message: "Usuario actualizado correctamente",
                data: results
            });
        }
    });
    }
});
//Eliminar datos de la BD
app.delete("/", (req, res) => {
    const { id } = req.body;
    if(id == ""){
        res.json({
            message : "Inserta un id"
        });
    }else{
    conection.query(`DELETE FROM usuarios WHERE id = ?`, [id], (error, results) => {
        if (error) {
            res.status(500).json({
                message: error.message || "No se puede eliminar el usuario"
            });
        } else {
            res.status(200).json({
                message: "Usuario eliminado correctamente",
                data: results
            });
        }
    });
    }
});