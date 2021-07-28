import express from 'express';
import Category from '../controller/category';
import User from '../controller/user';
import Movie from '../controller/movie';
const router = express.Router();

/* add category. */
router.post('/category', Category.addCategory);
router.get('/category', Category.getCategory);


/* add user. */
router.post('/user', User.addUser);
router.get('/user', User.getUser);

router.get('/movies', async function(req, res, next) {
  const movies = await Movie.getMovies(req.query);
  res.send(movies);
});

router.get('/movie/:mid/', async function(req, res, next) {
  const movie = await Movie.getOneMovie(req.params.mid);
  res.send(movie);
});



/* add article. */
router.post('/addarticle', function(req, res, next) {
    res.send({ title: 'Homes' });
  });

/* GET articles. */
router.get('/articles', function(req, res, next) {
    res.send({ title: 'Homes' });
  });

module.exports = router;