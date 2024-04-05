const User = require('../models/user-model')
const usersCltr = {}

usersCltr.register = (req, res) => {
    res.send('user register')
}

module.exports = usersCltr 

