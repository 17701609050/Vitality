import express from 'express';
import Movie from '../controller/movie';
import User from '../controller/user';
const router = express.Router();

router.get('/register', async function(req, res, next) {
    res.render('register', {});
});

router.post('/register',  async function(req, res, next) {
    
    var result = await User.register(req.body)
    if(result.status==1){
        // 注册成功跳转登录
        res.redirect('/login');
    }else{
        res.render('register', result);
    }
    
});

router.get('/login', async function(req, res, next) {
    res.render('login', {});
});

router.get('/movies', async function(req, res, next) {
    const movies = await Movie.getMovies(req.query);
    res.render('movie', {
        'movies': movies, 
        'currentPage': req.query.page, 
        'pageSize': req.query.limit,
        'q': req.query.q,
        'style': req.query.style,
        'doubanscore': req.query.doubanscore,
        'imdbscore': req.query.imdbscore,
    });
});

router.get('/movie/subject/:mid', async function(req, res, next) {
    const movie = await Movie.getOneMovie(req.params.mid);
    res.render('movieSubject', {'movie': movie, 'q': req.query.q});
});

module.exports = router;