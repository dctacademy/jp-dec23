const User = require('../models/user-model')
const userRegisterValidationSchema = {
    username: {
        notEmpty: {
            errorMessage: 'username is required'
        },
        trim: true 
    },
    email: {
        notEmpty: {
            errorMessage: 'email is required'
        }, 
        isEmail: {
            errorMessage: 'email should be a valid format'
        }, 
        custom: {
            options: async function(value){
                const user = await User.findOne({ email: value })
                if(user) {
                    throw new Error('email already taken')
                } else {
                    return true 
                }
            }
        },
        trim: true,
        normalizeEmail: true 
    },
    password: {
        notEmpty: {
            errorMessage: 'password is required'
        },
        isLength: {
            options: {min: 8, max: 128},
            errorMessage: 'password should be between 8 - 128 characters'
        },
        trim: true 
    },
    role: {
        notEmpty: {
            errorMessage: 'role is required'
        },
        isIn: {
            options: [['candidate', 'recruiter']],
            errorMessage: 'role should either be a candidate or recruiter'
        }, 
        trim: true 
        
    }
}

module.exports = userRegisterValidationSchema