import resource from 'resource-router-middleware';
import annotations from '../models/annotations';

export default ({ config, db }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'search',
/*
  {
    "total": 43127,
    "rows": [
      {
        "id": "d41d8cd98f00b204e9800998ecf8427e",
        "text": "Updated annotation text",
        ...
      },
      ...
    ]
  }
` */
	/** GET / - List all entities */
	index({ params }, res) {
    const searchData = {
      "total": annotations.length,
      "rows": annotations
    }
		res.json(searchData);
	},
});
