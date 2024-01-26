const express = require("express")
const router = express.Router()
const profileController = require('../controller/profile')
const jwtController = require('../config/jwtAuth')
router.get('/get-user-profile', jwtController.auth, profileController.getProfile)

module.exports = router