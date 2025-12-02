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

app.post("/login", async (req,res)=>{
    try {
        const {Login} = req.body
        let {Senha} = req.body
        
        Senha = Senha.trim()
        Senha = Senha.replace (" ", "")

        if(Senha==""){
            return res.json(
                {"resposta":"Preencha uma senha"})
        }else if(Senha.length <6){
            return res.json(
                {"resposta": "A senha tem que conter no mínimo 6 caracteres"}) 
        }else if(Login.length <6){
            return res.json(
                {"resposta":"Digite um E-mail válido"})
        }else if(Login==""){
            return res.json(
                {"resposta":"Digite um E-mail"})
        }
        
        const hash = crypto.createHash("sha256").update(Senha).digest("hex")

        
        let sql = `select * from login where Email = ? and Senha = ?`

        let [resultado]= await conexao.query(sql,[Login, hash])


        if(resultado.length > 0){
            return res.json({"resposta":"Você acertou o login"})
        }else{
            return res.json({"resposta":"Erro ao login"})
        } 


    } catch (error) {
        console.log(error)
    }
})

app.post("/cadastro", async (req,res)=>{
    try {

        const {Nome, Email, Senha} = req.body

        
        if(Senha==""){
            return res.json(
                {"resposta":"Preencha uma senha"})
        }else if(Senha.length <6){
            return res.json(
                {"resposta": "A senha tem que conter no mínimo 6 caracteres"}) 
        }else if(Email.length <6){
            return res.json(
                {"resposta":"Digite um E-mail válido"})
        }else if(Email==""){
            return res.json(
                {"resposta":"Digite um E-mail"})
        }else if(Nome == ""){
            return res.json(
                {"resposta":"Digite um nome!"})
        }else if(Nome.length <5){
            return res.json(
                {"resposta":"Preencha um nome maior que 5 caracteres!"})
        }
        
        const hash = crypto.createHash("sha256").update(Senha).digest("hex")

        let sql = `insert into login (Nome, Email, Senha)
        values (?,?,?)`

         let [resultado]= await conexao.query(sql,[Nome, Email, hash])

        
         if(resultado.affectedRows == 1){
            return res.json({"resposta":"Cadastro realizado com sucesso!"})
        }else{
            return res.json({"resposta":"Erro ao cadastrar!"})
        } 


    } catch (error) {
        console.log(error)
    }
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