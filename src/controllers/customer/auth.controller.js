const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({})
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const UserModel = require('../../models/user.model');
const { NotFoundError, ValidationError } = require('../../utils/error.util');
const config = require('../../config/config');

const login = [
    validator.body(Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    })),
    async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await UserModel.findOne({ email: email.toLowerCase() }).lean();
            if (!user) {
                throw new NotFoundError('Invalid email / password')
            }

            const passwordMatched = await bcrypt.compare(password, user.password);
            if (!passwordMatched) {
                throw new NotFoundError('Invalid email / password')
            }

            delete user.password
            const accessToken = jwt.sign(user, config.jwtSecret);

            res.success({ accessToken })
        } catch (err) {
            next(err)
        }
    }
]

const register = [
    validator.body(Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        mobileNumber: Joi.string().optional()
    })),
    async (req, res, next) => {
        try {
            const { firstName, lastName, email, password, mobileNumber } = req.body;
        
            const existingUser = await UserModel.findOne({ email: email.toLowerCase() })
            if (existingUser) {
                throw new ValidationError('Email already exists') 
            }

            const user = new UserModel({
                firstName,
                lastName,
                email,
                mobileNumber
            });

            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;

            await user.save()

            res.success({}, 'User successfully created')
        } catch (err) {
            next(err)
        }
    }
]


module.exports = {
    login,
    register
}