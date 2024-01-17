const express = require("express")
const router = express.Router()
const userController = require('../controller/user')

router.post('/create-account', userController.postuser)
router.post('/login', userController.login)



module.exports = router