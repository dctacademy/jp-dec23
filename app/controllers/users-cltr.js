const User = require('../models/user-model')
const { validationResult } = require('express-validator')
const usersCltr = {}

usersCltr.register = async (req, res) => {
    const errors = validationResult(req) 
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }
    const body = req.body 
    try { 
        const user = await User.create(body) 
        res.status(201).json(user) 
    } catch(err) {
        res.status(500).json({ error: 'something went wrong'})
    }
    // User.create(body)
    //     .then((user) => {
    //         res.status(201).json(user)
    //     })
    //     .catch((err) => {
    //         res.status(500).json({ error: 'something went wrong'})
    //     })
}

module.exports = usersCltr 

