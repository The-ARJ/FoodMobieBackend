const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        minlength:[4,'Username should be longer than 4 characters']
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['Admin','User'],
        default:'User'
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile'
  }
},{timestamps:true});

module.exports = mongoose.model('User',userSchema)