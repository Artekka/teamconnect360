/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		7: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["7J3J",0]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "7J3J":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "ajaxUrl", function() { return /* binding */ ajaxUrl; });
__webpack_require__.d(__webpack_exports__, "ajaxNonce", function() { return /* binding */ ajaxNonce; });
__webpack_require__.d(__webpack_exports__, "ACTION_GET_SEAT_TYPES_BY_LAYOUT_ID", function() { return /* binding */ ACTION_GET_SEAT_TYPES_BY_LAYOUT_ID; });
__webpack_require__.d(__webpack_exports__, "ACTION_INVALIDATE_MAPS_LAYOUTS_CACHE", function() { return /* binding */ ACTION_INVALIDATE_MAPS_LAYOUTS_CACHE; });
__webpack_require__.d(__webpack_exports__, "ACTION_INVALIDATE_LAYOUTS_CACHE", function() { return /* binding */ ACTION_INVALIDATE_LAYOUTS_CACHE; });
__webpack_require__.d(__webpack_exports__, "ACTION_DELETE_MAP", function() { return /* binding */ ACTION_DELETE_MAP; });
__webpack_require__.d(__webpack_exports__, "ACTION_DELETE_LAYOUT", function() { return /* binding */ ACTION_DELETE_LAYOUT; });
__webpack_require__.d(__webpack_exports__, "ACTION_ADD_NEW_LAYOUT", function() { return /* binding */ ACTION_ADD_NEW_LAYOUT; });
__webpack_require__.d(__webpack_exports__, "ACTION_DUPLICATE_LAYOUT", function() { return /* binding */ ACTION_DUPLICATE_LAYOUT; });
__webpack_require__.d(__webpack_exports__, "ACTION_POST_RESERVATIONS", function() { return /* binding */ ACTION_POST_RESERVATIONS; });
__webpack_require__.d(__webpack_exports__, "ACTION_CLEAR_RESERVATIONS", function() { return /* binding */ ACTION_CLEAR_RESERVATIONS; });
__webpack_require__.d(__webpack_exports__, "ACTION_FETCH_ATTENDEES", function() { return /* binding */ ACTION_FETCH_ATTENDEES; });
__webpack_require__.d(__webpack_exports__, "ACTION_DELETE_RESERVATIONS", function() { return /* binding */ ACTION_DELETE_RESERVATIONS; });
__webpack_require__.d(__webpack_exports__, "ACTION_SEAT_TYPES_UPDATED", function() { return /* binding */ ACTION_SEAT_TYPES_UPDATED; });
__webpack_require__.d(__webpack_exports__, "ACTION_SEAT_TYPE_DELETED", function() { return /* binding */ ACTION_SEAT_TYPE_DELETED; });
__webpack_require__.d(__webpack_exports__, "ACTION_RESERVATIONS_UPDATED_FROM_SEAT_TYPES", function() { return /* binding */ ACTION_RESERVATIONS_UPDATED_FROM_SEAT_TYPES; });
__webpack_require__.d(__webpack_exports__, "ACTION_RESERVATION_CREATED", function() { return /* binding */ ACTION_RESERVATION_CREATED; });
__webpack_require__.d(__webpack_exports__, "ACTION_RESERVATION_UPDATED", function() { return /* binding */ ACTION_RESERVATION_UPDATED; });
__webpack_require__.d(__webpack_exports__, "ACTION_EVENT_LAYOUT_UPDATED", function() { return /* binding */ ACTION_EVENT_LAYOUT_UPDATED; });
__webpack_require__.d(__webpack_exports__, "ACTION_REMOVE_EVENT_LAYOUT", function() { return /* binding */ ACTION_REMOVE_EVENT_LAYOUT; });

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__("lSNA");
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// CONCATENATED MODULE: ./src/Tickets/Seating/app/ajax/localized-data.js
var _window;
/**
 * @typedef {Object} AjaxLocalizedData
 * @property {string} ajaxUrl                              The URL to the AJAX endpoint.
 * @property {string} ajaxNonce                            The AJAX nonce.
 * @property {string} ACTION_INVALIDATE_MAPS_LAYOUTS_CACHE The action to invalidate the maps and layouts cache.
 * @property {string} ACTION_INVALIDATE_LAYOUTS_CACHE      The action to invalidate the layouts cache.
 * @property {string} ACTION_DELETE_MAP                    The action to delete a map.
 * @property {string} ACTION_DELETE_LAYOUT                 The action to delete a layout.
 * @property {string} ACTION_ADD_NEW_LAYOUT                The action to add a layout.
 * @property {string} ACTION_DUPLICATE_LAYOUT              The action to duplicate a layout.
 * @property {string} ACTION_POST_RESERVATIONS             The action to post the reservations to the backend from the seat-selection frontend.
 * @property {string} ACTION_CLEAR_RESERVATIONS            The action to clear the reservations from the backend from the seat-selection frontend.
 * @property {string} ACTION_FETCH_ATTENDEES               The action to fetch attendees by event or post ID.
 * @property {string} ACTION_DELETE_RESERVATIONS           The action to delete reservations.
 * @property {string} ACTION_GET_SEAT_TYPES_BY_LAYOUT_ID   The action to get the seat types for a given layout ID.
 * @property {string} ACTION_SEAT_TYPES_UPDATED            The action to update the seat types.
 * @property {string} ACTION_SEAT_TYPE_DELETED             The action to handle the deletion of a seat type.
 * @property {string} ACTION_EVENT_LAYOUT_UPDATED          The action to handle the update of layout type.
 * @property {string} ACTION_REMOVE_EVENT_LAYOUT           The action to remove the layout from an event.
 */

