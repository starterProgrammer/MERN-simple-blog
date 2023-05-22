const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

// Create an express instance 
const app = express()
// App Prequire Usage 
app.use(cors())
app.use(express.json())


// Create a connection to DB
mongoose.connect('mongodb+srv://alitalaeeengeneer:ali23fatemeh@cluster.xjbfdup.mongodb.net/animals-blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("DB is connected")).catch(console.error())

// Declare table to USE
const animalModel = require('./Model/AnimalModel')

// Get Data From DB
app.get('/animals', async (req, res) => {
    const animals = await animalModel.find()
    res.json(animals)
})

// Update DB
app.put('/animal/update', async (req, res) => {
    const animal = await animalModel.findById(req.body._id)
    // Update All things 
    animal.name = req.body.name
    animal.image = req.body.image
    animal.type = req.body.type

    // Save on DB
    animal.save()
    res.json(animal)
})



// create a server on specific port 
app.listen(3001, () => { console.log("Server is running at port 3001") })



