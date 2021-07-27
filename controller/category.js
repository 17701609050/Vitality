
'use strict';

// import "babel-polyfill";
import CategoryModel from '../models/category'
import formidable from 'formidable'

class Category {
    async addCategory(req, res, next){
		
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            
            if (!fields.name) {
                throw new Error('必须填写类型名称');
            };
            const cateObj = {
                name: fields.name,
                description: fields.description,
                
            }
            const newCate = new CategoryModel(cateObj);  
            try{
				await newCate.save();
				res.send({
					status: 1,
					success: '添加类别成功',
				})
			}catch(err){
				console.log('保存数据失败');
				res.send({
					status: 0,
					type: 'ERROR_IN_SAVE_DATA',
					message: '保存数据失败 '+ err,
				})
			}
            
        })
		
	};
    async getCategory(req, res, next){
        try{
			const categories = await CategoryModel.find({}, '-_id');
			res.send(categories);
		}catch(err){
			console.log('获取categories失败');
			res.send({
				status: 0,
				type: 'ERROR_DATA',
				message: '获取categories失败'
			})
		}
    };
    // async findCategoryById(id){
	// 	try{
	// 		const CateEntity = await CategoryModel.findOne({'_id': id});
	// 		let categoName = CateEntity.name;
	// 		CateEntity.sub_categories.forEach(item => {
	// 			if (item.id == id) {
	// 				categoName += '/' + item.name;
	// 			}
	// 		})
	// 		return categoName
	// 	}catch(err){
	// 		console.log('通过category id获取数据失败')
	// 		throw new Error(err)
	// 	}
	// }
}
export default new Category()