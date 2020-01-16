const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
	async index(resquet, response) {
		const { latitude, longitude, techs} = resquet.query;

		const techsArray = parseStringAsArray(techs);

		const devs = await Dev.find({
			techs: {
				$in: techsArray,
			},
			location : {
				$near: {
					$geometry: {
						type: 'Point',
						coordinates: [longitude, latitude],
					},
					$maxDistance: 10000,
				}, 
			},
		});

		return response.json({ devs });
	}
}
