
const path = require('path');

// build a path expanding leftward from the provided args directory
function root(args) {
	args = Array.prototype.slice.call(arguments, 0);
	const builtPath = path.join.apply(path, [__dirname].concat('../', ...args));

	return builtPath;
}

exports.root = root;