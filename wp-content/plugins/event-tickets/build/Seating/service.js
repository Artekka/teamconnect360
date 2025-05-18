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
/******/ 		17: 0
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
/******/ 	deferredModules.push(["4dmZ",0]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "4dmZ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__("lSNA");
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: external "tec.tickets.seating.utils"
var external_tec_tickets_seating_utils_ = __webpack_require__("MsaN");

// CONCATENATED MODULE: ./src/Tickets/Seating/app/service/errors.js

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { defineProperty_default()(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
const {
  _x
} = wp.i18n;

const BAD_SERVICE_RESPONSE = 'BAD_SERVICE_RESPONSE';
const MISSING_REQUEST_PARAMETERS = 'MISSING_REQUEST_PARAMETERS';
const MISSING_EPHEMERAL_TOKEN = 'MISSING_EPHEMERAL_TOKEN';
const INVALID_SITE_PARAMETER = 'INVALID_SITE_PARAMETER';
const INVALID_EXPIRE_TIME_PARAMETER = 'INVALID_EXPIRE_TIME_PARAMETER';
const SITE_NOT_FOUND = 'SITE_NOT_FOUND';
const EPHEMERAL_TOKEN_STORE_ERROR = 'EPHEMERAL_TOKEN_STORE_ERROR';
const SITE_NOT_AUTHORIZED = 'SITE_NOT_AUTHORIZED';
const unknownError = _x('Unknown error', 'Error message', 'event-tickets');

/**
 * A map from error codes to error messages.
 *
 * @since 5.16.0
 *
 * @type {string: string}
 */
const errorCodeToMessageMap = {
  BAD_SERVICE_RESPONSE: Object(external_tec_tickets_seating_utils_["getLocalizedString"])('bad-service-response', 'service-errors'),
  MISSING_REQUEST_PARAMETERS: Object(external_tec_tickets_seating_utils_["getLocalizedString"])('missing-request-parameters', 'service-errors'),
  INVALID_SITE_PARAMETER: Object(external_tec_tickets_seating_utils_["getLocalizedString"])('invalid-site-parameter', 'service-errors'),
  INVALID_EXPIRE_TIME_PARAMETER: Object(external_tec_tickets_seating_utils_["getLocalizedString"])('invalid-expire-time-parameter', 'service-errors'),
  MISSING_EPHEMERAL_TOKEN: Object(external_tec_tickets_seating_utils_["getLocalizedString"])('missing-ephemeral-token', 'service-errors'),
  SITE_NOT_FOUND: Object(external_tec_tickets_seating_utils_["getLocalizedString"])('site-not-found', 'service-errors'),
  EPHEMERAL_TOKEN_STORE_ERROR: Object(external_tec_tickets_seating_utils_["getLocalizedString"])('ephemeral-token-store-error', 'service-errors'),
  SITE_NOT_AUTHORIZED: Object(external_tec_tickets_seating_utils_["getLocalizedString"])('site-not-authorized', 'service-errors')
};

/**
 * Returns the error message for the given error code.
 *
 * @since 5.16.0
 *
 * @param {string} errorCode The error code.
 *
 * @return {string} The error message.
 */
function getErrorMessage(errorCode) {
  return errorCodeToMessageMap[errorCode] || unknownError;
}
window.tec = window.tec || {};
window.tec.tickets.seating = window.tec.tickets.seating || {};
window.tec.tickets.seating.service = window.tec.tickets.seating.service || {};
window.tec.tickets.seating.service.errors = _objectSpread(_objectSpread({}, window.tec.tickets.seating.service.errors || {}), {}, {
  BAD_SERVICE_RESPONSE,
  MISSING_REQUEST_PARAMETERS,
  MISSING_EPHEMERAL_TOKEN,
  INVALID_SITE_PARAMETER,
  INVALID_EXPIRE_TIME_PARAMETER,
  SITE_NOT_FOUND,
  EPHEMERAL_TOKEN_STORE_ERROR,
  SITE_NOT_AUTHORIZED,
  getErrorMessage
});
// CONCATENATED MODULE: ./src/Tickets/Seating/app/service/notices.js

function notices_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function notices_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? notices_ownKeys(Object(t), !0).forEach(function (r) { defineProperty_default()(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : notices_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/**
 * Gets a reference to the notice element from the DOM.
 *
 * @since 5.16.0
 *
 * @return {Element|null} The notice element, or null if it does not exist.j
 */
function getNoticeElement() {
  return document.getElementById('tec-tickets-seating-notice');
}

/**
 * Hides the notice element.
 *
 * @since 5.16.0
 *
 * @param {Element|null} notice The notice element to hide.
 */
function hideNotice(notice) {
  if (!notice) {
    return;
  }
  notice.style.display = 'none';
  notice.style.visibility = 'hidden';
}

/**
 * Shows the notice element.
 *
 * @since 5.16.0
 *
 * @param {Element|null} notice The notice element to show.
 */
function showNotice(notice) {
  if (!notice) {
    return;
  }
  notice.style.display = 'block';
  notice.style.visibility = 'visible';
}

/**
 * Sets the notice element to display the given class.
 *
 * @since 5.16.0
 *
 * @param {Element|null} notice    The notice element to manipulate.
 * @param {string}       className The class to set; all other classes will be removed.
 */
function setNoticeClass(notice, className) {
  if (!notice) {
    return;
  }
  const classes = notice.classList;
  classes.remove('notice-success');
  classes.remove('notice-warning');
  classes.remove('notice-error');
  classes.add(className);
}

/**
 * Sets the notice element to display the given message.
 *
 * @since 5.16.0
 *
 * @param {Element|null} notice  The notice element to manipulate.
 * @param {string}       message The message to display.
 */
function setNoticeMessage(notice, message) {
  if (!notice) {
    return;
  }
  notice.innerHTML = '<p>' + message + '</p>';
}

/**
 * Notifies the user of an error by manipulating the notice element.
 *
 * @since 5.16.0
 *
 * @param {string} message The message to display.
 */
function notifyUserOfError(message) {
  const notice = getNoticeElement();
  hideNotice(notice);
  setNoticeClass(notice, 'notice-error');
  setNoticeMessage(notice, message);
  showNotice(notice);
}

/**
 * Notifies the user of a warning by manipulating the notice element.
 *
 * @since 5.16.0
 *
 * @param {string} message The message to display.
 */
function notifyUserOfWarning(message) {
  const notice = getNoticeElement();
  hideNotice(notice);
  setNoticeClass(notice, 'notice-warning');
  setNoticeMessage(notice, message);
  showNotice(notice);
}
window.tec = window.tec || {};
window.tec.tickets.seating = window.tec.tickets.seating || {};
window.tec.tickets.seating.service = window.tec.tickets.seating.service || {};
window.tec.tickets.seating.service.notices = notices_objectSpread(notices_objectSpread({}, window.tec.tickets.seating.service.notices || {}), {}, {
  notifyUserOfWarning,
  notifyUserOfError
});
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("yXPU");
var asyncToGenerator_default = /*#__PURE__*/__webpack_require__.n(asyncToGenerator);

// CONCATENATED MODULE: ./src/Tickets/Seating/app/service/api/localized-data.js
/**
 * @typedef {Object} Externals
 * @property {string}      baseUrl                              The service base URL without the trailing slash.
 * @property {string}      mapsHomeUrl                          The URL to the Maps home page.
 * @property {string}      layoutsHomeUrl                       The URL to the Layouts home page.
 * @property {string}      associatedEventsUrl                  The URL to the associated events for layout page.
 * @property {Object}      localizedStrings                     The URL to the AJAX endpoint, without the trailing sla
 */

/**
 * @type {Externals}
 */
const localizedData = window.tec.tickets.seating.service;
const baseUrl = localizedData.baseUrl.replace(/\/$/, '');
const mapsHomeUrl = localizedData.mapsHomeUrl.replace(/\/$/, '');
const layoutsHomeUrl = localizedData.layoutsHomeUrl.replace(/\/$/, '');
const associatedEventsUrl = localizedData.associatedEventsUrl.replace(/\/$/, '');
function getBaseUrl() {
  return baseUrl.split('?')[0];
}
// CONCATENATED MODULE: ./src/Tickets/Seating/app/service/api/service-actions.js
// Readiness and connection actions.
const INBOUND_APP_READY = 'app_postmessage_ready';
const INBOUND_APP_READY_FOR_DATA = 'app_postmessage_ready_for_data';
const OUTBOUND_HOST_READY = 'host_postmessage_ready';
const OUTBOUND_SEAT_TYPE_TICKETS = 'host_postmessage_seat_type_tickets';
const INBOUND_SEATS_SELECTED = 'app_postmessage_seats_selected';
const INBOUND_SET_ELEMENT_HEIGHT = 'app_postmessage_set_element_height';

// Map, layout and seat type edit actions.
const MAP_CREATED_UPDATED = 'app_postmessage_map_created_updated';
const LAYOUT_CREATED_UPDATED = 'app_postmessage_layout_created_updated';
const SEAT_TYPE_CREATED_UPDATED = 'app_postmessage_seat_type_created_updated';
const SEAT_TYPES_UPDATED = 'app_postmessage_seat_types_updated';
const SEAT_TYPE_DELETED = "app_postmessage_seat_type_deleted";
const RESERVATIONS_DELETED = 'app_postmessage_reservations_deleted';
const RESERVATIONS_UPDATED = 'app_postmessage_reservations_updated';
const RESERVATIONS_UPDATED_FOLLOWING_SEAT_TYPES = 'app_postmessage_reservations_updated_following_seat_types';
const GO_TO_ASSOCIATED_EVENTS = 'app_postmessage_goto_associated_events';
const RESERVATION_UPDATED = 'app_postmessage_reservation_updated';
const RESERVATION_CREATED = 'app_postmessage_reservation_created';

// Service-side redirection actions.
const GO_TO_MAPS_HOME = 'app_postmessage_goto_maps_home';
const GO_TO_LAYOUTS_HOME = 'app_postmessage_goto_layouts_home';

// Sessions actions.
const OUTBOUND_REMOVE_RESERVATIONS = 'host_postmessage_remove_reservations';

// Seats report action.
const OUTBOUND_EVENT_ATTENDEES = 'host_postmessage_event_attendees';
const OUTBOUND_ATTENDEE_UPDATE = 'host_postmessage_attendee_update';
// EXTERNAL MODULE: external "tec.tickets.seating.ajax"
var external_tec_tickets_seating_ajax_ = __webpack_require__("lL5a");

// CONCATENATED MODULE: ./src/Tickets/Seating/app/service/api/message-handlers.js




/**
 * The default message handler that will be called when a message is received from the service.
 *
 * @since 5.16.0
 *
 * @param {MessageEvent} event The message event received from the service.
 *
 * @return {void}
 */
function defaultMessageHandler(event) {
  console.debug('Message received from service', event);
}

/**
 * Sends a POST request to the backend to invalidate the Maps and Layouts cache.
 *
 * @since 5.16.0
 *
 * @return {Promise<boolean>} A promise that will resolve to `true` if the request was successful, `false` otherwise.
 */
function invalidateMapsLayoutsCache() {
  return _invalidateMapsLayoutsCache.apply(this, arguments);
}

/**
 * Sends a POST request to the backend to invalidate the Layouts cache.
 *
 * @since 5.16.0
 *
 * @return {Promise<boolean>} A promise that will resolve to `true` if the request was successful, `false` otherwise.
 */
function _invalidateMapsLayoutsCache() {
  _invalidateMapsLayoutsCache = asyncToGenerator_default()(function* () {
    const url = new URL(external_tec_tickets_seating_ajax_["ajaxUrl"]);
    url.searchParams.set('_ajax_nonce', external_tec_tickets_seating_ajax_["ajaxNonce"]);
    url.searchParams.set('action', 'tec_tickets_seating_service_invalidate_maps_layouts_cache');
    const response = yield fetch(url.toString(), {
      method: 'POST'
    });
    if (response.status !== 200) {
      console.error('Invalidation of maps and layouts cache failed, clean the transients manually to fetch up-to-date maps and layouts from the service.');
      return false;
    }
    return true;
  });
  return _invalidateMapsLayoutsCache.apply(this, arguments);
}
function invalidateLayoutsCache() {
  return _invalidateLayoutsCache.apply(this, arguments);
}

/**
 * Fires when a Map is created or updated on the Service.
 *
 * @since 5.16.0
 *
 * @return {void}
 */
function _invalidateLayoutsCache() {
  _invalidateLayoutsCache = asyncToGenerator_default()(function* () {
    const url = new URL(external_tec_tickets_seating_ajax_["ajaxUrl"]);
    url.searchParams.set('_ajax_nonce', external_tec_tickets_seating_ajax_["ajaxNonce"]);
    url.searchParams.set('action', 'tec_tickets_seating_service_invalidate_layouts_cache');
    const response = yield fetch(url.toString(), {
      method: 'POST'
    });
    if (response.status !== 200) {
      console.error('Invalidation of layouts cache failed, clean the transients manually to fetch up-to-date layouts from the service.');
      return false;
    }
    return true;
  });
  return _invalidateLayoutsCache.apply(this, arguments);
}
function onMapCreatedUpdated() {
  invalidateMapsLayoutsCache();
}

/**
 * Fires when a Layout is created or updated on the Service.
 *
 * @since 5.16.0
 *
 * @return {void}
 */
function onLayoutCreatedUpdated() {
  invalidateLayoutsCache();
}

/**
 * Fires when a Seat type is created or updated on the Service.
 *
 * @since 5.16.0
 *
 * @return {void}
 */
function onSeatTypeCreatedUpdated() {
  invalidateLayoutsCache();
}

/**
 * On request to go to the Maps home from the Service, redirect to the Maps home.
 *
 * @since 5.16.0
 *
 * @return {void}
 */
function onGoToMapsHome() {
  if (!mapsHomeUrl) {
    console.error('Maps home url not found');
    return;
  }
  window.location.href = mapsHomeUrl;
}

/**
 * On request to go to the Layouts home from the Service, redirect to the Layouts home.
 *
 * @since 5.16.0
 *
 * @return {void}
 */
function onGoToLayoutsHome() {
  if (!layoutsHomeUrl) {
    console.error('Layouts home url not found');
    return;
  }
  window.location.href = layoutsHomeUrl;
}
// CONCATENATED MODULE: ./src/Tickets/Seating/app/service/api/state.js



/**
 * @typedef {Object} State
 * @property {boolean}                   ready                 Whether the connection is established.
 * @property {boolean}                   establishingReadiness Whether the connection is being established.
 * @property {Object.<string, Function>} actionsMap            The map of actions and their callbacks.
 * @property {string}                    token                 The token used to authenticate the connection.
 */

/*
 * @type {Object.<string, Function>}
 */
const defaultActionsMap = {
  default: defaultMessageHandler,
  [MAP_CREATED_UPDATED]: onMapCreatedUpdated,
  [LAYOUT_CREATED_UPDATED]: onLayoutCreatedUpdated,
  [SEAT_TYPE_CREATED_UPDATED]: onSeatTypeCreatedUpdated,
  [GO_TO_MAPS_HOME]: onGoToMapsHome,
  [GO_TO_LAYOUTS_HOME]: onGoToLayoutsHome
};

/**
 * @type {State}
 */
const state = {
  ready: false,
  establishingReadiness: false,
  actionsMap: defaultActionsMap,
  token: null
};

/**
 * Returns the handler for a given action, or the default handler if none is found.
 *
 * @since 5.16.0
 *
 * @param {string} action The action to get the handler for.
 *
 * @return {Function|null} The handler for the action, or the default handler if none is found.
 */
function getHandlerForAction(action) {
  return state.actionsMap[action] || state.actionsMap.default || defaultMessageHandler;
}

/**
 * Registers an action and its callback.
 *
 * @since 5.16.0
 *
 * @param {string}   action   The action to register the callback for.
 * @param {Function} callback The callback to register for the action.
 */
function registerAction(action, callback) {
  state.actionsMap[action] = callback;
}

/**
 * Removes an action and its callback form the actions map.
 *
 * @since 5.16.0
 *
 * @param {string} action The action to remove form the actions map.
 */
function removeAction(action) {
  delete state.actionsMap[action];
}

/**
 * Returns the actions map.
 *
 * @since 5.16.0
 *
 * @return {Object} The actions map.
 */
function getRegisteredActions() {
  return state.actionsMap;
}

/**
 * Sets the ready state of the Service.
 *
 * @since 5.16.0
 *
 * @param {boolean} isReady Whether the Service is ready or not.
 */
function setIsReady(isReady) {
  state.ready = isReady;
}

/**
 * Returns whether the Service is ready or not.
 *
 * @since 5.16.0
 *
 * @return {boolean} Whether the Service is ready or not.
 */
function getIsReady() {
  return state.ready;
}

/**
 * Sets whether the Service is establishing readiness or not.
 *
 * @since 5.16.0
 *
 * @param {boolean} establishingReadiness Whether the Service is establishing or not.
 */
function setEstablishingReadiness(establishingReadiness) {
  state.establishingReadiness = establishingReadiness;
}

/**
 * Returns whether the Service is establishing readiness or not.
 *
 * @since 5.16.0
 *
 * @return {boolean} Whether the Service is establishing readiness or not.
 */
function getEstablishingReadiness() {
  return state.establishingReadiness;
}

/**
 * Sets the token used to communicate with the service.
 *
 * @since 5.16.0
 *
 * @param {string} token The token to set.
 */
function setToken(token) {
  state.token = token;
}

/**
 * Returns the current ephemeral token used to communicate with the service.
 *
 * @since 5.16.0
 *
 * @return {string} The current ephemeral token.
 */
function getToken() {
  return state.token;
}

/**
 * Resets the state to its default values.
 *
 * This is useful for testing and should not be used in production.
 *
 * @since 5.16.0
 *
 * @return {void}
 */
function state_reset() {
  state.ready = false;
  state.establishingReadiness = false;
  state.actionsMap = defaultActionsMap;
  state.token = null;
}
// CONCATENATED MODULE: ./src/Tickets/Seating/app/service/api/index.js


function api_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function api_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? api_ownKeys(Object(t), !0).forEach(function (r) { defineProperty_default()(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : api_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
// Get the service base URL without the trailing slash.




/**
 * @type {[string, Function, MessageEvent][]}
 */
let handlerQueue = [];

/**
 * Posts a message to the service iframe.
 *
 * @since 5.16.0
 *
 * @param {HTMLIFrameElement} iframe The iframe to post the message to.
 * @param {string}            action The message action.
 * @param {*}                 data   The message data.
 *
 * @return {void}
 */
function sendPostMessage(iframe, action, data) {
  const token = iframe.closest('[data-token]').dataset.token;
  if (!token) {
    console.error('No token found in iframe element');
    return;
  }
  iframe.contentWindow.postMessage({
    action,
    token,
    data: data || null
  }, getBaseUrl());
}

/**
 * Calls the next wrapper handler in the queue.
 *
 * A "wrapper handler" is a handler that will execute its own code and call the next handler
 * in the queue or, if thenable, will resolve and then call the next handler.
 *
 * @since 5.16.0
 *
 * @return {void}
 */
function callNextHandler() {
  if (handlerQueue.length === 0) {
    return;
  }
  const [action, handler, event] = handlerQueue[0];
  const wrappedHandler = wrapHandlerForQueue(handler);
  wrappedHandler(event.data.data);
}

/**
 * Wraps a handler in a function that will call the next handler in the queue.
 *
 * Since all functions can be awaited, the wrapper will treat all functions as async functions.
 *
 * @since 5.16.0
 *
 * @param {Function} handler The handler to wrap.
 *
 * @return {Function} The wrapped handler.
 */
function wrapHandlerForQueue(handler) {
  return /*#__PURE__*/function () {
    var _ref = asyncToGenerator_default()(function* (data) {
      yield handler(data);
      // Remove the first handler, this, from the queue.
      handlerQueue.shift();
      callNextHandler();
    });
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
}

/**
 * The function used to handle the messages received from the service.
 *
 * All messages that not conform to the expected format, or not contain the
 * required data, will be ignored.
 * Handlers are called based on the `state.actionsMap` map that is controlled
 * using the `takeAction` and `takeEveryAction` functions.
 *
 * @since 5.16.0
 *
 * @param {MessageEvent} event The message event received from the service.
 */
function catchMessage(event) {
  if (!(event.origin === getBaseUrl() && event.data.token && event.data.token === getToken())) {
    return;
  }
  const action = event.data.action;
  if (!action) {
    console.error('No action found in message');
    return;
  }
  const handler = getHandlerForAction(action);
  handlerQueue.push([action, handler, event]);
  if (handlerQueue.length > 1) {
    // The handler will have to wait for the previous ones to finish.
    return;
  }

  // Immediately call the handler.
  callNextHandler();
}

/**
 * Listens for service messages.
 *
 * @since 5.16.0
 *
 * @param {HTMLIFrameElement} iframe The iframe to listen for messages from.
 *
 * @return {void}
 */
function startListeningForServiceMessages(iframe) {
  const tokenProvider = iframe.closest('[data-token]');
  if (!tokenProvider) {
    console.error('No token provider found in iframe element');
    return;
  }
  const token = tokenProvider.dataset.token;
  if (!token) {
    console.error('No token found in token provider element');
    return;
  }
  setToken(token);
  window.addEventListener('message', catchMessage);
}

/**
 * Starts the process of establishing the connection with the service through the iframe.
 *
 * The connection is initiated by the Service by sending a `app_postmessage_ready` message through the iframe.
 * The Site will reply with a `host_postmessage_ready` message to confirm the connection is established.
 *
 * @since 5.16.0
 *
 * @param {HTMLIFrameElement} iframe The iframe to establish the connection with the service.
 *
 * @return {Promise<void>} A promise that will be resolved when the connection is established.
 */
function establishReadiness(_x2) {
  return _establishReadiness.apply(this, arguments);
}

/**
 * Returns the handler queue for the service.
 *
 * @since 5.16.0
 *
 * @return {Object<string, Function>} The handler queue for the service.
 */
function _establishReadiness() {
  _establishReadiness = asyncToGenerator_default()(function* (iframe) {
    // Before setting the iframe source, start listening for messages from the service.
    startListeningForServiceMessages(iframe);
    let promiseReject;

    // Build a promise that will resolve when the Service sends the ready message.
    const promise = new Promise((resolve, reject) => {
      promiseReject = reject;
      const acknowledge = () => {
        removeAction(INBOUND_APP_READY);
        setIsReady(true);
        setEstablishingReadiness(false);

        // Acknowledge the readiness, do not wait for a reply.
        sendPostMessage(iframe, OUTBOUND_HOST_READY);

        // Readiness is established, clear the timeout.
        clearTimeout(timeoutId);
        console.debug('Readiness established.');
        resolve();
      };

      // When the ready message from the service is received, acknowledge the readiness, resolve the promise.
      registerAction(INBOUND_APP_READY, acknowledge);
    });

    // Seat a 3s timeout to reject the promise if the connection is not established.
    const timeoutId = setTimeout(() => {
      promiseReject(new Error('Connection to service timed out'));
    }, 3000);

    // Finally start loading the service in the iframe and wait for its ready message.
    iframe.src = iframe.dataset.src;
    return promise;
  });
  return _establishReadiness.apply(this, arguments);
}
function getHandlerQueue() {
  return handlerQueue;
}

/**
 * Empties the handler queue.
 *
 * @since 5.16.0
 *
 * @return {void}
 */
function emptyHandlerQueue() {
  handlerQueue = [];
}

/**
 * Returns the associated events URL for the given layout ID.
 *
 * @since 5.16.0
 *
 * @param {string} layoutId The layout ID.
 *
 * @return {string} The associated events URL for the given layout ID.
 */
function getAssociatedEventsUrl(layoutId) {
  return layoutId ? `${associatedEventsUrl}&layout=${layoutId}` : associatedEventsUrl;
}

// Re-export some functions from the state module.

window.tec = window.tec || {};
window.tec.tickets.seating = window.tec.tickets.seating || {};
window.tec.tickets.seating.service = window.tec.tickets.seating.service || {};
window.tec.tickets.seating.service.api = api_objectSpread(api_objectSpread({}, window.tec.tickets.seating.service.api || {}), {}, {
  INBOUND_APP_READY: INBOUND_APP_READY,
  INBOUND_APP_READY_FOR_DATA: INBOUND_APP_READY_FOR_DATA,
  INBOUND_SEATS_SELECTED: INBOUND_SEATS_SELECTED,
  INBOUND_SET_ELEMENT_HEIGHT: INBOUND_SET_ELEMENT_HEIGHT,
  OUTBOUND_EVENT_ATTENDEES: OUTBOUND_EVENT_ATTENDEES,
  OUTBOUND_HOST_READY: OUTBOUND_HOST_READY,
  OUTBOUND_REMOVE_RESERVATIONS: OUTBOUND_REMOVE_RESERVATIONS,
  OUTBOUND_SEAT_TYPE_TICKETS: OUTBOUND_SEAT_TYPE_TICKETS,
  OUTBOUND_ATTENDEE_UPDATE: OUTBOUND_ATTENDEE_UPDATE,
  RESERVATIONS_DELETED: RESERVATIONS_DELETED,
  RESERVATIONS_UPDATED: RESERVATIONS_UPDATED,
  RESERVATIONS_UPDATED_FOLLOWING_SEAT_TYPES: RESERVATIONS_UPDATED_FOLLOWING_SEAT_TYPES,
  SEAT_TYPES_UPDATED: SEAT_TYPES_UPDATED,
  SEAT_TYPE_DELETED: SEAT_TYPE_DELETED,
  GO_TO_ASSOCIATED_EVENTS: GO_TO_ASSOCIATED_EVENTS,
  RESERVATION_UPDATED: RESERVATION_UPDATED,
  RESERVATION_CREATED: RESERVATION_CREATED,
  establishReadiness,
  getHandlerForAction: getHandlerForAction,
  getHandlerQueue,
  getRegisteredActions: getRegisteredActions,
  getToken: getToken,
  registerAction: registerAction,
  removeAction: removeAction,
  sendPostMessage,
  startListeningForServiceMessages,
  getAssociatedEventsUrl
});
// EXTERNAL MODULE: external "tec.tickets.seating.service.notices"
var external_tec_tickets_seating_service_notices_ = __webpack_require__("Td2k");

// CONCATENATED MODULE: ./src/Tickets/Seating/app/service/iframe.js


function iframe_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function iframe_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? iframe_ownKeys(Object(t), !0).forEach(function (r) { defineProperty_default()(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : iframe_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }


const {
  _x: iframe_x
} = wp.i18n;

/**
 * Initializes the iframe, by establishing readiness and listening for messages.
 *
 * @param {Element} iframe The iframe element to initialize.
 * @return {Promise<boolean>} A promise that resolves to true if the iframe is ready to communicate with the service.
 */
function init(_x2) {
  return _init.apply(this, arguments);
}
/**
 * Returns the first iframe element in the document.
 *
 * @since 5.16.0
 *
 * @param {HTMLDocument|null} dom The document to use to get the iframe element.
 *
 * @return {Element|null} The first iframe element in the document, or `null` if there is none.
 */
function _init() {
  _init = asyncToGenerator_default()(function* (iframe) {
    if (!iframe) {
      return false;
    }
    const container = iframe.closest('.tec-tickets-seating__iframe-container');
    if (!container) {
      return false;
    }
    const token = container.dataset.token;
    if (!token) {
      const defaultMessage = iframe_x('Ephemeral token not found in iframe element.', 'Error message', 'event-tickets');
      const error = container.dataset.error || defaultMessage;
      Object(external_tec_tickets_seating_service_notices_["notifyUserOfError"])(error);
      return false;
    }

    // Wait for the iframe readiness to be established.
    yield establishReadiness(iframe);
    return true;
  });
  return _init.apply(this, arguments);
}
function getIframeElement(dom) {
  dom = dom || document;
  return dom.querySelector('.tec-tickets-seating__iframe-container iframe');
}

/**
 * Initializes the service iframe document.
 *
 * @param {Element} iframe The iframe element to initialize.
 *
 * @return {Promise<Element>} A promise that resolves to the initialized iframe element.
 */
function initServiceIframe(_x3) {
  return _initServiceIframe.apply(this, arguments);
}

/**
 * @typedef {Object} ResizeData
 * @property {number} height The new height.
 */

/**
 * Handles resize requests.
 *
 * @since 5.16.0
 *
 * @param {ResizeData} data The new height.
 * @param {HTMLDocument|null} dom The document to use to search for the iframe element.
 */
function _initServiceIframe() {
  _initServiceIframe = asyncToGenerator_default()(function* (iframe) {
    yield init(iframe);
    return iframe;
  });
  return _initServiceIframe.apply(this, arguments);
}
function handleResize(data, dom) {
  const iframe = getIframeElement(dom);
  iframe.style.height = data.height + 'px';
}
window.tec = window.tec || {};
window.tec.tickets.seating = window.tec.tickets.seating || {};
window.tec.tickets.seating.service = window.tec.tickets.seating.service || {};
window.tec.tickets.seating.service.iframe = iframe_objectSpread(iframe_objectSpread({}, window.tec.tickets.seating.service.iframe || {}), {}, {
  getIframeElement,
  initServiceIframe,
  handleResize
});
// CONCATENATED MODULE: ./src/Tickets/Seating/app/service/index.js





/***/ }),

/***/ "MsaN":
/***/ (function(module, exports) {

module.exports = tec.tickets.seating.utils;

/***/ }),

/***/ "Td2k":
/***/ (function(module, exports) {

module.exports = tec.tickets.seating.service.notices;

/***/ }),

/***/ "lL5a":
/***/ (function(module, exports) {

module.exports = tec.tickets.seating.ajax;

/***/ })

/******/ });