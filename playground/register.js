const bcryptjs = require('bcryptjs')
const password = 'secret123'

console.log('password', password)

async function generateHash() {
    const salt = await bcryptjs.genSalt() 
    console.log(salt)
    const encrypted = await bcryptjs.hash(password, salt) 
    console.log(encrypted)
}

generateHash() 


// bcryptjs.genSalt()
//     .then((salt) => {
//         console.log('salt', salt, salt.length)
//         bcryptjs.hash(password, salt) 
//             .then((encrypted) => {
//                 console.log('encrypted', encrypted, encrypted.length)
//             })
//     })