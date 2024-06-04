
const path = require('path');
const nodemon = require('nodemon');


nodemon({
	execMap: {
		js: 'node'
	},
	script: path.join(__dirname, 'server/server'),
	ignore: [],
	watch: process.env.NODE_ENV !== 'production' ? ['server/*'] : false,
	ext: 'js'
}).on('restart', function() {
	console.log('Server restarted!');
}).once('exit', function() {
	console.log('Server turning off');
	process.exit();
});