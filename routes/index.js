var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
const verifyToken =require('../middlewares/verifyToken');
router.post('/register',userController.register);
router.post('/login',userController.login);
router.use(verifyToken);
router.post('/category/items',userController.addItems)
router.get('/category/items',userController.getItems);
router.get('/category/:category',userController.getCategories);

module.exports=router;