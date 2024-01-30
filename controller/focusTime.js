const FocusTable = require('../Schema/focusSchema')
const userFocusTable = require('../Schema/userFocus')

exports.postFocusTime = async (req, res) => {
    const { focusTime } = req.body
    const date = new Date


    try {
        const newFocusTime = new FocusTable({
            userId: req.id,
            focusTime,
            createdAt: date.toISOString().split("T")[0]
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


exports.getAllFocusTimes = async (req, res) => {

    const date = new Date
    FocusTable.find({ createdAt: date.toISOString().split("T")[0] })
        .then((docs) => {
            const initialValue = 0;
            const sumWithInitial = docs.reduce(
                (accumulator, currentValue) => accumulator + currentValue.focusTime,
                initialValue,
            );

            userFocusTable.findOne({ _id: req.id })
                .then(async (docs) => {
                    const focusAllTime = await docs.focusTime
                    const data = {
                        todayFocus: convertTimeToExpression(sumWithInitial),
                        allFocus: convertTimeToExpression(focusAllTime)
                    }
                    res.send({ result: data })

                })
                .catch((err) => {
                    console.log(err);
                })

        })
        .catch((err) => {
            console.log(err);
        })

}


function convertTimeToExpression(distance) {
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    const data = {
        hours,
        minutes,
        seconds
    }
    return data
}