/**
 * @type {AjaxLocalizedData}
 */
const localizedData = (_window = window) === null || _window === void 0 || (_window = _window.tec) === null || _window === void 0 || (_window = _window.tickets) === null || _window === void 0 || (_window = _window.seating) === null || _window === void 0 ? void 0 : _window.ajax;
// CONCATENATED MODULE: ./src/Tickets/Seating/app/ajax/index.js

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { defineProperty_default()(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }

const {
  ajaxUrl,
  ajaxNonce,
  ACTION_GET_SEAT_TYPES_BY_LAYOUT_ID,
  ACTION_INVALIDATE_MAPS_LAYOUTS_CACHE,
  ACTION_INVALIDATE_LAYOUTS_CACHE,
  ACTION_DELETE_MAP,
  ACTION_DELETE_LAYOUT,
  ACTION_ADD_NEW_LAYOUT,
  ACTION_DUPLICATE_LAYOUT,
  ACTION_POST_RESERVATIONS,
  ACTION_CLEAR_RESERVATIONS,
  ACTION_FETCH_ATTENDEES,
  ACTION_DELETE_RESERVATIONS,
  ACTION_SEAT_TYPES_UPDATED,
  ACTION_SEAT_TYPE_DELETED,
  ACTION_RESERVATIONS_UPDATED_FROM_SEAT_TYPES,
  ACTION_RESERVATION_CREATED,
  ACTION_RESERVATION_UPDATED,
  ACTION_EVENT_LAYOUT_UPDATED,
  ACTION_REMOVE_EVENT_LAYOUT
} = localizedData;

window.tec = window.tec || {};
window.tec.tickets.seating = window.tec.tickets.seating || {};
window.tec.tickets.seating.ajax = window.tec.tickets.seating.ajax || {};
window.tec.tickets.seating.ajax = _objectSpread(_objectSpread({}, window.tec.tickets.seating.ajax), {}, {
  ajaxUrl,
  ajaxNonce,
  ACTION_GET_SEAT_TYPES_BY_LAYOUT_ID,
  ACTION_INVALIDATE_MAPS_LAYOUTS_CACHE,
  ACTION_INVALIDATE_LAYOUTS_CACHE,
  ACTION_DELETE_MAP,
  ACTION_DELETE_LAYOUT,
  ACTION_ADD_NEW_LAYOUT,
  ACTION_DUPLICATE_LAYOUT,
  ACTION_POST_RESERVATIONS,
  ACTION_CLEAR_RESERVATIONS,
  ACTION_FETCH_ATTENDEES,
  ACTION_DELETE_RESERVATIONS,
  ACTION_SEAT_TYPES_UPDATED,
  ACTION_SEAT_TYPE_DELETED,
  ACTION_RESERVATIONS_UPDATED_FROM_SEAT_TYPES,
  ACTION_RESERVATION_CREATED,
  ACTION_RESERVATION_UPDATED,
  ACTION_EVENT_LAYOUT_UPDATED,
  ACTION_REMOVE_EVENT_LAYOUT
});

/***/ })

/******/ });