var Nanobar=function(){var f,e,g,d,h=document.head||document.getElementsByTagName("head")[0],k=function(){for(var a=3,b=document.createElement("div"),c=b.getElementsByTagName("i");b.innerHTML="\x3c!--[if gt IE "+ ++a+"]><i></i><![endif]--\x3e",c[0];);return 4<a?a:void 0}();f=function(){var a=document.getElementById("nanobar-style");null===a&&(a=document.createElement("style"),a.type="text/css",a.id="nanobar-style",h.insertBefore(a,h.firstChild),a.styleSheet?a.styleSheet.cssText=".nanobar{float:left;width:100%;height:4px;z-index:9999;}.nanobarbar{width:0;height:100%;float:left;transition:all .3s;}":
a.appendChild(document.createTextNode(".nanobar{float:left;width:100%;height:4px;z-index:9999;}.nanobarbar{width:0;height:100%;float:left;transition:all .3s;}")))};e=function(){var a=document.createElement("fakeelement"),b={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"},c;for(c in b)if(void 0!==a.style[c])return b[c]}();g=function(a){var b=document.createElement("div");b.setAttribute("class","nanobarbar");b.style.background=
a.opts.bg;b.setAttribute("on","1");a.cont.appendChild(b);e&&b.addEventListener(e,function(){"100%"===b.style.width&&"1"===b.getAttribute("on")&&(b.setAttribute("on",0),a.bars.pop(),b.style.height=0,setTimeout(function(){a.cont.removeChild(b)},300))});return b};d=function(a){a=this.opts=a||{};var b;a.bg=a.bg||"#000";this.bars=[];f();b=this.cont=document.createElement("div");b.setAttribute("class","nanobar");a.id&&(b.id=a.id);a.target?b.style.position="relative":(b.style.position="fixed",b.style.top=
"0");a.target?a.target.insertBefore(b,a.target.firstChild):document.getElementsByTagName("body")[0].appendChild(b);return this.init()};d.prototype.init=function(){var a=g(this);this.bars.unshift(a)};d.prototype.go=function(a){this.bars[0].style.width=a+"%";100==a&&(void 0!==k&&(this.bars[0].style.height=0),this.init())};return d}();