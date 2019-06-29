$(function() {

	$(document).scroll(function(){
		var doc = document.documentElement, body = document.body;
		var top = (doc && doc.scrollTop  || body && body.scrollTop  || 0);
		$('#offsetHelper').html(top);
	});

});

// initialize skrollr
var s = skrollr.init({
	edgeStrategy: 'set',
});
// & menu
skrollr.menu.init(s, {
    animate: true, //skrollr will smoothly animate to the new position using `animateTo`.
    duration: 500, //How long the animation should take in ms.
    easing: 'sqrt' //The easing function to use.
});

// used in skrollr.stylesheets.js to keep skrollr data attributes clean
String.prototype.killWhiteSpace = function() {
    return this.replace(/\s/g, '');
};