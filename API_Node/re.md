const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost/produtos', { useNewUrlParser: true })

const produtosSchema = new mongoose.Schema({
  nome: String,
  quantidade: Number,
  imagem: String,
  preco: Number
})

const Produto = mongoose.model('Produto', produtosSchema)

app.get('/produtos', async (req, res) => {
  const produtos = await Produto.find()
  res.json(produtos)
})

app.post('/produtos', async (req, res) => {
  const novoProduto = new Produto(req.body)
  await novoProduto.save()
  res.json(novoProduto)
})

app.put('/produtos/:id', async (req, res) => {
  const produtoAtualizado = await Produto.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
  res.json(produtoAtualizado)
})

app.delete('/produtos/:id', async (req, res) => {
  await Produto.findByIdAndDelete(req.params.id)
  res.json({ message: 'Produto deletado' })
})

app.listen(3000, () => {
  console.log('API rodando na porta 3000')
})