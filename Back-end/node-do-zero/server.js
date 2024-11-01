//----------- CRIANDO UM SERVIDOR COM O PADRÃO NODE -----------//

// import {createServer} from 'node:http'
// const server = createServer ((request, response) => {
//     response.write('ola mundo')
//     return response.end()
// })
// server.listen(7777)

//----------- CRIANDO UM SERVIDOR COM O PADRÃO FRAMEWORK FASTIFY -----------//
import { fastify } from "fastify";
// import { DataBaseMemory } from "./databasememory.js";
import { DataBasePostgres } from "./database_postgres.js";

const server = fastify()

const database = new DataBasePostgres()

// GET (listar) - não precisa retornar uma resposta; apenas lista os recursos disponíveis.
// POST (criar) - precisa retornar uma resposta, geralmente com os parâmetros criados ou o status da operação.
// PUT (alterar) - precisa retornar uma resposta, tipicamente confirmando a alteração realizada.
// DELETE - precisa retornar uma resposta, indicando o status da exclusão do recurso.
// PATCH (alterar apenas uma parte) - precisa retornar uma resposta, frequentemente confirmando a modificação feita.


//POST HTTP://localhost:7777/videos
server.post('/videos', async (request, reply) => {
    const {title, description, duration} = request.body
    
    await database.create ({
        title,
        description,
        duration,
    })

    return reply.status(201).send()
})

server.get('/videos', async (request) => {

    const search = request.query.search

    const videos = await database.list(search)

    console.log(videos)

    return videos
})

//  ----> POST HTTP://localhost:7777/videos/3

//Aqui seria necessário um !ROUTE PARAMENTER! que nesse caso é o id
//Porque iremos editar UM unico video
server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
    const {title, description, duration} = request.body

    await database.update(videoId, {
        title,
        description,
        duration,
    })

    return reply.status(204).send()
})

//Aqui seria necessário um !ROUTE PARAMENTER! que nesse caso é o id
//Porque iremos deletar UM unico video
server.delete('/videos/:id', (request, reply) => {
    const videoId = request.params.id

    database.delete(videoId)

    return reply.status(204).send()
})

server.listen({
    port:7777
})