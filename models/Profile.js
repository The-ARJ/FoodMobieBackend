const mongoose = require('mongoose')

const profileSchema = mongoose.Schema({
    image: {
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

module.exports = mongoose.model('Profile', profileSchema)

