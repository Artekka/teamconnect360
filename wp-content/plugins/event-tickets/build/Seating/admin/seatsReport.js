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
/******/ 		16: 0
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
/******/ 	deferredModules.push(["9joh",0]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "9joh":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "fetchAttendees", function() { return /* binding */ fetchAttendees; });
__webpack_require__.d(__webpack_exports__, "fetchAndSendAttendeeBatch", function() { return /* binding */ fetchAndSendAttendeeBatch; });
__webpack_require__.d(__webpack_exports__, "sendAttendeesToService", function() { return /* binding */ sendAttendeesToService; });
__webpack_require__.d(__webpack_exports__, "updateAttendeeReservation", function() { return /* binding */ updateAttendeeReservation; });
__webpack_require__.d(__webpack_exports__, "handleReservationCreated", function() { return /* binding */ handleReservationCreated; });
__webpack_require__.d(__webpack_exports__, "handleReservationUpdated", function() { return /* binding */ handleReservationUpdated; });
__webpack_require__.d(__webpack_exports__, "init", function() { return /* binding */ init; });

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("yXPU");
var asyncToGenerator_default = /*#__PURE__*/__webpack_require__.n(asyncToGenerator);

// EXTERNAL MODULE: ./src/Tickets/Seating/app/admin/seatsReport/style.pcss
var style = __webpack_require__("avHc");

// EXTERNAL MODULE: external "tec.tickets.seating.service.iframe"
var external_tec_tickets_seating_service_iframe_ = __webpack_require__("pJv/");

// EXTERNAL MODULE: external "tec.tickets.seating.utils"
var external_tec_tickets_seating_utils_ = __webpack_require__("MsaN");

// EXTERNAL MODULE: external "tec.tickets.seating.service.api"
var external_tec_tickets_seating_service_api_ = __webpack_require__("wRIV");

// EXTERNAL MODULE: external "tec.tickets.seating.ajax"
var external_tec_tickets_seating_ajax_ = __webpack_require__("lL5a");

// CONCATENATED MODULE: ./src/Tickets/Seating/app/admin/seatsReport/localized-data.js
var _window;
/**
 * @typedef {Object} SeatMapTicketEntry
 * @property {string}               ticketId              The ticket ID.
 * @property {string}               name                  The ticket name.
 * @property {number}               price                 The ticket price.
 * @property {string}               description           The ticket description.
 *
 * @typedef {Object} SeatTypeMap
 * @property {string}               id                    The seat type ID.
 * @property {SeatMapTicketEntry[]} tickets               The list of tickets for the seat type.
 *
 * @typedef {Object} SeatsReportLocalizedData
 * @property {SeatTypeMap}          seatTypeMap           The map of seat types.
 * @property {string}               postId                The post ID of the post to purchase tickets for.
 * @property {string}               fetchAttendeesAjaxUrl The AJAX URL to fetch the attendees for the post.
 *
 * @type {SeatsReportLocalizedData}
 */
const localizedData = (_window = window) === null || _window === void 0 || (_window = _window.tec) === null || _window === void 0 || (_window = _window.tickets) === null || _window === void 0 || (_window = _window.seating) === null || _window === void 0 || (_window = _window.admin) === null || _window === void 0 ? void 0 : _window.seatsReport;
// EXTERNAL MODULE: ./src/Tickets/Seating/app/admin/action-handlers.js
var action_handlers = __webpack_require__("liIJ");

// CONCATENATED MODULE: ./src/Tickets/Seating/app/admin/seatsReport/index.js








const {
  seatTypeMap,
  postId
} = localizedData;

/**
 * @typedef {Object} SeatReportAttendee
 * @property {number} id                            The attendee ID.
 * @property {string} name                          The attendee name.
 * @property {Object} purchaser                     The attendee purchaser data.
 * @property {number} purchaser.id                  The attendee purchaser ID.
 * @property {number} purchaser.name                The attendee name.
 * @property {number} purchaser.associatedAttendees The number of attendees associated with the purchaser.
 * @property {number} ticketId                      The attendee ticket ID.
 * @property {string} seatTypeId                    The attendee seat type UUID.
 * @property {string} seatLabel                     The attendee seat label.
 * @property {string} reservationId                 The attendee reservation UUID.
 */

