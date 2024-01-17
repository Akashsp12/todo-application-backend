const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    provider: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now }
})

const schema = mongoose.model('user', userSchema)
module.exports = schema