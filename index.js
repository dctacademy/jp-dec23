require('dotenv').config()
const express = require('express')
const { checkSchema } = require('express-validator')
const configureDB = require('./config/db')
const userRegisterValidationSchema = require('./app/validations/user-register-validations')
const userLoginValidationSchema = require('./app/validations/user-login-validation')
const usersCltr = require('./app/controllers/users-cltr')
const app = express() 
const port = 3333 
configureDB()

app.use(express.json())


app.post('/users/register', checkSchema(userRegisterValidationSchema), usersCltr.register)
app.post('/users/login', checkSchema(userLoginValidationSchema), usersCltr.login)

app.listen(port, () => {
    console.log('server running on port', port)
})