import express from 'express';
import Category from '../controller/category';
import User from '../controller/user';
import Movie from '../controller/movie';
const router = express.Router();

/* add category. */
router.post('/category', Category.addCategory);
router.get('/category', Category.getCategory);


/* user manager */
router.post('/user', User.register);
router.post('/user/login', async function(req, res, next) {
  var result = await User.login(req.body)
  res.send(result);
});
router.get('/user/auth', User.auth);
router.get('/users', User.getUsers);

router.get('/movies', async function(req, res, next) {
  const movies = await Movie.getMovies(req.query);
  res.send(movies);
});

router.get('/movie/:mid/', async function(req, res, next) {
  const movie = await Movie.getOneMovie(req.params.mid);
  res.send(movie);
});

//create movie
router.post('/movie', async function(req, res, next) {
  const movie = await Movie.createMovie(req.body);
  res.send(movie);
});

//put movie
router.put('/movie/:id', async function(req, res, next) {
  const movie = await Movie.updateMovie(req.body, req.params);
  res.send(movie);
});

//delete movie
router.delete('/movie/:id', async function(req, res, next) {
  const result = await Movie.destroy(req.params);
  res.send(result);
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
