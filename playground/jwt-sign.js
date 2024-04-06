const jwt = require('jsonwebtoken')
const user = {
    id: 'dct123',
    role: 'candidate'
}
const token = jwt.sign(user, 'dct', { expiresIn: '7d'})
console.log(token)