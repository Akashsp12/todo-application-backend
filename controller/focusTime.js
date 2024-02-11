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
                        res.send({ status: "Focus time saved successfully" })
                    })
            })
            .catch((err) => {
                console.log(err);
            })
    } catch (error) {

    }



}


exports.getAllFocusTimes = async (req, res) => {
    console.log(req.id);
    const date = new Date
    FocusTable.find({ userId: req.id, createdAt: date.toISOString().split("T")[0] })
        .then((docs) => {
            const initialValue = 0;
            const todyFocusCal = docs.reduce(
                (accumulator, currentValue) => accumulator + currentValue.focusTime,
                initialValue,
            );
            FocusTable.find({ userId: req.id })
                .then((docs) => {
                    const initialValue = 0;
                    const allFocusTimeCal = docs.reduce(
                        (accumulator, currentValue) => accumulator + currentValue.focusTime,
                        initialValue,
                    );
                    const data = {
                        todayFocus: convertTimeToExpression(todyFocusCal),
                        allFocus: convertTimeToExpression(allFocusTimeCal)
                    }
                    res.send({ result: data })
                }
                )


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