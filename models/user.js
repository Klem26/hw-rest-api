const { Schema, model } = require("mongoose");
const Joi = require("joi");



const userSchema = Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength:6,
    
  },
  email: {
    type: String,
    unique:true,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
  image: {
    type: String,
    default: "",
  },
    verify: {
    type: Boolean,
    default: false,
  },
  verifyToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
}, { versionKey: false, timestamps: true });


const joiUserSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    subscription: Joi.string(),
    token: Joi.string(),
    image:Joi.string(),
})

const User = model("user", userSchema );

module.exports = {
    User,
    joiUserSchema
};