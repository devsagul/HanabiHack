
function trampoline(fn) {
	return function wrapped() {
		var result = fn.apply(this, arguments);

		while (result instanceof Function) {
			result = result();
		}

		return result;
	};
}

module.exports = trampoline;