/**
 * @typedef {Object} EventAttendeesBatch
 * @property {number}               currentBatch The current batch number.
 * @property {number}               totalBatches The total number of batches.
 * @property {number|false}         nextBatch    The next batch number or `false` if there are no more batches.
 * @property {SeatReportAttendee[]} attendees    The attendees data.
 */

/**
 * Fetches attendees for a given post ID.
 *
 * @since 5.16.0
 *
 * @param {number} currentBatch The batch number to fetch.
 *
 * @return {Promise<EventAttendeesBatch>} A promise that will be resolved with the attendees.
 */
function fetchAttendees(_x) {
  return _fetchAttendees.apply(this, arguments);
}

/**
 * Recursively fetches attendees in batches and sends them to the service via the iframe.
 *
 * @since 5.16.0
 *
 * @param {HTMLElement} iframe         The service iframe element to send messages to.
 * @param {number}      currentBatch   The batch number to fetch.
 * @param {Function}    resolve        The function to call when the attendees have been sent.
 * @param {number}      totalAttendees The running total of Attendees sent so far.
 *
 * @return {Promise<void>} A promise that will resolve the total number of Attendees sent.
 */
function _fetchAttendees() {
  _fetchAttendees = asyncToGenerator_default()(function* (currentBatch) {
    var _json$data2, _json$data3, _json$data4, _json$data5;
    currentBatch = currentBatch || 1;
    const url = new URL(external_tec_tickets_seating_ajax_["ajaxUrl"]);
    url.searchParams.set('_ajax_nonce', external_tec_tickets_seating_ajax_["ajaxNonce"]);
    url.searchParams.set('postId', postId);
    url.searchParams.set('action', external_tec_tickets_seating_ajax_["ACTION_FETCH_ATTENDEES"]);
    url.searchParams.set('currentBatch', currentBatch);
    const response = yield fetch(url.toString(), {
      headers: {
        Accept: 'application/json'
      }
    });
    const json = yield response.json();
    if (response.status !== 200) {
      var _json$data;
      throw new Error(`Failed to fetch attendees for post ID ${postId}. Status: ${response.status} - ${json === null || json === void 0 || (_json$data = json.data) === null || _json$data === void 0 ? void 0 : _json$data.error}`);
    }
    return {
      attendees: (json === null || json === void 0 || (_json$data2 = json.data) === null || _json$data2 === void 0 ? void 0 : _json$data2.attendees) || [],
      totalBatches: (json === null || json === void 0 || (_json$data3 = json.data) === null || _json$data3 === void 0 ? void 0 : _json$data3.totalBatches) || 1,
      currentBatch: (json === null || json === void 0 || (_json$data4 = json.data) === null || _json$data4 === void 0 ? void 0 : _json$data4.currentBatch) || 1,
      nextBatch: (json === null || json === void 0 || (_json$data5 = json.data) === null || _json$data5 === void 0 ? void 0 : _json$data5.nextBatch) || false
    };
  });
  return _fetchAttendees.apply(this, arguments);
}
function fetchAndSendAttendeeBatch(_x2, _x3, _x4, _x5) {
  return _fetchAndSendAttendeeBatch.apply(this, arguments);
}

/**
 * Fetches the attendees in batches and sends them to the service via the iframe.
 *
 * @since 5.16.0
 *
 * @param {HTMLElement} iframe The service iframe element to send messages to.
 *
 * @return {Promise<number>} A promise that will be resolved to the total number of Attendees sent.
 */
