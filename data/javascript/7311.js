(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var roll = require('./index.js');
roll({
  width: 640,
  height: 480,
  title: "Demo"
});

},{"./index.js":2}],2:[function(require,module,exports){
module.exports = roll;

function roll(options) {
  options = options || { };
  options.width = options.width || 640;
  options.height = options.height || 480;
  options.title = options.title || '';
  var isChrome = navigator.userAgent.indexOf('Chrome') > -1;
  var isSafari = !isChrome && navigator.userAgent.indexOf("Safari") > -1;
  var content = getHTMLContent(options, isSafari);

  document.open();
  document.write(content);
  document.close();
  document.title = options.title;
}

function getHTMLContent(options, isSafari) {
  var safariContent;
  if (isSafari) {
    safariContent = [
    '<iframe class="center" width="' + options.width + '" height="' + options.height + '" src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0" frameborder="0" allowfullscreen></iframe>',
    ].join('\n');
  }

  return [
"<!DOCTYPE html>",
"<html>",
"<head>",
"<style>",
" .center { position: absolute; top: 50%; left: 50%; -webkit-transform: translate(-50%, -50%); -ms-transform: translate(-50%, -50%); transform: translate(-50%, -50%); }",
isSafari ? '' : " iframe { visibility: hidden; }",
" body { padding:0; background: black; margin:0;position:absolute; width: 100%; height: 100%;}",
" svg path,svg rect{  fill: #FF6700; }",
" </style>",
"</head>",
"<body>",
isSafari ? safariContent : [
"    <div id='player'>",
"    </div>",
'    <svg id="loading" class="center" version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">',
'      <path fill="#000" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z" transform="rotate(69.4346 25 25)">',
'        <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"></animateTransform>',
'      </path>',
'    </svg>',
"    <script>",
"      var tag = document.createElement('script');",
"      tag.src = 'https://www.youtube.com/iframe_api';",
"      var firstScriptTag = document.getElementsByTagName('script')[0];",
"      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);",
"      var player;",
"      function onYouTubeIframeAPIReady() {",
"        player = new YT.Player('player', {",
"          height: '" + options.height + "',",
"          width: '" + options.width + "',",
"          videoId: 'dQw4w9WgXcQ',",
"          playerVars: {",
"            'rel': 0,",
"            'showinfo': 0,",
"            'enablejsapi': 1,",
"            'origin': location.origin",
"          },",
"          events: {",
"            'onReady': onPlayerReady,",
"            'onStateChange': onPlayerStateChange",
"          }",
"        });",
"      }",
"      // 4. The API will call this function when the video player is ready.",
"      function onPlayerReady(event) {",
"        event.target.playVideo();",
"      }",
"      function onPlayerStateChange(event) {",
"        if (event.data == YT.PlayerState.PLAYING) {",
" var playerElement = document.getElementById('player');",
" playerElement.setAttribute('class', 'center');",
"          playerElement.style.visibility = 'visible';",
"          document.getElementById('loading').style.visibility = 'hidden';",
"        }",
"      }",
"    </script>",
].join('\n'),
"  </body>",
"</html>"
  ].join('\n');

}

},{}]},{},[1]);
