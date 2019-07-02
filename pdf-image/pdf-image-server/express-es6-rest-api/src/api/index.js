import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import annotations from './annotations';
import search from './search';
import registerTeacherId from './registerTeacherId';
import connectedTeacherIds from '../models/connectedTeacherIds';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

  api.use('/annotations', annotations({ config, db }));
  
  api.use('/search', search({ config, db }));

  api.post('/register_teacher_id/:id', registerTeacherId)
  api.get('/teacher_connected/:id', (req, res, next) => {
	res.send(JSON.stringify(!!connectedTeacherIds[req.params.id]));
  });

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
