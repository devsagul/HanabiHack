/*! JointJS v0.9.7 - JavaScript diagramming library  2016-01-28 


This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
(function(root, factory) {

    if (typeof define === 'function' && define.amd) {

        // AMD. Register as an anonymous module.
        define(['g'], function(g) {
            return factory(g);
        });

    } else if (typeof exports === 'object') {

        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        var g = require('./geometry');

        module.exports = factory(g);

    } else {

        // Browser globals.
        var g = root.g;

        root.Vectorizer = root.V = factory(g);
    }

}(this, function(g) {

var V,Vectorizer;V=Vectorizer=function(){function a(){var a=++x+"";return"v-"+a}function b(a){return(a||"").replace(/ /g," ")}function c(a){return a===Object(a)}function d(a){return"[object Array]"==Object.prototype.toString.call(a)}function e(a){var b='<svg xmlns="'+v.xmlns+'" xmlns:xlink="'+v.xlink+'" version="'+w+'">'+(a||"")+"</svg>",c=f(b,{async:!1});return c.documentElement}function f(a,b){b=b||{};var c;try{var d=new DOMParser;"undefined"!=typeof b.async&&(d.async=b.async),c=d.parseFromString(a,"text/xml")}catch(e){c=void 0}if(!c||c.getElementsByTagName("parsererror").length)throw new Error("Invalid XML: "+a);return c}function h(a,b,c){var d,f;if(!a)return void 0;if("object"==typeof a)return new m(a);if(b=b||{},"svg"===a.toLowerCase())return new m(e());if("<"===a[0]){var g=e(a);if(g.childNodes.length>1){var h=[];for(d=0,f=g.childNodes.length;f>d;d++){var j=g.childNodes[d];h.push(new m(document.importNode(j,!0)))}return h}return new m(document.importNode(g.firstChild,!0))}a=document.createElementNS(v.xmlns,a);for(var k in b)i(a,k,b[k]);for("[object Array]"!=Object.prototype.toString.call(c)&&(c=[c]),d=0,f=c[0]&&c.length||0;f>d;d++){var l=c[d];a.appendChild(l instanceof m?l.node:l)}return new m(a)}function i(a,b,c){if(b.indexOf(":")>-1){var d=b.split(":");a.setAttributeNS(v[d[0]],d[1],c)}else"id"===b?a.id=c:a.setAttribute(b,c)}function j(a){var b,c,d;if(a){var e=/[ ,]+/,f=a.match(/translate\((.*)\)/);f&&(b=f[1].split(e));var g=a.match(/rotate\((.*)\)/);g&&(c=g[1].split(e));var h=a.match(/scale\((.*)\)/);h&&(d=h[1].split(e))}var i=d&&d[0]?parseFloat(d[0]):1;return{translate:{tx:b&&b[0]?parseInt(b[0],10):0,ty:b&&b[1]?parseInt(b[1],10):0},rotate:{angle:c&&c[0]?parseInt(c[0],10):0,cx:c&&c[1]?parseInt(c[1],10):void 0,cy:c&&c[2]?parseInt(c[2],10):void 0},scale:{sx:i,sy:d&&d[1]?parseFloat(d[1]):i}}}function k(a,b){var c=b.x*a.a+b.y*a.c+0,d=b.x*a.b+b.y*a.d+0;return{x:c,y:d}}function l(a){var b=k(a,{x:0,y:1}),c=k(a,{x:1,y:0}),d=180/Math.PI*Math.atan2(b.y,b.x)-90,e=180/Math.PI*Math.atan2(c.y,c.x);return{translateX:a.e,translateY:a.f,scaleX:Math.sqrt(a.a*a.a+a.b*a.b),scaleY:Math.sqrt(a.c*a.c+a.d*a.d),skewX:d,skewY:e,rotation:d}}function m(b){b instanceof m&&(b=b.node),this.node=b,this.node.id||(this.node.id=a())}function n(a){a=h(a);var b=["M",a.attr("x1"),a.attr("y1"),"L",a.attr("x2"),a.attr("y2")].join(" ");return b}function o(a){a=h(a);for(var b,c=a.node.points,d=[],e=0;e<c.length;e++)b=c[e],d.push(0===e?"M":"L",b.x,b.y);return d.push("Z"),d.join(" ")}function p(a){a=h(a);for(var b,c=a.node.points,d=[],e=0;e<c.length;e++)b=c[e],d.push(0===e?"M":"L",b.x,b.y);return d.join(" ")}function q(a){a=h(a);var b=parseFloat(a.attr("cx"))||0,c=parseFloat(a.attr("cy"))||0,d=parseFloat(a.attr("r")),e=d*y,f=["M",b,c-d,"C",b+e,c-d,b+d,c-e,b+d,c,"C",b+d,c+e,b+e,c+d,b,c+d,"C",b-e,c+d,b-d,c+e,b-d,c,"C",b-d,c-e,b-e,c-d,b,c-d,"Z"].join(" ");return f}function r(a){a=h(a);var b=parseFloat(a.attr("cx"))||0,c=parseFloat(a.attr("cy"))||0,d=parseFloat(a.attr("rx")),e=parseFloat(a.attr("ry"))||d,f=d*y,g=e*y,i=["M",b,c-e,"C",b+f,c-e,b+d,c-g,b+d,c,"C",b+d,c+g,b+f,c+e,b,c+e,"C",b-f,c+e,b-d,c+g,b-d,c,"C",b-d,c-g,b-f,c-e,b,c-e,"Z"].join(" ");return i}function s(a){a=h(a);var b,c=parseFloat(a.attr("x"))||0,d=parseFloat(a.attr("y"))||0,e=parseFloat(a.attr("width"))||0,f=parseFloat(a.attr("height"))||0,i=parseFloat(a.attr("rx"))||0,j=parseFloat(a.attr("ry"))||0,k=g.rect(c,d,e,f);if(i||j){var l=c+e,m=d+f;b=["M",c+i,d,"L",l-i,d,"Q",l,d,l,d+j,"L",l,d+f-j,"Q",l,m,l-i,m,"L",c+i,m,"Q",c,m,c,m-i,"L",c,d+j,"Q",c,d,c+i,d,"Z"].join(" ")}else b=["M",k.origin().x,k.origin().y,"H",k.corner().x,"V",k.corner().y,"H",k.origin().x,"V",k.origin().y,"Z"].join(" ");return b}function t(a){var b=a.rx||a["top-rx"]||0,c=a.rx||a["bottom-rx"]||0,d=a.ry||a["top-ry"]||0,e=a.ry||a["bottom-ry"]||0;return["M",a.x,a.y+d,"v",a.height-d-e,"a",c,e,0,0,0,c,e,"h",a.width-2*c,"a",c,e,0,0,0,c,-e,"v",-(a.height-e-d),"a",b,d,0,0,0,-b,-d,"h",-(a.width-2*b),"a",b,d,0,0,0,-b,d].join(" ")}var u="object"==typeof window&&!(!window.SVGAngle&&!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1"));if(!u)return function(){};var v={xmlns:"http://www.w3.org/2000/svg",xlink:"http://www.w3.org/1999/xlink"},w="1.1",x=0;m.prototype={getTransformToElement:function(a){return a.getScreenCTM().inverse().multiply(this.node.getScreenCTM())},translate:function(a,b,c){c=c||{},b=b||0;var d=this.attr("transform")||"",e=j(d);if("undefined"==typeof a)return e.translate;d=d.replace(/translate\([^\)]*\)/g,"").trim();var f=c.absolute?a:e.translate.tx+a,g=c.absolute?b:e.translate.ty+b,h="translate("+f+","+g+")";return this.attr("transform",(h+" "+d).trim()),this},rotate:function(a,b,c,d){d=d||{};var e=this.attr("transform")||"",f=j(e);if("undefined"==typeof a)return f.rotate;e=e.replace(/rotate\([^\)]*\)/g,"").trim(),a%=360;var g=d.absolute?a:f.rotate.angle+a,h=void 0!==b&&void 0!==c?","+b+","+c:"",i="rotate("+g+h+")";return this.attr("transform",(e+" "+i).trim()),this},scale:function(a,b){b="undefined"==typeof b?a:b;var c=this.attr("transform")||"",d=j(c);if("undefined"==typeof a)return d.scale;c=c.replace(/scale\([^\)]*\)/g,"").trim();var e="scale("+a+","+b+")";return this.attr("transform",(c+" "+e).trim()),this},bbox:function(a,b){if(!this.node.ownerSVGElement)return{x:0,y:0,width:0,height:0};var c;try{c=this.node.getBBox(),c={x:c.x,y:c.y,width:c.width,height:c.height}}catch(d){c={x:this.node.clientLeft,y:this.node.clientTop,width:this.node.clientWidth,height:this.node.clientHeight}}if(a)return c;var e=this.getTransformToElement(b||this.node.ownerSVGElement);return z.transformRect(c,e)},text:function(a,e){a=b(a),e=e||{};var f,g=a.split("\n"),i=0,j=this.attr("y");j||this.attr("y","0.8em"),this.attr("display",a?null:"none"),this.node.setAttributeNS("http://www.w3.org/XML/1998/namespace","xml:space","preserve"),this.node.textContent="";var k=this.node;if(e.textPath){var l=this.find("defs");0===l.length&&(l=h("defs"),this.append(l));var m=Object(e.textPath)===e.textPath?e.textPath.d:e.textPath;if(m){var n=h("path",{d:m});l.append(n)}var o=h("textPath");!e.textPath["xlink:href"]&&n&&o.attr("xlink:href","#"+n.node.id),Object(e.textPath)===e.textPath&&o.attr(e.textPath),this.append(o),k=o.node}for(var p=0,i=0;i<g.length;i++){var q=g[i],r=e.lineHeight||"1em";"auto"===e.lineHeight&&(r="1.5em");var s=z("tspan",{dy:0==i?"0em":r,x:this.attr("x")||0});if(s.addClass("v-line"),q)if(e.annotations){for(var t=0,u=z.annotateString(g[i],d(e.annotations)?e.annotations:[e.annotations],{offset:-p,includeAnnotationIndices:e.includeAnnotationIndices}),v=0;v<u.length;v++){var w=u[v];if(c(w)){var x=parseInt(w.attrs["font-size"],10);x&&x>t&&(t=x),f=z("tspan",w.attrs),e.includeAnnotationIndices&&f.attr("annotations",w.annotations),w.attrs["class"]&&f.addClass(w.attrs["class"]),f.node.textContent=w.t}else f=document.createTextNode(w||" ");s.append(f)}"auto"===e.lineHeight&&t&&0!==i&&s.attr("dy",1.2*t+"px")}else s.node.textContent=q;else s.addClass("v-empty-line"),s.node.style.opacity=0,s.node.textContent="-";z(k).append(s),p+=q.length+1}return this},attr:function(a,b){if("undefined"==typeof a){for(var c=this.node.attributes,d={},e=0;e<c.length;e++)d[c[e].nodeName]=c[e].nodeValue;return d}if("string"==typeof a&&"undefined"==typeof b)return this.node.getAttribute(a);if("object"==typeof a)for(var f in a)a.hasOwnProperty(f)&&i(this.node,f,a[f]);else i(this.node,a,b);return this},remove:function(){this.node.parentNode&&this.node.parentNode.removeChild(this.node)},append:function(a){var b=a;"[object Array]"!==Object.prototype.toString.call(a)&&(b=[a]);for(var c=0,d=b.length;d>c;c++)a=b[c],this.node.appendChild(a instanceof m?a.node:a);return this},prepend:function(a){this.node.insertBefore(a instanceof m?a.node:a,this.node.firstChild)},svg:function(){return this.node instanceof window.SVGSVGElement?this:z(this.node.ownerSVGElement)},defs:function(){var a=this.svg().node.getElementsByTagName("defs");return a&&a.length?z(a[0]):void 0},clone:function(){var b=z(this.node.cloneNode(!0));return b.node.id=a(),b},findOne:function(a){var b=this.node.querySelector(a);return b?z(b):void 0},find:function(a){var b=this.node.querySelectorAll(a);return Array.prototype.map.call(b,z)},index:function(){for(var a=0,b=this.node.previousSibling;b;)1===b.nodeType&&a++,b=b.previousSibling;return a},findParentByClass:function(a,b){for(var c=this.node.ownerSVGElement,d=this.node.parentNode;d&&d!==b&&d!==c;){var e=z(d);if(e.hasClass(a))return e;d=d.parentNode}return null},toLocalPoint:function(a,b){var c=this.svg().node,d=c.createSVGPoint();d.x=a,d.y=b;try{var e=d.matrixTransform(c.getScreenCTM().inverse()),f=this.getTransformToElement(c).inverse()}catch(g){return d}return e.matrixTransform(f)},translateCenterToPoint:function(a){var b=this.bbox(),c=g.rect(b).center();this.translate(a.x-c.x,a.y-c.y)},translateAndAutoOrient:function(a,b,c){var d=this.scale();this.attr("transform",""),this.scale(d.sx,d.sy);var e=this.svg().node,f=this.bbox(!1,c),h=e.createSVGTransform();h.setTranslate(-f.x-f.width/2,-f.y-f.height/2);var i=e.createSVGTransform(),j=g.point(a).changeInAngle(a.x-b.x,a.y-b.y,b);i.setRotate(j,0,0);var k=e.createSVGTransform(),m=g.point(a).move(b,f.width/2);k.setTranslate(a.x+(a.x-m.x),a.y+(a.y-m.y));var n=this.getTransformToElement(c),o=e.createSVGTransform();o.setMatrix(k.matrix.multiply(i.matrix.multiply(h.matrix.multiply(n))));var p=l(o.matrix);return this.translate(p.translateX,p.translateY),this.rotate(p.rotation),this},animateAlongPath:function(a,b){var c=z("animateMotion",a),d=z("mpath",{"xlink:href":"#"+z(b).node.id});c.append(d),this.append(c);try{c.node.beginElement()}catch(e){if("fake"===document.documentElement.getAttribute("smiling")){var f=c.node;f.animators=[];var g=f.getAttribute("id");g&&(id2anim[g]=f);for(var h=getTargets(f),i=0,j=h.length;j>i;i++){var k=h[i],l=new Animator(f,k,i);animators.push(l),f.animators[i]=l,l.register()}}}},hasClass:function(a){return new RegExp("(\\s|^)"+a+"(\\s|$)").test(this.node.getAttribute("class"))},addClass:function(a){if(!this.hasClass(a)){var b=this.node.getAttribute("class")||"";this.node.setAttribute("class",(b+" "+a).trim())}return this},removeClass:function(a){if(this.hasClass(a)){var b=this.node.getAttribute("class").replace(new RegExp("(\\s|^)"+a+"(\\s|$)","g"),"$2");this.node.setAttribute("class",b)}return this},toggleClass:function(a,b){var c="undefined"==typeof b?this.hasClass(a):!b;return c?this.removeClass(a):this.addClass(a),this},sample:function(a){a=a||1;for(var b,c=this.node,d=c.getTotalLength(),e=[],f=0;d>f;)b=c.getPointAtLength(f),e.push({x:b.x,y:b.y,distance:f}),f+=a;return e},convertToPath:function(){var a=h("path");a.attr(this.attr());var b=this.convertToPathData();return b&&a.attr("d",b),a},convertToPathData:function(){var a=this.node.tagName.toUpperCase();switch(a){case"PATH":return this.attr("d");case"LINE":return n(this.node);case"POLYGON":return o(this.node);case"POLYLINE":return p(this.node);case"ELLIPSE":return r(this.node);case"CIRCLE":return q(this.node);case"RECT":return s(this.node)}throw new Error(a+" cannot be converted to PATH.")},findIntersection:function(a,b){var c=this.svg().node;b=b||c;var d=g.rect(this.bbox(!1,b)),e=d.center(),f=d.intersectionWithLineFromCenterToPoint(a);if(!f)return void 0;var h=this.node.localName.toUpperCase();if("RECT"===h){var i=g.rect(parseFloat(this.attr("x")||0),parseFloat(this.attr("y")||0),parseFloat(this.attr("width")),parseFloat(this.attr("height"))),j=this.getTransformToElement(b),k=z.decomposeMatrix(j),l=c.createSVGTransform();l.setRotate(-k.rotation,e.x,e.y);var m=z.transformRect(i,l.matrix.multiply(j));f=g.rect(m).intersectionWithLineFromCenterToPoint(a,k.rotation)}else if("PATH"===h||"POLYGON"===h||"POLYLINE"===h||"CIRCLE"===h||"ELLIPSE"===h){for(var n="PATH"===h?this:this.convertToPath(),o=n.sample(),p=1/0,q=[],r=0,s=o.length;s>r;r++){var t=o[r],u=z.createSVGPoint(t.x,t.y);u=u.matrixTransform(this.getTransformToElement(b)),t=g.point(u);var v=t.distance(e),w=1.1*t.distance(a),x=v+w;p>x?(p=x,q=[{sample:t,refDistance:w}]):p+1>x&&q.push({sample:t,refDistance:w})}q.sort(function(a,b){return a.refDistance-b.refDistance}),f=q[0].sample}return f}};var y=.5522847498307935,z=h;z.isVElement=function(a){return a instanceof m},z.decomposeMatrix=l,z.rectToPath=t;var A=z("svg").node;return z.createSVGMatrix=function(a){var b=A.createSVGMatrix();for(var c in a)b[c]=a[c];return b},z.createSVGTransform=function(){return A.createSVGTransform()},z.createSVGPoint=function(a,b){var c=A.createSVGPoint();return c.x=a,c.y=b,c},z.transformRect=function(a,b){var c=A.createSVGPoint();c.x=a.x,c.y=a.y;var d=c.matrixTransform(b);c.x=a.x+a.width,c.y=a.y;var e=c.matrixTransform(b);c.x=a.x+a.width,c.y=a.y+a.height;var f=c.matrixTransform(b);c.x=a.x,c.y=a.y+a.height;var g=c.matrixTransform(b),h=Math.min(d.x,e.x,f.x,g.x),i=Math.max(d.x,e.x,f.x,g.x),j=Math.min(d.y,e.y,f.y,g.y),k=Math.max(d.y,e.y,f.y,g.y);return{x:h,y:j,width:i-h,height:k-j}},z.transformPoint=function(a,b){return z.createSVGPoint(a.x,a.y).matrixTransform(b)},z.styleToObject=function(a){for(var b={},c=a.split(";"),d=0;d<c.length;d++){var e=c[d],f=e.split("=");b[f[0].trim()]=f[1].trim()}return b},z.createSlicePathData=function(a,b,c,d){var e=2*Math.PI-1e-6,f=a,g=b,h=c,i=d,j=(h>i&&(j=h,h=i,i=j),i-h),k=j<Math.PI?"0":"1",l=Math.cos(h),m=Math.sin(h),n=Math.cos(i),o=Math.sin(i);return j>=e?f?"M0,"+g+"A"+g+","+g+" 0 1,1 0,"+-g+"A"+g+","+g+" 0 1,1 0,"+g+"M0,"+f+"A"+f+","+f+" 0 1,0 0,"+-f+"A"+f+","+f+" 0 1,0 0,"+f+"Z":"M0,"+g+"A"+g+","+g+" 0 1,1 0,"+-g+"A"+g+","+g+" 0 1,1 0,"+g+"Z":f?"M"+g*l+","+g*m+"A"+g+","+g+" 0 "+k+",1 "+g*n+","+g*o+"L"+f*n+","+f*o+"A"+f+","+f+" 0 "+k+",0 "+f*l+","+f*m+"Z":"M"+g*l+","+g*m+"A"+g+","+g+" 0 "+k+",1 "+g*n+","+g*o+"L0,0Z"},z.mergeAttrs=function(a,b){for(var d in b)"class"===d?a[d]=a[d]?a[d]+" "+b[d]:b[d]:"style"===d?c(a[d])&&c(b[d])?a[d]=z.mergeAttrs(a[d],b[d]):c(a[d])?a[d]=z.mergeAttrs(a[d],z.styleToObject(b[d])):c(b[d])?a[d]=z.mergeAttrs(z.styleToObject(a[d]),b[d]):a[d]=z.mergeAttrs(z.styleToObject(a[d]),z.styleToObject(b[d])):a[d]=b[d];return a},z.annotateString=function(a,b,d){b=b||[],d=d||{},offset=d.offset||0;for(var e,f,g,h=[],i=[],j=0;j<a.length;j++){f=i[j]=a[j];for(var k=0;k<b.length;k++){var l=b[k],m=l.start+offset,n=l.end+offset;j>=m&&n>j&&(c(f)?f.attrs=z.mergeAttrs(z.mergeAttrs({},f.attrs),l.attrs):f=i[j]={t:a[j],attrs:l.attrs},d.includeAnnotationIndices&&(f.annotations||(f.annotations=[])).push(k))}g=i[j-1],g?c(f)&&c(g)?JSON.stringify(f.attrs)===JSON.stringify(g.attrs)?e.t+=f.t:(h.push(e),e=f):c(f)?(h.push(e),e=f):c(g)?(h.push(e),e=f):e=(e||"")+f:e=f}return e&&h.push(e),h},z.findAnnotationsAtIndex=function(a,b){if(!a)return[];var c=[];return a.forEach(function(a){a.start<b&&b<=a.end&&c.push(a)}),c},z.findAnnotationsBetweenIndexes=function(a,b,c){if(!a)return[];var d=[];return a.forEach(function(a){(b>=a.start&&b<a.end||c>a.start&&c<=a.end||a.start>=b&&a.end<c)&&d.push(a)}),d},z.shiftAnnotations=function(a,b,c){return a?(a.forEach(function(a){a.start<b&&a.end>=b?a.end+=c:a.start>=b&&(a.start+=c,a.end+=c)}),a):a},z.sanitizeText=b,z}();

    return V;

}));