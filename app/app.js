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

	// NOTE: NOT THE FIRST FUNCTION TO RUN: go to getWeatherData
	function init(data) {

	    var dp = function dp(dps, n) {
	        return Math.round(n * Math.pow(10, dps)) / Math.pow(10, dps);
	    },
	        _1dp = dp.bind(null, 1),
	        toCelsius = function toCelsius(F) {
	        return _1dp((F - 32) / 1.8);
	    },
	        toFarenheit = function toFarenheit(C) {
	        return _1dp(C * 1.8 + 32);
	    },
	        get = function get(id) {
	        return document.getElementById(id);
	    },
	        text = function text(elm, str) {
	        return elm.innerText(str);
	    },
	        set = function set(elm, attr, val) {
	        return elm.setAttribute(attr, val);
	    },
	        city = get('city'),
	        icon = get('icon'),
	        units = get('units'),
	        value = get('value'),
	        toggle = get('toggle');

	    console.log(data);
	}

	// getting the data before we start anything
	(function getWeatherData() {
	    var _this = this;

	    var API_KEY = "c8de0e1057e67ef993b4ea7f052d7919";

	    navigator.geolocation.getCurrentPosition(function (d) {
	        var url = 'http://api.openweathermap.org/data/2.5/weather?' + ('lat=' + d.coords.latitude + '&') + ('lon=' + d.coords.longitude + '&') + ('id=524901&APPID=' + API_KEY)
	        //                'units=metric&'

	        ,
	            xhr = new XMLHttpRequest();

	        xhr.open("GET", url);
	        xhr.send(null);
	        xhr.onreadystatechange = isOk.bind(_this, xhr, init);
	    });
	})();

	function isOk(xhr, callback) {
	    var done = 4,
	        ok = function ok(stat) {
	        return stat >= 200 && stat < 300;
	    };
	    xhr.readyState === done && ok(xhr.status) ? callback(JSON.parse(xhr.responseText)) : console.log(xhr.status + ': ' + xhr.responseText);
	}

/***/ }
/******/ ]);