function _fetchAndSendAttendeeBatch() {
  _fetchAndSendAttendeeBatch = asyncToGenerator_default()(function* (iframe, currentBatch, resolve, totalAttendees) {
    return fetchAttendees(currentBatch).then(batch => {
      const nextBatch = (batch === null || batch === void 0 ? void 0 : batch.nextBatch) || false;
      const totalBatches = (batch === null || batch === void 0 ? void 0 : batch.totalBatches) || 1;
      const attendeeData = {
        totalBatches,
        currentBatch,
        attendees: (batch === null || batch === void 0 ? void 0 : batch.attendees) || []
      };
      Object(external_tec_tickets_seating_service_api_["sendPostMessage"])(iframe, external_tec_tickets_seating_service_api_["OUTBOUND_EVENT_ATTENDEES"], attendeeData);
      const updatedTotalAttendees = totalAttendees + attendeeData.attendees.length;
      if (!nextBatch) {
        resolve(updatedTotalAttendees);
        return;
      }
      return fetchAndSendAttendeeBatch(iframe, nextBatch, resolve, updatedTotalAttendees);
    });
  });
  return _fetchAndSendAttendeeBatch.apply(this, arguments);
}
function sendAttendeesToService(_x6) {
  return _sendAttendeesToService.apply(this, arguments);
}

/**
 * @typedef {Object} ReservationUpdatedProps
 * @property {string}  reservationId        The reservation UUID.
 * @property {string}  attendeeId           The Attendee ID.
 * @property {string}  seatTypeId           The seat type UUID.A
 * @property {string}  seatLabel            The seat label.
 * @property {string}  seatColor            The seat color.
 * @property {boolean} sendUpdateToAttendee Whether to send the updated Attendee to the service
 *
 * @typedef {ReservationUpdatedProps} ReservationCreatedProps
 * @property {number}  ticketId             The ticket ID.
 */

/**
 * Updates the Attendee with the new reservation data.
 *
 * @since 5.16.0
 *
 * @param {ReservationCreatedProps|ReservationUpdatedProps} props The update/create properties.
 *
 * @return {SeatReportAttendee} The updated Attendee data.
 */
function _sendAttendeesToService() {
  _sendAttendeesToService = asyncToGenerator_default()(function* (iframe) {
    return new Promise(resolve => {
      fetchAndSendAttendeeBatch(iframe, 1, resolve, 0);
    });
  });
  return _sendAttendeesToService.apply(this, arguments);
}
function updateAttendeeReservation(_x7) {
  return _updateAttendeeReservation.apply(this, arguments);
}

/**
 * Handles the action to create an Attendee reservation.
 *
 * @since 5.16.0
 *
 * @param {HTMLElement}             iframe The service iframe element to send messages to.
 * @param {ReservationCreatedProps} props  The action properties.
 *
 * @return {Promise<boolean>} A promise that will resolve to `true` if the Attendee reservation was created, `false` otherwise.
 */
function _updateAttendeeReservation() {
  _updateAttendeeReservation = asyncToGenerator_default()(function* (props) {
    const url = new URL(external_tec_tickets_seating_ajax_["ajaxUrl"]);
    url.searchParams.set('_ajax_nonce', external_tec_tickets_seating_ajax_["ajaxNonce"]);
    const action = props.ticketId ? external_tec_tickets_seating_ajax_["ACTION_RESERVATION_CREATED"] : external_tec_tickets_seating_ajax_["ACTION_RESERVATION_UPDATED"];
    url.searchParams.set('action', action);
    url.searchParams.set('postId', postId);
    const response = yield fetch(url.toString(), {
      method: 'POST',
      body: JSON.stringify(props)
    });
    if (!response.ok) {
      return false;
    }
    const json = yield response.json();
    if (!json.data) {
      return false;
    }
    return json.data;
  });
  return _updateAttendeeReservation.apply(this, arguments);
}
function handleReservationCreated(_x8, _x9) {
  return _handleReservationCreated.apply(this, arguments);
}

