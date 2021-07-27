import express from 'express';
import Movie from '../controller/movie';
const router = express.Router();


router.get('/movies', async function(req, res, next) {
    const movies = await Movie.getMovies(req.query);
    res.render('movie', {
        'movies': movies, 
        'currentPage': req.query.page, 
        'pageSize': req.query.limit,
        'q': req.query.q
    });
});

router.get('/movie/subject/:mid', async function(req, res, next) {
    const movie = await Movie.getOneMovie(req.params.mid);
    res.render('movieSubject', {'movie': movie});
});

module.exports = router;