'use strict';

import mongoose from 'mongoose'

const articleSchema = new mongoose.Schema({
	title: {
        type: String,
        required: true 
    },
    author_id: { type: String},
	content: { type: Text, default: "" },
    page_views: Number,
    created_time:  {type: Date, default: Date.now },
    updated_time:  {type: Date, default: Date.now },
    // deleted_time:  {type: Date, default: Date.now },
	id: Number,
	category_id: Number,
	image_path: { type: String, default: "" },
    tags: { type: String, default: "" },
	status: { type: Number, default: 1 }, // 0:删除 1:创建 2:保存草稿
	
});

articleSchema.index({ id: 1 }); //primary_key 主键
articleSchema.index({title: 1}, {unique: true});

const Article = mongoose.model('Article', articleSchema);

export default Article