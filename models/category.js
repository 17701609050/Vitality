'use strict';

import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
	name: {
        type: String,
        required: true 
    },
    description: { type: String},	
    created_time:  {type: Date, default: Date.now },
    updated_time:  {type: Date, default: Date.now },

});


categorySchema.index({name: 1}, {unique: true});

const Category = mongoose.model('Category', categorySchema);

export default Category