/**
 * Handles the action to update an Attendee reservation.
 *
 * @since 5.16.0
 *
 * @param {HTMLElement}             iframe The service iframe element to send messages to.
 * @param {ReservationUpdatedProps} props  The action properties.
 *
 * @return {Promise<boolean>} A promise that will resolve to `true` if the Attendee reservation was updated, `false` otherwise.
 */
function _handleReservationCreated() {
  _handleReservationCreated = asyncToGenerator_default()(function* (iframe, props) {
    const updatedAttendee = yield updateAttendeeReservation(props);
    if (!updatedAttendee) {
      return false;
    }
    Object(external_tec_tickets_seating_service_api_["sendPostMessage"])(iframe, external_tec_tickets_seating_service_api_["OUTBOUND_ATTENDEE_UPDATE"], {
      attendee: updatedAttendee
    });
    return true;
  });
  return _handleReservationCreated.apply(this, arguments);
}
function handleReservationUpdated(_x10, _x11) {
  return _handleReservationUpdated.apply(this, arguments);
}

/**
 * Registers the handlers for the messages received from the service.
 *
 * @since 5.16.0
 *
 * @param {HTMLElement} iframe The service iframe element to listen to.
 */
function _handleReservationUpdated() {
  _handleReservationUpdated = asyncToGenerator_default()(function* (iframe, props) {
    const updatedAttendee = yield updateAttendeeReservation(props);
    if (!updatedAttendee) {
      return false;
    }
    Object(external_tec_tickets_seating_service_api_["sendPostMessage"])(iframe, external_tec_tickets_seating_service_api_["OUTBOUND_ATTENDEE_UPDATE"], {
      attendee: updatedAttendee
    });
    return true;
  });
  return _handleReservationUpdated.apply(this, arguments);
}
function registerActions(iframe) {
  // When the service is ready for data, send the seat type map to the iframe.
  Object(external_tec_tickets_seating_service_api_["registerAction"])(external_tec_tickets_seating_service_api_["INBOUND_APP_READY_FOR_DATA"], /*#__PURE__*/asyncToGenerator_default()(function* () {
    Object(external_tec_tickets_seating_service_api_["removeAction"])(external_tec_tickets_seating_service_api_["INBOUND_APP_READY_FOR_DATA"]);
    Object(external_tec_tickets_seating_service_api_["sendPostMessage"])(iframe, external_tec_tickets_seating_service_api_["OUTBOUND_SEAT_TYPE_TICKETS"], seatTypeMap);
    yield sendAttendeesToService(iframe);
  }));
  Object(external_tec_tickets_seating_service_api_["registerAction"])(external_tec_tickets_seating_service_api_["RESERVATION_CREATED"], props => handleReservationCreated(iframe, props));
  Object(external_tec_tickets_seating_service_api_["registerAction"])(external_tec_tickets_seating_service_api_["RESERVATION_UPDATED"], props => handleReservationUpdated(iframe, props));
  Object(external_tec_tickets_seating_service_api_["registerAction"])(external_tec_tickets_seating_service_api_["RESERVATIONS_DELETED"], action_handlers["a" /* handleReservationsDeleted */]);
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
function init(_x12) {
  return _init.apply(this, arguments);
}
function _init() {
  _init = asyncToGenerator_default()(function* (dom) {
    dom = dom || document;
    const iframe = Object(external_tec_tickets_seating_service_iframe_["getIframeElement"])(dom);
    if (!iframe) {
      return false;
    }

    // Register the actions before initializing the iframe to avoid race conditions.
    registerActions(iframe);
    yield Object(external_tec_tickets_seating_service_iframe_["initServiceIframe"])(iframe);
  });
  return _init.apply(this, arguments);
}
Object(external_tec_tickets_seating_utils_["onReady"])(() => {
  init(document);
});

/***/ }),

/***/ "MsaN":
/***/ (function(module, exports) {

module.exports = tec.tickets.seating.utils;

/***/ }),

/***/ "avHc":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

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