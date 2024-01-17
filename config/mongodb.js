const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://akashsp12:aarthiyak@aarthiyak.zql7q1u.mongodb.net/?retryWrites=true&w=majority')
    .then((res) => {
        console.log("successfully connected")
    })
    .catch((error) => {
        console.log("not connected")
    })

module.exports = mongoose