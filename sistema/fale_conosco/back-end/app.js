const express = require('express')
const cors = require('cors')
const mysql = require('mysql2/promise')
const porta = 3000
const app = express()

const conexao = require('./db.js') // importa o módulo conexao como BD 

//modulo cypto
const crypto = require('crypto')
const { Script } = require('vm')

app.use(cors())
app.use(express.json()) 

app.listen(porta,()=>{
    console.log("servidor rodando!")
})


app.post("/fale_conosco", async (req,res)=>{
    try {

        const {Nome, Email, Assunto, Mensagem} = req.body

        
        if(Email==""){
            return res.json({"resposta":"Preencha um email"})
        }else if (Nome.length <6){
            return res.json({"resposta":"Preencha um nome maior que 6 caracteres"})
        }else if (Assunto == ""){
            return res.json({"resposta":"Preencha um assunto"})
        }else if (Mensagem == ""){  
            return res.json({"resposta":"Preencha uma mensagem"})
        }else if(Email.length <6){
            return res.json({"resposta":"Preencha um email válido"}) 
        }
        

        let sql = `insert into fale_conosco (Nome, Email, Assunto, Mensagem)
        values (?,?,?,?)`

         let [resultado]= await conexao.query(sql,[Nome, Email, Assunto, Mensagem])

        
        if(resultado.affectedRows == 1){
            return res.json({"resposta": "Mensagem enviada com sucesso!"})
        }else{
            return res.json({"resposta":"Erro ao enviar!"})
        } 
 



    } catch (error) {
        console.log(error)
    }
})
