(function() {
	"use strict";
	R.extendElement('setStyle', function(property, value, elem) {
		var prefixedProp = R._getJsPropName(property);
		elem.style[prefixedProp] = value;
		return elem;
	});
}());
