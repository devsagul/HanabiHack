/**
 * angular-strap
 * @version v2.0.0-rc.2 - 2014-01-29
 * @link http://mgcrea.github.io/angular-strap
 * @author [object Object]
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
"use strict";angular.module("mgcrea.ngStrap.helpers.dimensions",[]).factory("dimensions",["$document","$window",function(){var a=(angular.element,{}),b=a.nodeName=function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()};a.css=function(a,b,c){var d;return d=a.currentStyle?a.currentStyle[b]:window.getComputedStyle?window.getComputedStyle(a)[b]:a.style[b],c===!0?parseFloat(d)||0:d},a.offset=function(a){var b=a.getBoundingClientRect(),c=a.ownerDocument;return{width:a.offsetWidth,height:a.offsetHeight,top:b.top+(window.pageYOffset||c.documentElement.scrollTop)-(c.documentElement.clientTop||0),left:b.left+(window.pageXOffset||c.documentElement.scrollLeft)-(c.documentElement.clientLeft||0)}},a.position=function(d){var e,f,g={top:0,left:0};return"fixed"===a.css(d,"position")?f=d.getBoundingClientRect():(e=c(d),f=a.offset(d),f=a.offset(d),b(e,"html")||(g=a.offset(e)),g.top+=a.css(e,"borderTopWidth",!0),g.left+=a.css(e,"borderLeftWidth",!0)),{width:d.offsetWidth,height:d.offsetHeight,top:f.top-g.top-a.css(d,"marginTop",!0),left:f.left-g.left-a.css(d,"marginLeft",!0)}};var c=function(c){var d=c.ownerDocument,e=c.offsetParent||d;if(b(e,"#document"))return d.documentElement;for(;e&&!b(e,"html")&&"static"===a.css(e,"position");)e=e.offsetParent;return e||d.documentElement};return a.height=function(b,c){var d=b.offsetHeight;return c?d+=a.css(b,"marginTop",!0)+a.css(b,"marginBottom",!0):d-=a.css(b,"paddingTop",!0)+a.css(b,"paddingBottom",!0)+a.css(b,"borderTopWidth",!0)+a.css(b,"borderBottomWidth",!0),d},a.width=function(b,c){var d=b.offsetWidth;return c?d+=a.css(b,"marginLeft",!0)+a.css(b,"marginRight",!0):d-=a.css(b,"paddingLeft",!0)+a.css(b,"paddingRight",!0)+a.css(b,"borderLeftWidth",!0)+a.css(b,"borderRightWidth",!0),d},a}]);
//# sourceMappingURL=dimensions.min.map