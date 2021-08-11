import express from 'express';
import Movie from '../controller/movie';
import User from '../controller/user';
const router = express.Router();

router.get('/register', async function(req, res, next) {
    res.render('register', {});
});

router.post('/register',  async function(req, res, next) {
    
    var result = await User.register(req.body)
    res.render('register', result);
});

router.get('/login', async function(req, res, next) {
    res.render('login', {});
});
router.get('/logout', function (req, res, next) {
    req.session.destroy(); // 删除session
    res.redirect('login');
});

router.post('/login', async function(req, res, next) {
    var result = await User.login(req.body)
    if(result.status==1){
        req.session.username = req.body.username;
        res.locals.isLogin = true;
        res.redirect('/movies');
    }else{
        res.render('login', result);
    }
});

router.get('/', async function(req, res, next) {
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