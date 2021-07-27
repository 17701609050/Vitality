import api from './api';
import data_to_ejs from './data_to_ejs';

export default app => {
	// app.get('/', (req, res, next) => {
	// 	res.redirect('/');
	// });
	app.use('/api/v1', api);
	app.use('/', data_to_ejs);
}
