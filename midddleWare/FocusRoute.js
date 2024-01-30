const express = require("express")
const router = express.Router()
const focusController = require('../controller/focusTime')
const jwtController = require('../config/jwtAuth')
router.post('/post-focus-timing', jwtController.auth, focusController.postFocusTime)

router.get('/get-focus-all-time', jwtController.auth, focusController.getAllFocusTimes)

module.exports = router 