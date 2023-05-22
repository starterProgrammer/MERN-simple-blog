const express = require('express')
const mongoose = require('mongoose')

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
        default: Date.now()
    },
    image: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
})

const animalModel = mongoose.model('animalModel', animalSchema)

module.exports = animalModel