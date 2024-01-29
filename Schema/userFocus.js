const mongoose = require('mongoose')

const focusSchema = new mongoose.Schema({
    focusTime: { type: Number, required: true, default: 0 },
    createdAt: { type: Date, required: true, default: () => Date.now() }
})

const schema = mongoose.model('userFocus', focusSchema)
module.exports = schema