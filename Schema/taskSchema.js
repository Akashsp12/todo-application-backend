const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, required: true },
    taskTitle: { type: String, required: true },
    taskCategory: { type: String, required: true },
    taskPriority: { type: String, required: true },
    taskTime: { type: String, required: true },
    taskDate: { type: String, required: true },
    taskStatus: { type: String },
    taskDescription: { type: String, required: true }
})

const schema = mongoose.model('task', taskSchema)
module.exports = schema