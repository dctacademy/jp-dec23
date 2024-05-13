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


module.exports = applicationsCltr
