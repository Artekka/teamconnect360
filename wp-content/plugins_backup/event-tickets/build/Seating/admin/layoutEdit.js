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
/******/ 		12: 0
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
/******/ 	deferredModules.push(["hS/i",0]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "MsaN":
/***/ (function(module, exports) {

module.exports = tec.tickets.seating.utils;

/***/ }),

/***/ "St1Y":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "hS/i":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "goToAssociatedEvents", function() { return goToAssociatedEvents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("yXPU");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_pcss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("St1Y");
/* harmony import */ var _style_pcss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_pcss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tec_tickets_seating_service_iframe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("pJv/");
/* harmony import */ var _tec_tickets_seating_service_iframe__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_tec_tickets_seating_service_iframe__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _tec_tickets_seating_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("MsaN");
/* harmony import */ var _tec_tickets_seating_utils__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_tec_tickets_seating_utils__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _tec_tickets_seating_service_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("wRIV");
/* harmony import */ var _tec_tickets_seating_service_api__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_tec_tickets_seating_service_api__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _action_handlers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("liIJ");







/**
 * @typedef {Object} AssociatedEventsData
 * @property {string} layoutId The ID of the layout.
 */

/**
 * Go to associated events.
 *
 * @since 5.16.0
 *
 * @param {AssociatedEventsData} data The layout ID.
 */
function goToAssociatedEvents(data) {
  if (data.layoutId) {
    Object(_tec_tickets_seating_utils__WEBPACK_IMPORTED_MODULE_3__["redirectTo"])(Object(_tec_tickets_seating_service_api__WEBPACK_IMPORTED_MODULE_4__["getAssociatedEventsUrl"])(data.layoutId), true);
  }
}

/**
 * Initializes iframe and the communication with the service.
 *
 * @since 5.16.0
 *
 * @param {HTMLDocument|null} dom The document to use to search for the iframe element.
 *
 * @return {Promise<void>} A promise that resolves when the iframe is initialized.
 */
function init(_x) {
  return _init.apply(this, arguments);
}
function _init() {
  _init = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()(function* (dom) {
    dom = dom || document;
    Object(_tec_tickets_seating_service_api__WEBPACK_IMPORTED_MODULE_4__["registerAction"])(_tec_tickets_seating_service_api__WEBPACK_IMPORTED_MODULE_4__["INBOUND_SET_ELEMENT_HEIGHT"], data => Object(_tec_tickets_seating_service_iframe__WEBPACK_IMPORTED_MODULE_2__["handleResize"])(data, dom));
    Object(_tec_tickets_seating_service_api__WEBPACK_IMPORTED_MODULE_4__["registerAction"])(_tec_tickets_seating_service_api__WEBPACK_IMPORTED_MODULE_4__["RESERVATIONS_DELETED"], _action_handlers__WEBPACK_IMPORTED_MODULE_5__[/* handleReservationsDeleted */ "a"]);
    Object(_tec_tickets_seating_service_api__WEBPACK_IMPORTED_MODULE_4__["registerAction"])(_tec_tickets_seating_service_api__WEBPACK_IMPORTED_MODULE_4__["SEAT_TYPES_UPDATED"], _action_handlers__WEBPACK_IMPORTED_MODULE_5__[/* handleSeatTypesUpdated */ "d"]);
    Object(_tec_tickets_seating_service_api__WEBPACK_IMPORTED_MODULE_4__["registerAction"])(_tec_tickets_seating_service_api__WEBPACK_IMPORTED_MODULE_4__["SEAT_TYPE_DELETED"], _action_handlers__WEBPACK_IMPORTED_MODULE_5__[/* handleSeatTypeDeleted */ "c"]);
    Object(_tec_tickets_seating_service_api__WEBPACK_IMPORTED_MODULE_4__["registerAction"])(_tec_tickets_seating_service_api__WEBPACK_IMPORTED_MODULE_4__["RESERVATIONS_UPDATED_FOLLOWING_SEAT_TYPES"], _action_handlers__WEBPACK_IMPORTED_MODULE_5__[/* handleReservationsUpdatedFollowingSeatTypes */ "b"]);
    Object(_tec_tickets_seating_service_api__WEBPACK_IMPORTED_MODULE_4__["registerAction"])(_tec_tickets_seating_service_api__WEBPACK_IMPORTED_MODULE_4__["GO_TO_ASSOCIATED_EVENTS"], goToAssociatedEvents);
    yield Object(_tec_tickets_seating_service_iframe__WEBPACK_IMPORTED_MODULE_2__["initServiceIframe"])(Object(_tec_tickets_seating_service_iframe__WEBPACK_IMPORTED_MODULE_2__["getIframeElement"])(dom));
  });
  return _init.apply(this, arguments);
}
Object(_tec_tickets_seating_utils__WEBPACK_IMPORTED_MODULE_3__["onReady"])(() => {
  init(document);
});

/***/ }),

