'use strict';

import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
	name: {
        type: String,
        required: true 
    },
    email: {type: String},
    last_login: {type: Date, default: '' },
    password: {type: String, required: true },
    is_active: {type: Number, default: 1},	// 0: not active  1: active
    is_super_user: {type: Number, default: 0}, // 0: not admin  1: admin
    date_joined:  {type: Date},
    updated_time:  {type: Date, default: Date.now },
    intruduce: {type: String },
    avatar: {type: String, default: 'default.jpg'},

});


userSchema.index({name: 1}, {unique: true});

const User = mongoose.model('User', userSchema);

export default User