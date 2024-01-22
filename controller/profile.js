const profileTable = require('../Schema/profileSchema')
exports.getProfile = (req, res) => {
    console.log("asdbabdabsd")
    console.log(req.id)
    const id = req.id
    profileTable.findOne({ userId: req.id })
        .then((docs) => {
            res.send({ status: "Profile Found", result: docs })
        })
        .catch((err) => {
            res.send({ status: "Profile not Found" })
        })
    // try {
    //     const newtask = new taskTable({
    //         userId: req.id,
    //         taskTitle,
    //         taskCategory,
    //         taskPriority,
    //         taskDatetime,
    //         taskDescription
    //     })
    //     const addnewTask = newtask.save()
    //     if (addnewTask) {
    //         res.send({ status: "Task Created Successfully" })
    //     } else {
    //         res.send({ status: "you missed Something to add task" })
    //     }
    // }
    // catch (err) {
    //     console.log(err)
    // }

}