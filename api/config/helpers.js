
const path = require('path');

function root(args) {
	args = Array.prototype.slice.call(arguments, 0);
	const builtPath = path.join.apply(path, [__dirname].concat('../', ...args));

	return builtPath;
}

exports.root = root;