import joi from 'joi'

const adminIdSchema = joi.object({
    email: joi.string().required().trim().lowercase(),
    password: joi.string().trim().required(),
})

export default adminIdSchema