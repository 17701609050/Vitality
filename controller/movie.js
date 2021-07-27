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
    
    
}


export default new Movie()