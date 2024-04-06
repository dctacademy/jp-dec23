const bcryptjs = require('bcryptjs')
const hashPassword = '$2a$10$F4bEJsXZdbqLbzcVeUuzL.G3ckBgLqoWZRhCEtqqJtd6oiFLnDByC'
const password = 'secret123456'

bcryptjs.compare(password, hashPassword)
    .then((result) => {
        console.log(result) 
    })