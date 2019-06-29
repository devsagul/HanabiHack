"use strict";
/// <reference path="../../../typings/main/ambient/TweenMax/TweenMax.d.ts" />
/// <reference path="../../../typings/main/ambient/TimelineMax/TimelineMax.d.ts" />
/// <reference path="../../../typings/main/ambient/jquery/index.d.ts" />
var $ = require('jquery');
var TimelineMax = require('TimelineMax');
require('CSSPlugin');
require('EasePack');
//region Element Selectors
var $robust = $('#robust');
var $overwrite = $('#overwrite');
var $compatible = $('#compatible');
var $support = $('#support');
var $description = $('#description');
var $header = $('h1');
var $subTitle = $('h2');
var $icon = $('#info img');
var $tools = $('.tool');
//buttons
var $startBtn = $('#start');
var $pauseBtn = $('#pause');
var $restartBtn = $('#restart');
var $reverseBtn = $('#reverse');
//endregion
//region Animation Config
var duration = 0.5;
var pausedOnStart = true;
var easingElastic = Elastic.easeInOut;
var easingBounce = Bounce.easeInOut;
var easingBack = Back.easeInOut;
var easingLinear = Linear.easeInOut;
//endregion
//region Timeline Setup
var toolTimeline = new TimelineMax({ paused: pausedOnStart });
toolTimeline
    .from($header, duration, { opacity: 0, scale: 25, ease: Linear.easeInOut }, 'intro')
    .from($subTitle, duration, { opacity: 0, scale: 25, ease: Linear.easeInOut }, 'intro')
    .from($description, duration, { opacity: 0, scale: 25, ease: Linear.easeInOut }, '+=0.2')
    .from($icon, duration, { left: -275, ease: Back.easeInOut }, 'icon')
    .from($icon, duration, { skewX: '20deg', ease: Back.easeInOut })
    .to($description, duration, { left: 25, ease: Back.easeInOut })
    .staggerTo($tools, duration, { top: -20, ease: Back.easeInOut }, 0.2);
//endregion
//region Playback Actions
var startAction = function () {
    toolTimeline.play();
};
var pauseAction = function () {
    toolTimeline.pause();
};
var restartAction = function () {
    toolTimeline.restart();
};
var reverseAction = function () {
    toolTimeline.reverse();
};
//event listerners
$startBtn.on('click', startAction);
$pauseBtn.on('click', pauseAction);
$restartBtn.on('click', restartAction);
$reverseBtn.on('click', reverseAction);
//endregion
$(window).load(function () {
    console.log('window load event');
    console.log('$icon', $icon);
    toolTimeline.play();
});
//# sourceMappingURL=main.js.map