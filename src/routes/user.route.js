const router = require('express').Router()
const userController = require('../controllers/user.controller')
// const authenticate = require('../middlewares/auth.middleware')

router.post('/register', userController.createUser)
router.post('/login', userController.login)
router.get('/:id', userController.findUser)
router.patch('/:id', userController.updateUser)
router.get('/', userController.findUsers)
router.delete('/:id', userController.deleteUser)

module.exports = router 

