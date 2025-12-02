// meu arquivo de conexão com o banco de dados
//npm i exprees  /  npm i nodemon --save-dev  /  npm i cors  /  npm i mysql2

const mysql = require('mysql2/promise')

// pool de conexão
const conexao = mysql.createPool({
    //criar as configurações do banco de dados
    //host é o endereço do banco
    host:"localhost",
    user:"root",
    password:"",
    port:3306,
    database:"banco_projeto",
    waitForConnections:true,  
    connectionLimit:10,   
    queueLimit:0    

})

module.exports = conexao