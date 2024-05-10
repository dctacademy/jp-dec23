const express = require('express')
const router = express.Router() 
const usersCltr = require('../app/controllers/users-cltr')

router.post('/users/register', usersCltr.register) 
router.post('/users/login', usersCltr.login)


module.exports = router 