
const path = require('path');
const fs = require('fs');

module.exports = (app) => {
	fs.readdirSync(__dirname + '/api/').forEach((file) => {
		if (file.charAt(0) !== '.')
			require(`./api/${file.substr(0, file.indexOf('.'))}`)(app);
	});
};