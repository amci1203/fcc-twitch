/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	(function Pomodoro(pomo) {

	    if (!pomo) return false;

	    getStringPrototypes();

	    var get = function get(id) {
	        return document.getElementById(id);
	    },
	        byClass = function byClass(elm, _class) {
	        return elm.querySelectorAll('.' + _class);
	    },

	    // takes either a number in ms to reduce to minutes or a whole number (in minutes) to multiply to seconds
	    inSeconds = function inSeconds(n, isInMs) {
	        return isInMs ? n / 1000 : n * 60;
	    },
	        text = function text(elm, str) {
	        return elm.innerText = str;
	    },
	        hasClass = function hasClass(elm, str) {
	        return elm.classList.contains(str);
	    },
	        toggleClass = function toggleClass(elm, str) {
	        return elm.classList.toggle(str);
	    },
	        click = function click(elm, fn) {
	        return elm.addEventListener('click', fn);
	    },
	        clickEach = function clickEach(list, fn) {
	        return list.forEach(function (elm) {
	            return click(elm, fn);
	        });
	    },
	        toggle = get('toggle-play'),
	        timer = get('timer'),
	        timerM = get('timer-minutes'),
	        timerS = get('timer-seconds'),
	        sessionSpan = get('session-length'),
	        breakSpan = get('break-length'),
	        increments = byClass(pomo, 'increment'),
	        alarm = get('alarm'),
	        second = 1000,
	        minute = second * 60,
	        startTimer = function startTimer() {
	        start = setInterval(tick, second);
	        disableIncrementControls();
	    },
	        pauseTimer = function pauseTimer() {
	        return clearInterval(start);
	    },
	        resetTimer = function resetTimer() {
	        return left = inSeconds(hasClass(timer, 'on-break') ? breakLen : sessionLen);
	    },
	        stopTimer = function stopTimer() {
	        if (start) clearInterval(start);
	        resetTimer();
	        activateIncrementControls();
	    },
	        toggleTimer = function toggleTimer() {
	        hasClass(toggle, 'play') ? startTimer() : pauseTimer();
	        toggleClass(toggle, 'play');
	    },
	        disableIncrementControls = function disableIncrementControls() {
	        return increments.forEach(function (elm) {
	            return elm.setAttribute('disbabled', 'disabled');
	        });
	    },
	        activatedisableIncrementControls = function activatedisableIncrementControls() {
	        return increments.forEach(function (elm) {
	            return elm.removeAttribute('disabled');
	        });
	    },
	        ring = function ring() {
	        return alarm.play();
	    };
	    var start = void 0,
	        sessionLen = 0.1,
	        breakLen = 5,
	        left = inSeconds(sessionLen);

	    function tick() {
	        left--;
	        text(timerM, String(Math.floor(left / 60)).padLeft(2, 0));
	        text(timerS, String(left % 60).padLeft(2, 0));

	        !left && toggleClass(timer, 'break') && ring() && resetTimer();
	    }

	    function incrementTimerLength() {
	        var controls = this.parentElement.id.split(':')[1],
	            increment = hasClass(this, 'increment-up') ? 1 : -1;

	        if (controls === 'session') {
	            sessionLen += increment;
	            text(sessionSpan, sessionLen);
	        }
	        if (controls === 'break') {
	            breakLen += increment;
	            text(breakSpan, breakLen);
	        }

	        left = inSeconds(sessionLen);
	    }

	    return function () {
	        click(toggle, toggleTimer);
	        clickEach(increments, incrementTimerLength);

	        text(sessionSpan, sessionLen);
	        text(breakSpan, breakLen);

	        left++;
	        tick();
	    }();
	})(document.getElementById('pomodoro'));

	function getStringPrototypes() {
	    String.prototype.padLeft = function (targetLength, padString) {
	        if (this.length >= targetLength) return this;else {
	            if (['number', 'string'].indexOf(typeof padString === 'undefined' ? 'undefined' : _typeof(padString)) !== -1) {
	                var pad = String(padString);
	                var target = this.split('*');
	                while (target.length < targetLength) {
	                    target.unshift(pad);
	                }
	                return target.join('');
	            } else {
	                throw new Error('Err: padString is not a number or string');
	            }
	        }
	    };
	}

/***/ }
/******/ ]);
