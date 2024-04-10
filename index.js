require('dotenv').config()
const express = require('express')
const { checkSchema } = require('express-validator')
const configureDB = require('./config/db')
const userRegisterValidationSchema = require('./app/validations/user-register-validations')
const userLoginValidationSchema = require('./app/validations/user-login-validation')
const usersCltr = require('./app/controllers/users-cltr')
const authenticateUser = require('./app/middlewares/authenticateUser')
const app = express() 
const port = 3333 
configureDB()

app.use(express.json())


app.post('/users/register', checkSchema(userRegisterValidationSchema), usersCltr.register)
app.post('/users/login', checkSchema(userLoginValidationSchema), usersCltr.login)

// routing level middleware
app.get('/users/account', authenticateUser, usersCltr.account)

app.listen(port, () => {
    console.log('server running on port', port)
})