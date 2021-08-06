'use strict';

import bcrypt from 'bcryptjs'
import basicAuth from 'basic-auth'
import jwt from 'jsonwebtoken'
import datetime from 'silly-datetime'
import UserModel from '../models/user'
import util from './utils'
import config from '../config/config.js'
import formidable from 'formidable'
import moment from 'moment';

class User {
    async register(req, res, next){
		const data = req.body;
		
		//生成salt的迭代次数
		const saltRounds = 10;
		//随机生成salt
		const salt = bcrypt.genSaltSync(saltRounds);
		//获取hash值
		var hash = bcrypt.hashSync(data.password, salt);
		const userObj = {
			name: data.name,
			email: data.email,
			password: hash,
			intruduce: data.intruduce,
			joined_date: datetime.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
		}
		try{
			const newUser = await UserModel.create(userObj);
			console.log(newUser);
			if(newUser){
				res.send({
					status: 1,
					success: '添加成功',
				})
			}
			
		}catch(err){
			console.log(err);
			res.send({
				status: 0,
				type: 'ERROR_IN_SAVE_DATA',
				message: '保存数据失败 '+ err,
			})
		}    
	};
	async login(req, res, next){
		const data = req.body;
		const admin = await UserModel.findOne({name: data.username})
		if (!admin) {
			res.send({
				status: 0,
				type: 'ERROR_IN_AUTH_DATA',
				message: '账号不存在 ',
			});
		}else{
			const correct = bcrypt.compareSync(req.body.password, admin.password);
			if (!correct) {
				res.send({
					status: 0,
					type: 'ERROR_IN_AUTH_DATA',
					message: '密码不正确 ',
				})
			}else{
				admin.last_login = datetime.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
				admin.save()
				const token = util.generateToken(admin.id, 16)
				res.send({
					status: 1,
					token: token
				})
			}
		}
	};
	async auth(req, res, next){
		const Credentials = basicAuth(req);
		let errMsg = "";
		// 无带token
		if (!Credentials || !Credentials.name) {
			errMsg = "需要携带token值";
		}else{
			try {
				var decode = jwt.verify(Credentials.name, config.security.secretKey);
			} catch (error) {
				// token 不合法 过期
				if (error.name === 'TokenExpiredError') {
				errMsg = "token已过期，请重新登录"
				}
			}
		}
		if (errMsg){
			res.send({
				status: 0,
				error: errMsg
			})
		}else{
			const user = await UserModel.findOne({'_id': decode.uid}, {'password': 0});
			res.send(user);
		}
		
	}
    async getUsers(req, res, next){
		const query = req.query
		const users = {
            'data': [],
            'status': 0
        };
        try{
			const options = util.parseQueryOptions(query);
			var m_query = null;
            if(query.q){
                const reg = new RegExp(query.q);
                m_query = UserModel.find({$text:{$search: reg}},{score: {$meta: "textScore"}})
                .sort({score:{$meta: "textScore"}})
            }else{
                m_query =  UserModel.find({}, {'page_id': 0});
            }
            
            users['total'] = await m_query.countDocuments();
            users['data'] = await m_query.find().skip(options.skip).limit(options.limit);

			res.send(users);
		}catch(err){
			console.log(err);
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
export default new User()