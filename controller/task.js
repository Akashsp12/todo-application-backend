const taskTable = require('../Schema/taskSchema')
exports.addTask = (req, res) => {
    const { taskTitle, taskCategory, taskPriority, taskDatetime, taskDescription } = req.body
    const taskDate = taskDatetime.split('T')[0]
    const taskTime = taskDatetime.split('T')[1]

    try {
        const newTask = new taskTable({
            userId: req.id,
            taskTitle,
            taskCategory,
            taskPriority,
            taskDate,
            taskTime,
            taskDescription,
            taskStatus: 'inProgress'
        })
        const addNewTask = newTask.save()
        if (addNewTask) {
            res.send({ status: "Task Created Successfully" })
        } else {
            res.send({ status: "you missed Something to add task" })
        }
    }
    catch (err) {
        console.log(err)
    }

}
exports.getTaskFromDb = (req, res) => {
    const { result } = req.body
    const date = new Date(result)
    console.log(typeof result)
    console.log(result)
    taskTable.find({ userId: req.id, taskDate: result })
        .then((docs) => {
            let isDataEmpty = false
            if (docs.length == 0) {
                isDataEmpty = true
            }
            res.send({ result: docs, dataEmpty: isDataEmpty })

        })
        .catch((err) => {
            console.log(err)
        })
}
exports.editTask = async (req, res) => {
    console.log(req.params.id);

    taskTable.findOne({ _id: req.params.id })
        .then((docs) => {
            res.send({ result: docs });
        })
        .catch((error) => {
            res.send({ status: "no result" });
        })
}
exports.updateTask = async (req, res) => {
    const { taskTitle, taskCategory, taskPriority, taskDatetime, taskDescription, taskId } = req.body
    const taskDate = taskDatetime.split('T')[0]
    const taskTime = taskDatetime.split('T')[1]

    taskTable.updateOne({ _id: taskId }, { $set: { taskTitle, taskCategory, taskPriority, taskDate, taskTime, taskDescription } })
        .then((docs) => {


            res.send({ status: "Task Updated" })

        })
        .catch((error) => {
            console.log(error);
        })
}
exports.updateTaskStatus = async (req, res) => {

    taskTable.updateOne({ _id: req.params.id }, { $set: { taskStatus: "completed" } })
        .then((docs) => {
            res.send({ status: "Task status Updated" })

        })
        .catch((error) => {
            console.log(error);
        })
}
exports.removeTaskFormDB = async (req, res) => {

    taskTable.deleteOne({ _id: req.params.id })
        .then((docs) => {
            res.send({ status: "task Removed" })

        })
        .catch((error) => {
            console.log(error);
        })
}