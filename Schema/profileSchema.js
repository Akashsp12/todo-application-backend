const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    userId:{ type: mongoose.Types.ObjectId, required: true },
    email: { type: String, required: true },
    name: { type: String },
    profileImage: { type: String },
    provider: { type: String, required: true },
    createdAt: { type: Date, required: true, default: () => Date.now() }
})

const schema = mongoose.model('profile', profileSchema)
module.exports = schema