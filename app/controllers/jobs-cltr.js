const Job = require('../models/job-model')
const { validationResult } = require('express-validator')
const jobsCltr = {}
jobsCltr.list = async (req, res) => {
    try { 
        const jobs = await Job.find() 
        res.json(jobs)
    } catch(err) {  
        console.log(err) 
        res.status(500).json({ error: 'something went wrong'})
    }
}

jobsCltr.my = async (req, res) => {
    try { 
        const jobs = await Job.find({ recruiter: req.user.id })
        res.json(jobs) 
    } catch(err) {
        console.log(err) 
        res.status(500).json({ error: 'something went wrong'})
    }
}

jobsCltr.create = async (req, res) => {
    const errors = validationResult(req) 
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }

    const body = req.body 
    const job = new Job(body) 
    job.recruiter = req.user.id 
    await job.save()
    res.status(201).json(job)
}

module.exports = jobsCltr 