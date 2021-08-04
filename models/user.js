'use strict';
import moment from 'moment'
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
	name: {
        type: String,
        required: true 
    },
    email: {type: String},
    last_login: {type: Date, default: '' },
    password: {
      type: String,
      required: true,
      allowNull: false
    },
    is_active: {type: Number, default: 0},	// 0: not active  1: active
    is_super_user: {type: Number, default: 0}, // 0: not admin  1: admin
    created_at: {
        type: Date,
        allowNull: false,
        get() {
          return moment(this.getDataValue('created_at')).format('YYYY-MM-DD');
        }
    },
    updated_time:  {
        type: Date,
        get() {
            return moment(this.getDataValue('created_at')).format('YYYY-MM-DD');
          }
    },
    intruduce: {type: String },
    avatar: {type: String, default: 'default.jpg'},

});


userSchema.index({name: 1}, {unique: true});

const User = mongoose.model('User', userSchema);

export default User