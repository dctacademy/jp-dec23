const Candidate = require('../models/candidate-model')
const { validationResult } = require('express-validator')
const candidatesCltr = {}

candidatesCltr.create = async (req, res) => {
    const errors = validationResult(req) 
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    } 
    try { 
        const body = req.body 
        const candidate = new Candidate(body) 
        candidate.userId = req.user.id 
        await candidate.save()
        res.json(candidate)
    } catch(err) {
        console.log(err) 
        res.status(500).json({ error: 'something went wrong'})
    }
    
}

candidatesCltr.show = async (req, res) => {
    res.send('show profile')
}

candidatesCltr.update = async (req, res) => {
    res.send('update profile')
}

module.exports = candidatesCltr