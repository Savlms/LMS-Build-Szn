import joi from 'joi'

const signUpSchema = joi.object({
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'org'] } }).required().trim().lowercase(),
    password: joi.string().trim().required(),
    role: joi.string().optional().lowercase().trim(),
  
})

const editUserSchema = joi.object({
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'org'] } }).required().trim().lowercase(),
    password: joi.string().trim().required()
})


export { signUpSchema, editUserSchema}
