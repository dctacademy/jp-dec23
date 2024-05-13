const mongoose = require('mongoose')
const { Schema, model } = mongoose 

const applicationSchema = new Schema({
    candidate: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    job: {
        type: Schema.Types.ObjectId,
        ref: 'Job'
    },
    status: {
        type: String,
        default: 'submitted'
    }
}, { timestamps: true }) 

const Application = model('Application', applicationSchema) 

module.exports = Application 