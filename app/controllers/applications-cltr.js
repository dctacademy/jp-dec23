const Application = require('../models/application-model')
const { validationResult } = require('express-validator')
const _ = require('lodash')
const applicationsCltr = {}

applicationsCltr.apply = async (req, res) => {
    const errors = validationResult(req) 
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }
    
    try { 
        const body = _.pick(req.body, ['job'])
        const application = new Application(body)
        application.candidate = req.user.id 
        await application.save()
        res.json(application)
    } catch(err) {
        console.log(err) 
        res.status(500).json({error: 'something went wrong'})
    }
}

applicationsCltr.check = async (req, res) => {
    const jobId = req.params.jobId 
    try { 
        const application = await Application.findOne({ job: jobId, candidate: req.user.id })
        if(!application) {
            return res.json({})
        }
        res.json(application)
    } catch(err) {
        console.log(err) 
        res.json(err) 
    }
}

applicationsCltr.list = async (req, res) => {
    const jobId = req.query.jobId 
    const applications = await Application.find({ job: jobId })
    res.json(applications) 
}   


module.exports = applicationsCltr
