'use strict';

// import "babel-polyfill";
import MovieModel from '../models/movie';
import mongoose from 'mongoose';
import util from './utils';
import formidable from 'formidable';

class Movie {
    
    async getMovies(query){
        const movies = {
            'data': [],
            'status': 0
        };
        try{
            const options = util.parseQueryOptions(query);
            var m_query = null;
            if(query.q){
                const reg = new RegExp(query.q);
                m_query = MovieModel.find({$text:{$search: reg}},{score: {$meta: "textScore"}})
                .sort({score:{$meta: "textScore"}})
            }else{
                m_query =  MovieModel.find({}, {'page_id': 0});
            }
            
            movies['total'] = await m_query.countDocuments();
            movies['data'] = await m_query.find().skip(options.skip).limit(options.limit);
            for (var i=0; i<movies['data'].length; i++) {
                movies['data'][i]['movie'] = movies['data'][i]['chinese_movie_name'].match(/《(\S*)》/)[1];
                // console.log(movies['data'][i]['movie']);
            }
		}catch(err){
            console.log(err);
			movies['status'] = 400;
            movies['message'] = '获取失败';	
		}
        return movies;
    };
    async getOneMovie(mid){
        try{
			const movie = await MovieModel.findOne({_id: mongoose.Types.ObjectId(mid)});
            return movie;
		}catch(err){
            console.log(err);
            const movie = {};
            movie['status'] = 400;
            movie['err'] = '获取失败';
            return movie;
		}
        
    };
    async createMovie(data){
        try{
            // 检测是否存在文章
            const hasMovie = await MovieModel.findOne({
                where: {
                    moviename: data.moviename
                }   
            });
        
            // 如果存在，抛出存在信息
            if (hasMovie) {
                throw new global.errs.Existing('电影已存在');
            }
			const movie = MovieModel.create(data);
            return movie;
		}catch(err){
            console.log(err);
            const movie = {};
            movie['status'] = 400;
            movie['err'] = '创建失败';
            return movie;
		}
    };
    async updateMovie(data, params){
        try{
            // 检测是否存在
            const movie = await MovieModel.findOne({_id: mongoose.Types.ObjectId(params.id)});
            // 如果不存在，抛出异常
            if (!movie) {
                throw new global.errs.Existing('电影不存在');
            }
            movie.updateOne(data, function(err, res) {
                // Updated at most one doc, `res.modifiedCount` contains the number
                // of docs that MongoDB updated
                if(res.modifiedCount){
                    return movie;
                }
            });
            
		}catch(err){
            console.log(err);
            const movie = {};
            movie['status'] = 400;
            movie['err'] = '更新失败';
            return movie;
		}
    };
    async destroy(params){
        const res = await MovieModel.deleteOne({_id: mongoose.Types.ObjectId(params.id)});
        return res;
    }
    
}


export default new Movie()