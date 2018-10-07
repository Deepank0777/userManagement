// AuthController.js
const express 	 = 	require('express');
const router = express.Router();
const expressValidator = require('express-validator');
router.use(expressValidator());


var UserController = require('../controllers/UserController.js');

//Routes
router.get('/:id',  UserController.sendUserById);
router.post('/',  		UserController.register );
router.get('/', UserController.sendUser);
router.put('/:id',  UserController.updateUserById);
router.delete('/:id',  UserController.deleteUserById);



module.exports = router;