const mongoose = require('mongoose')

const focusSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, required: true },
    focusTime: { type: Number, required: true, default: 0 },
    createdAt: { type: Date, required: true, default: () => Date.now() }
})

const schema = mongoose.model('focus', focusSchema)
module.exports = schema