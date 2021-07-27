'use strict';

// import "babel-polyfill";
import UserModel from '../models/user'
import formidable from 'formidable'

class Category {
    async addUser(req, res, next){
		
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            
            if (!fields.name) {
                res.send({
					status: 0,
					message: '必须填写名称',
				});
            };
            // const date = new Date();
            const userObj = {
                name: fields.name,
                email: fields.email,
                password: fields.password,
                date_joined: Date.now(),
                intruduce: fields.intruduce,
                
            }
            const newUser = new UserModel(userObj);  
            try{
				await newUser.save();
				res.send({
					status: 1,
					success: '添加成功',
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
    async getUser(req, res, next){
        try{
			const users = await UserModel.find({}, '-_id');
			res.send(users);
		}catch(err){
			console.log('获取用户失败');
			res.send({
				status: 0,
				type: 'ERROR_DATA',
				message: '获取用户失败'
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