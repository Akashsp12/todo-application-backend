const FocusTable = require('../Schema/focusSchema')
const userFocusTable = require('../Schema/userFocus')

exports.postFocusTime = async (req, res) => {
    const { focusTime } = req.body


    try {
        const newFocusTime = new FocusTable({
            userId: req.id,
            focusTime
        })
        newFocusTime.save()
            .then(async (docs) => {
                userFocusTable.findOne({ _id: req.id })
                    .then(async (docs) => {
                        if (docs == null) {
                            const newFocusTime = new userFocusTable({
                                _id: req.id,
                                focusTime
                            })
                            newFocusTime.save()
                                .then(async (docs) => {
                                    res.send({ status: "Focus time created successfully" })
                                })
                                .catch((err) => {
                                    console.log(err);
                                })
                        } else {
                            const time = await docs.focusTime + focusTime
                            userFocusTable.updateOne({ _id: req.id }, { $set: { focusTime: time } })
                                .then((docs) => {
                                    res.send({ status: "Updated successfully" })
                                })
                                .catch((err) => {
                                    console.log(err);
                                })
                        }
                    })
            })
            .catch((err) => {
                console.log(err);
            })
    } catch (error) {

    }






    // try {
    //     FocusTable.findById({ _id: req.id })
    //         .then(async (docs) => {
    //             if (docs == null) {
    //                 const newFocusTime = new FocusTable({
    //                     userId: req.id,
    //                     focusTime
    //                 })
    //                 newFocusTime.save()
    //                     .then((docs) => {
    //                         console.log(docs);
    //                     })
    //                     .catch((err) => {
    //                         console.log(err);
    //                     })
    //             } else {
    //                 const time = await docs.focusTime + focusTime
    //                 FocusTable.updateOne({ _id: req.id }, { $set: { focusTime: time } })
    //                     .then((docs) => {
    //                         console.log(docs);
    //                     })
    //                     .catch((err) => {
    //                         console.log(err);
    //                     })
    //             }
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // } catch (error) {

    // }

}