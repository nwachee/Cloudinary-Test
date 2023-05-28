const router = require('express').Router()
const fileRoute = require('./fileupload.route')

router.use('/upload', fileRoute)

module.exports = router