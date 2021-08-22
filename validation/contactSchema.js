const Joi = require("joi");



const joiContactSchema = Joi.object({
    phone: Joi.string().pattern(new RegExp('^[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}$'))
})


module.exports = joiContactSchema