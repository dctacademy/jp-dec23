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

jobsCltr.update = async (req, res) => {
    const id = req.params.id 
    const body = req.body 

    const job = await Job.findOneAndUpdate({ recruiter: req.user.id, _id: id }, body, { new: true })
    if(!job) {
        return res.status(404).json({ error: 'record not found'})
    }
    res.json(job) 
}

jobsCltr.remove = async (req, res) => {
    const id = req.params.id 
    const job = await Job.findOneAndDelete({ recruiter: req.user.id, _id: id })
    if(!job) {
        return res.status(404).json({ error: 'record not found'})
    }
    res.json(job) 
}

module.exports = jobsCltr 



