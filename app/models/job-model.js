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
        minExp: Number,
        maxExp: Number 
    },
    skills: [String],
    dueDate: Date, 
    package: {
        minSalary: Number,
        maxSalary: Number 
    }
}, { timestamps: true })

const Job = model('Job', jobSchema) 

module.exports = Job 