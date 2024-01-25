const express = require("express")
const router = express.Router()
const taskController = require('../controller/task')
const jwtController=require('../config/jwtAuth')

router.post('/add-new-task',jwtController.auth, taskController.addTask)
router.post('/get-task-from-db',jwtController.auth, taskController.getTaskFromDb)


module.exports = router