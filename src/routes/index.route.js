const router = require('express').Router()
const userRoute = require('./user.route')
const fileRoute = require('./fileupload.route')

router.use('/users', userRoute)
router.use('/upload', fileRoute)

module.exports = router