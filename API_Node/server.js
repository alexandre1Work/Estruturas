//framework web para node.js
const express = require('express')

//biblioteca para trabalhar com mongodb
const mongoose = require('mongoose')

//cors "meio campo" para permitir requisições 
// entre diferentes dominios (hosts / servidos)
const cors = require('cors')

const app = express()

app.use(cors()) // premitir que o front acesse o API
app.use(express.json()) // permitir o envio de dados no formato JSON


mongoose.connect('mongodb://localhost/produtos', {useUrlParser: true})

//definir o schema para produtos
const produtosSchema = new mongoose.Schema({
    nome: String,
    quantidade: Number,
    imagem: String,
    preco: Number
})

const Produto = mongoose.model('Produto', produtoSchema)

// '/produtos' é uma rota para obter todos os produtos
app.get('/produtos', async(requisicao, resposta) => {
    const produtos = await produtos.find()
})

app.post('/produtos', async(req, res) => {
    const novoProduto = new Produto(req.body);
    await produtos.save();
    res.json(novoProduto);
})