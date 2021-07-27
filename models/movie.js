'use strict';

import mongoose from 'mongoose'

const movieSchema = new mongoose.Schema({
	chinese_movie_name: {type: String},
    translation_name: { type: String},
	moviename: { type: String},
    dateyear: { type: String},
    country:  {type: String},
    style:  {type: String},
	language: {type: String},
	imdbscore: {type: String},
	imdbcounter: { type: String},
    doubanscore: { type: String},
	doubancounter: { type: String}, 
	movie_length: { type: String},
    director: { type: String},
    actor: { type: String},
    aboutmovie: { type: String, default: ""},
    imgs: { type: Array},
    downloadlink: { type: String},
    dyttsearch: { type: String},
    page_id: { type: String},
});


movieSchema.index({chinese_movie_name: 'text', translation_name: 'text', aboutmovie: 'text', moviename: 'text', director: 'text', actor: 'text'}, { language_override: "lang" })

const Movie = mongoose.model('Movie', movieSchema, 'movie');

// Movie.createIndexes();

export default Movie