require('dotenv').config()
const express = require('express')
const { checkSchema } = require('express-validator')
const configureDB = require('./config/db')
const userRegisterValidationSchema = require('./app/validations/user-register-validations')
const userLoginValidationSchema = require('./app/validations/user-login-validation')
const {candidateValidationSchema, candidateEditValidationSchema} = require('./app/validations/candidate-validation')
const usersCltr = require('./app/controllers/users-cltr')
const jobsCltr = require('./app/controllers/jobs-cltr') 
const candidatesCltr = require('./app/controllers/candidates-cltr')
const authenticateUser = require('./app/middlewares/authenticateUser')
const authorizeUser = require('./app/middlewares/authorizeUser')
const app = express() 
const port = 3333 
configureDB()

app.use(express.json())

// application level middleware - using it for logging request for debug purpose
app.use(function(req, res, next){
    console.log(`${req.ip} - ${req.method} - ${req.url} - ${new Date()}`)
    next()
})


app.post('/users/register', checkSchema(userRegisterValidationSchema), usersCltr.register)
app.post('/users/login', checkSchema(userLoginValidationSchema), usersCltr.login)
// routing level middleware
app.get('/users/account', authenticateUser, usersCltr.account)

app.get('/api/jobs', authenticateUser, jobsCltr.list) 
app.post('/api/jobs', authenticateUser, authorizeUser(['recruiter']), jobsCltr.create)

app.post('/api/candidates/profile', authenticateUser, authorizeUser(['candidate']), checkSchema(candidateValidationSchema), candidatesCltr.create)
app.get('/api/candidates/profile', authenticateUser, authorizeUser(['candidate']), candidatesCltr.show)
app.put('/api/candidates/profile', authenticateUser, authorizeUser(['candidate']), checkSchema(candidateEditValidationSchema), candidatesCltr.update)

app.listen(port, () => {
    console.log('server running on port', port)
})