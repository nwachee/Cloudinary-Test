const router = require('express').Router()
const fileRoute = require('./fileupload.route')
const docRoute = require('./doc.route')

router.use('/upload', fileRoute)
router.use('/doc', docRoute)

module.exports = router