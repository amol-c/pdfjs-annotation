import resource from 'resource-router-middleware';
import annotations from '../models/annotations';

export default ({ config, db }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'annotations',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
	load(req, id, callback) {
		let annotation = annotations.find( annotation => annotation.id===id ),
			err = annotation ? null : 'Not found';
		callback(err, annotation);
	},

	/** GET / - List all entities */
	index({ params }, res) {
		res.json(annotations);
	},
  create({ body }, res) {
    annotations.length = 0
    console.log(annotations)
    annotations.push(body)
    res.json(body);
  },

	/** GET /:id - Return a given entity */
	read({ annotation }, res) {
		res.json(annotation);
	},

	/** PUT /:id - Update a given entity */
	update({ annotation, body }, res) {
		for (let key in body) {
			if (key!=='id') {
				annotation[key] = body[key];
			}
    }
    
    console.log(annotation)

		res.json(annotation);
	},

	/** DELETE /:id - Delete a given entity */
	delete({ annotation }, res) {
		annotations.splice(annotations.indexOf(annotation), 1);
		res.sendStatus(204);
	}
});