/***/ "lL5a":
/***/ (function(module, exports) {

module.exports = tec.tickets.seating.ajax;

/***/ }),

/***/ "liIJ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return handleSeatTypesUpdated; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return handleSeatTypeDeleted; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return handleReservationsDeleted; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return handleReservationsUpdatedFollowingSeatTypes; });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("yXPU");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tec_tickets_seating_ajax__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("lL5a");
/* harmony import */ var _tec_tickets_seating_ajax__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tec_tickets_seating_ajax__WEBPACK_IMPORTED_MODULE_1__);



/**
 * @typedef {Object} UpdatedSeatType
 * @property {string}            id               The seat type ID.
 * @property {string}            name             The seat type name.
 * @property {string}            mapId            The ID of the map the seat type belongs to.
 * @property {string}            layoutId         The ID of the layout the seat type belongs to.
 * @property {string}            description      The seat type description.
 * @property {number}            seatsCount       The seat type seats.
 *
 * @typedef {Object} UpdatedSeatTypeData
 * @property {UpdatedSeatType[]} seatTypes        The updated seat types.
 *
 *
 * @typedef {Object} SeatTypesUpdateResponseData
 * @property {number}            updatedSeatTypes The number of seat types updated.
 * @property {number}            updatedTickets   The number of tickets updated.
 * @property {number}            updatedPosts     The number of posts updated.
 */

/**
 * Handles the seat types updated action.
 *
 * @since 5.16.0
 *
 * @param {UpdatedSeatTypeData} data The updated seat types.
 *
 * @return {Promise<SeatTypesUpdateResponseData|false>} A promise that will resolve to the seat types update response
 *                                                      data or `false` on failure.
 */
function handleSeatTypesUpdated(_x) {
  return _handleSeatTypesUpdated.apply(this, arguments);
}

/**
 * @typedef {Object} SeatTypeDeletedData
 * @property {string}          deletedId  The ID of the seat type that was deleted.
 * @property {UpdatedSeatType} transferTo The seat type that was transferred to.
 */

/**
 * Handles the seat type deleted action.
 *
 * @since 5.16.0
 *
 * @param {SeatTypeDeletedData} data The deleted seat type data.
 *
 * @return {Promise<boolean>} A promise that will resolve to `true` if the seat type deletion handling was successful.
 */
function _handleSeatTypesUpdated() {
  _handleSeatTypesUpdated = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()(function* (data) {
    const updatedSeatTypes = (data === null || data === void 0 ? void 0 : data.seatTypes) || [];
    if (!(Array.isArray(updatedSeatTypes) && updatedSeatTypes.length > 0)) {
      return false;
    }
    const url = new URL(_tec_tickets_seating_ajax__WEBPACK_IMPORTED_MODULE_1__["ajaxUrl"]);
    url.searchParams.set('_ajax_nonce', _tec_tickets_seating_ajax__WEBPACK_IMPORTED_MODULE_1__["ajaxNonce"]);
    url.searchParams.set('action', _tec_tickets_seating_ajax__WEBPACK_IMPORTED_MODULE_1__["ACTION_SEAT_TYPES_UPDATED"]);
    const response = yield fetch(url.toString(), {
      method: 'POST',
      body: JSON.stringify(updatedSeatTypes)
    });
    if (!response.ok) {
      return false;
    }
    const json = yield response.json();
    return (json === null || json === void 0 ? void 0 : json.data) || {
      updatedSeatTypes: 0,
      updatedTickets: 0,
      updatedPosts: 0
    };
  });
  return _handleSeatTypesUpdated.apply(this, arguments);
}
function handleSeatTypeDeleted(_x2) {
  return _handleSeatTypeDeleted.apply(this, arguments);
}

/**
 * @typedef {Object} ReservationsDeletedData
 * @property {string[]} ids The IDs of the reservations that were deleted.
 */

/**
 * Handles the deletion of reservations.
 *
 * @since 5.16.0
 *
 * @param {ReservationsDeletedData} data The IDs of the reservations that were deleted.
 *
 * @return {Promise<boolean|number>} A promise that will resolve to the number of
 *                                   reservations that were deleted or `false` on failure.
 */
