const express = require("express")
const router = express.Router()
const taskController = require('../controller/task')
const jwtController=require('../config/jwtAuth')

router.post('/add-new-task',jwtController.auth, taskController.addTask)


module.exports = router