const bcrypt = require('bcrypt');
const db = require('../models/index');
const config = require('../config/config')
const userModel = db.users;
const jwt = require('jsonwebtoken');
const categoryModel = db.category;
const itemModel = db.item;
module.exports = {
    register: async (req, res, next) => {
        try {
            // create a new user with the password hash from bcrypt
            const hash = bcrypt.hashSync(req.body.password, 10);
            let user = await userModel.create(
                Object.assign(req.body, {
                    password: hash
                })
            );
            return res.json(user);

        } catch (err) {
            return res.status(400).send(err);
        }

    },
    login: async (req, res, next) => {
        const {
            username,
            password
        } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                msg: 'Request missing username or password param'
            });
        }
        let response = {};
        let payload = {};
        try {
            const user = await userModel.findOne({
                where: {
                    username
                }
            });
            if (bcrypt.compareSync(password, user.password)) {
                payload.username = user.username;
                payload.userId = user.userId;
                response.access_token = jwt.sign(payload, config.privateKey, {
                    expiresIn: config.accessTokenExpire,
                    issuer: config.issuer,
                    audience: config.audience,
                });
                response.expires_in = config.accessTokenExpire;
                response.token_type = 'bearer';
                response.user = {
                    ...payload
                }
                return res.status(200).json(response)
            } else {
                return res.status(400).send({
                    msg: "Invalid username or password"
                })
            }
        } catch (err) {
            console.log(err);
            return res.status(400).send(
                err
            );
        }
    },
    getCategories: async (req, res, next) => {
        try {
            let categories = await categoryModel.findAll({
                attributes: ['categoryId', 'category']
            })
            return res.status(200).json(categories);
        } catch (err) {
            return res.status(400).json(err);
        }
    },
    getItems: async (req, res, next) => {
        try {
            let condition = {}
            if (req.query.category) {
                condition.category = req.query.category
            }
            let categories = await categoryModel.findAll({
                where: condition,
                include: [{
                    model: itemModel,
                    attributes: ['itemId', 'item', 'photo']
                }],
                attributes: ['categoryId', 'category']
            })
            return res.status(200).json(categories);
        } catch (err) {
            return res.status(400).json(err);
        }
    },
    addItems: async (req, res, next) => {
        try {
            let data = {};
            data.category = req.body.category;
            data.items = req.body.items;
            await categoryModel.create(data, {
                include: [{
                    model: itemModel
                }]
            })
            res.status(201).json(req.body);
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }
    }
}