function _handleSeatTypeDeleted() {
  _handleSeatTypeDeleted = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()(function* (data) {
    if (!(data !== null && data !== void 0 && data.deletedId)) {
      return false;
    }
    const url = new URL(_tec_tickets_seating_ajax__WEBPACK_IMPORTED_MODULE_1__["ajaxUrl"]);
    url.searchParams.set('_ajax_nonce', _tec_tickets_seating_ajax__WEBPACK_IMPORTED_MODULE_1__["ajaxNonce"]);
    url.searchParams.set('action', _tec_tickets_seating_ajax__WEBPACK_IMPORTED_MODULE_1__["ACTION_SEAT_TYPE_DELETED"]);
    const response = yield fetch(url.toString(), {
      method: 'POST',
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      return false;
    }
    const json = yield response.json();
    return (json === null || json === void 0 ? void 0 : json.data) || false;
  });
  return _handleSeatTypeDeleted.apply(this, arguments);
}
function handleReservationsDeleted(_x3) {
  return _handleReservationsDeleted.apply(this, arguments);
}

/**
 * @typedef {Object} ReservationsUpdateResponseData
 * @property {number}               updatedAttendees The number of Attendees updated.
 *
 * @typedef {Object} ReservationsUpdateFollowingSeatTypesData
 * @property {Map<string,string[]>} updated          The updated reservations.
 */

/**
 * Handles the update of Reservations following a Seat Type update.
 *
 * @since 5.16.0
 *
 * @param {ReservationsUpdateFollowingSeatTypesData} data The updated reservations.
 *
 * @return {Promise<ReservationsUpdateResponseData|false>} A promise that will resolve to the reservations update
 *                                                         response data or `false` on failure.
 */
function _handleReservationsDeleted() {
  _handleReservationsDeleted = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()(function* (data) {
    var _json$data;
    const ids = (data === null || data === void 0 ? void 0 : data.ids) || [];
    if (!(Array.isArray(ids) && ids.length > 0)) {
      return 0;
    }
    const url = new URL(_tec_tickets_seating_ajax__WEBPACK_IMPORTED_MODULE_1__["ajaxUrl"]);
    url.searchParams.set('_ajax_nonce', _tec_tickets_seating_ajax__WEBPACK_IMPORTED_MODULE_1__["ajaxNonce"]);
    url.searchParams.set('action', _tec_tickets_seating_ajax__WEBPACK_IMPORTED_MODULE_1__["ACTION_DELETE_RESERVATIONS"]);
    const response = yield fetch(url.toString(), {
      method: 'POST',
      body: JSON.stringify(ids)
    });
    if (!response.ok) {
      return false;
    }
    const json = yield response.json();
    return (json === null || json === void 0 || (_json$data = json.data) === null || _json$data === void 0 ? void 0 : _json$data.numberDeleted) || 0;
  });
  return _handleReservationsDeleted.apply(this, arguments);
}
function handleReservationsUpdatedFollowingSeatTypes(_x4) {
  return _handleReservationsUpdatedFollowingSeatTypes.apply(this, arguments);
}
function _handleReservationsUpdatedFollowingSeatTypes() {
  _handleReservationsUpdatedFollowingSeatTypes = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()(function* (data) {
    const updated = (data === null || data === void 0 ? void 0 : data.updated) || {};
    if (!updated || Object.keys(updated).length === 0) {
      return 0;
    }
    const url = new URL(_tec_tickets_seating_ajax__WEBPACK_IMPORTED_MODULE_1__["ajaxUrl"]);
    url.searchParams.set('_ajax_nonce', _tec_tickets_seating_ajax__WEBPACK_IMPORTED_MODULE_1__["ajaxNonce"]);
    url.searchParams.set('action', _tec_tickets_seating_ajax__WEBPACK_IMPORTED_MODULE_1__["ACTION_RESERVATIONS_UPDATED_FROM_SEAT_TYPES"]);
    const response = yield fetch(url.toString(), {
      method: 'POST',
      body: JSON.stringify(updated)
    });
    if (!response.ok) {
      return false;
    }
    const json = yield response.json();
    return (json === null || json === void 0 ? void 0 : json.data) || {
      updatedAttendees: 0
    };
  });
  return _handleReservationsUpdatedFollowingSeatTypes.apply(this, arguments);
}

/***/ }),

/***/ "pJv/":
/***/ (function(module, exports) {

module.exports = tec.tickets.seating.service.iframe;

/***/ }),

/***/ "wRIV":
/***/ (function(module, exports) {

module.exports = tec.tickets.seating.service.api;

/***/ })

/******/ });