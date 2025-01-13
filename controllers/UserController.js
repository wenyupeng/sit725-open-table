const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const { UserModel } = require('../models');
const authenticate = require('../middlewares/jwt');
const apiResponse = require('../utils/utils.apiResponse');
const permissions = require('../middlewares/permissions');
const User = require('../models/mapping/UserModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User List
exports.userlist = [
    authenticate,
    permissions,
    async (req, res) => {
        // console.log(req.auth)
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array())

            let query = {
                current: 1,
                pageSize: 20,
                params: {},
            }
            let result = await UserModel.find(query.params).skip((Number(query.current) - 1) * Number(query.pageSize)).limit(Number(query.pageSize))
            let total = await UserModel.find({}).count()
            return apiResponse.successResponseWithData(res, "Success.", result.length > 0 ? {
                result,
                current: 1,
                pageSize: 20,
                total
            } : { result: [], total });
        } catch (err) {
            console.log(err)
            return apiResponse.ErrorResponse(res, err);
        }
    }
]

// User Delete
exports.userDelete = [
    authenticate,
    permissions,
    async (req, res) => {
        if (!mongoose.Types.ObjectId.isValid(req.body.id)) return apiResponse.validationErrorWithData(res, "Invalid Error.", "the input id is not exist");

        try {
            UserModel.findByIdAndDelete(req.body.id).then((user) => {
                if (!user) {
                    return apiResponse.notFoundResponse(res, 'user does not exist or have been deleted');
                }
                apiResponse.successResponse(res, `user ${req.body.id} has been delete`)
            })
        } catch (err) {
            console.log(err)
            return apiResponse.ErrorResponse(res, err);
        }
    }

]

// User Registration
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed', details: error.message });
    }
};

// User Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed', details: error.message });
    }
};

// User Update
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        const updatedUser = await User.update({ name, email }, { where: { id } });
        res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        res.status(500).json({ error: 'Update failed', details: error.message });
    }
};


