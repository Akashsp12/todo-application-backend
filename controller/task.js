const taskTable = require('../Schema/taskSchema')
exports.addTask = (req, res) => {
    const { taskTitle, taskCategory, taskPriority, taskDatetime, taskDescription } = req.body

    try {
        const newtask = new taskTable({
            userId: req.id,
            taskTitle,
            taskCategory,
            taskPriority,
            taskDatetime,
            taskDescription,
            taskStatus: 'inProgress'
        })
        const addnewTask = newtask.save()
        if (addnewTask) {
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
    console.log(date.toISOString())
    console.log(req.body);
    taskTable.find({ userId: req.id, taskDatetime: date })
        .then((docs) => {
            console.log(docs)
        })
        .catch((err) => {
            console.log(err)
        })

}