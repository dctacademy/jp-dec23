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
    try {
        // _id
        const candidate = await Candidate.findOne({ userId: req.user.id }) 
        res.json(candidate)
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: 'something went wrong'})
    }
}

candidatesCltr.update = async (req, res) => {
    const errors = validationResult(req) 
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    } 
    try { 
        const body = req.body 
        const candidate = await Candidate.findOneAndUpdate({ userId: req.user.id }, body, { new: true })
        res.json(candidate)
    } catch(err) {
        console.log(err) 
        res.status(500).json({ error: 'something went wrong'})
    }
}

module.exports = candidatesCltr