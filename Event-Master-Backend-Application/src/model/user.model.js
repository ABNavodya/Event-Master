const {Schema, model} = require("mongoose");

const UserSchema = new Schema({
    _id:{
        type: Number
    },
    user_name: {
        type: String,
        required: true,
        unique:true,
    },
    user_email:{
        type: String,
        required: true,
        unique:true,
    },
    user_password:{
        type: String,
        required: true,
    }
});

module.exports = model('users', UserSchema);