const router = require('express').Router()
const fileController = require('../controllers/fileupload.controller')

router.post('/audio', fileController.audio )
router.post('/video', fileController.video)

module.exports = router