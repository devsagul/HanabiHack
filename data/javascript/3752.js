var URL = require('em').URL;
var url = new URL('http://www.jhh.me/foo/bar');
console.log(url.parse().hostname);
