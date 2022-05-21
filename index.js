const express = require('express')
const app = express()
const port = 3013
let clients = []

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.post('/add', (req, res) => {
    const nome = req.body.nome
    const telefone = req.body.telefone

    if (!nome || typeof(nome) != 'string') {
        messageString = 'Field name is not defined or name is not a string'
        console.log(messageString)
        return res.status(422).json({ message: messageString })
    }

    if (!telefone || typeof(telefone) != 'string') {
        messageString = 'Field telefone is not defined or telefone is not a string'
        console.log(messageString)
        return res.status(422).json({ message: messageString })
    }

    const lastId = clients.reduce((bigID, client) => bigID = bigID > client.id ? bigID : client.id, 0)
    clients.push({
        id: lastId + 1,
        nome,
        telefone
    })

    res.status(201).json({ 'message': `Client ${nome} registered` })
})

app.get('/', (_, res) => {
    res.json({ clients })
})

app.put('/update/:id', (req, res) => {
    const id = Number(req.params.id)
    const nome = (req.body.nome)
    const telefone = (req.body.telefone)
    const client = clients.find((client) => client.id === id)
    
    if (!client) {
        messageString = 'Endpoint is valid but the resource itself does not exist.'
        console.log(messageString)
        return res.status(402).json({message: messageString})
    }

    if (!nome || typeof(nome) != 'string') {
        messageString = 'Field name is not defined or name is not a string'
        console.log(messageString)
        return res.status(422).json({ message: messageString })
    }

    if (!telefone || typeof(telefone) != 'string') {
        messageString = 'Field telefone is not defined or telefone is not a string'
        console.log(messageString)
        return res.status(422).json({ message: messageString })
    }

    client.nome = nome
    client.telefone = telefone
    return res.status(201).json({message: `Client with ${id} has been updated`})
})

app.delete('/del/:id', (req, res) => {
    const id = Number(req.params.id)
    const index = clients.findIndex((client) => client.id === id)

    if (index === -1) {
        messageString = 'Endpoint is valid but the resource itself does not exist.'
        console.log(messageString)
        return res.status(404).json({ message: messageString })
    }

    listRemove = clients.splice(index, 1)
    return res.status(201).json({ message: `Client with ${id} has been deleted` })
})

app.listen(port, () => { console.log(`Running in port ${port}`) })
