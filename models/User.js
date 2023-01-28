const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        // required: [true, 'Username is required'],
        unique: [true, 'Username not available'],
    },
    firstName: {
        type: String,
        // required: true
    },
    lastName: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email Already Exists'],
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'manager'],
        default: 'user'
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)