const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    categoryname: {
        type: String,
        require: true
    },
    foods: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food'
    }]
})

module.exports = mongoose.model('Category', categorySchema)