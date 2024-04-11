const Candidate = require('../models/candidate-model')
const candidateValidationSchema = {
    userId: {
        custom: {
            options: async function(value, { req }){
                const candidate = await Candidate.findOne({ userId: req.user.id })
                if(candidate) {
                    throw new Error('Profile already created')
                } else {
                    return true 
                }
            }
        }
    },
    firstName: {
        in: ['body'],
        exists: {
            errorMessage: 'first name is required'
        },
        notEmpty: {
            errorMessage: 'first name cannot be empty'
        },
        trim: true 
    },
    lastName: {
        in: ['body'],
        exists: {
            errorMessage: 'last name is required'
        },
        notEmpty: {
            errorMessage: 'last name cannot be empty'
        },
        trim: true 
    },
    mobile: {
        in: ['body'],
        exists: {
            errorMessage: 'mobile is required'
        },
        notEmpty: {
            errorMessage: 'mobile cannot be empty'
        },
        isNumeric: {
            errorMessage: 'mobile should be a number'
        }, 
        isLength: {
            options: { min: 10, max: 10 },
            errorMessage: 'mobile should be 10 digits long'
        },
        custom: {
            options: async function(value){
                const candidate = await Candidate.findOne({ mobile: value})
                if(candidate) {
                    throw new Error('Mobile already exists')
                } else {
                    return true 
                }
            }
        },
        trim: true 
    },
    address: {
        in: ['body'],
        exists: {
            errorMessage: 'address is required'
        },
        notEmpty: {
            errorMessage: 'address cannot be empty'
        },
        trim: true 
    }
}

module.exports = candidateValidationSchema