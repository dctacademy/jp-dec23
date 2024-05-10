// title, description, recruiter, openings, location, jobType - [wfh,wfo, hybrid], experience - { min, max }, deadline, skills - [ String ], package - { min, max }
const mongoose = require('mongoose') 
const { Schema, model } = mongoose 

const jobSchema = new Schema({
    title: String,
    description: String, 
    recruiter: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    openings: Number,
    location: [String],
    jobType: String,
    experience: {
        min: Number,
        max: Number 
    },
    skills: [String],
    dueDate: Date, 
    package: {
        min: Number,
        max: Number 
    }
})

const Job = model('Job', jobSchema) 

module.exports = Job 