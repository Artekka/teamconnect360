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
/******/ 		10: 0
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
/******/ 	deferredModules.push(["A9IG",0]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "A9IG":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "checkoutControlsSelectors", function() { return /* binding */ checkoutControlsSelectors; });
__webpack_require__.d(__webpack_exports__, "setIsInterruptable", function() { return /* binding */ setIsInterruptable; });
__webpack_require__.d(__webpack_exports__, "isInterruptable", function() { return /* binding */ isInterruptable; });
__webpack_require__.d(__webpack_exports__, "isExpired", function() { return /* binding */ isExpired; });
__webpack_require__.d(__webpack_exports__, "isStarted", function() { return /* binding */ isStarted; });
__webpack_require__.d(__webpack_exports__, "findTimerData", function() { return /* binding */ findTimerData; });
__webpack_require__.d(__webpack_exports__, "beaconInterrupt", function() { return /* binding */ beaconInterrupt; });
__webpack_require__.d(__webpack_exports__, "syncWithBackend", function() { return /* binding */ syncWithBackend; });
__webpack_require__.d(__webpack_exports__, "start", function() { return /* binding */ start; });
__webpack_require__.d(__webpack_exports__, "reset", function() { return /* binding */ session_reset; });
__webpack_require__.d(__webpack_exports__, "pause", function() { return /* binding */ pause; });
__webpack_require__.d(__webpack_exports__, "pauseToCheckout", function() { return /* binding */ pauseToCheckout; });
__webpack_require__.d(__webpack_exports__, "resume", function() { return /* binding */ resume; });
__webpack_require__.d(__webpack_exports__, "setTargetDom", function() { return /* binding */ setTargetDom; });
__webpack_require__.d(__webpack_exports__, "syncOnLoad", function() { return /* binding */ syncOnLoad; });
__webpack_require__.d(__webpack_exports__, "watchCheckoutControls", function() { return /* binding */ watchCheckoutControls; });
__webpack_require__.d(__webpack_exports__, "getWatchedCheckoutControls", function() { return /* binding */ getWatchedCheckoutControls; });
__webpack_require__.d(__webpack_exports__, "setHealthcheckLoopId", function() { return /* binding */ setHealthcheckLoopId; });
__webpack_require__.d(__webpack_exports__, "getHealthcheckTimeoutId", function() { return /* binding */ getHealthcheckTimeoutId; });
__webpack_require__.d(__webpack_exports__, "getCountdownTimeoutId", function() { return /* binding */ getCountdownTimeoutId; });
__webpack_require__.d(__webpack_exports__, "getResumeTimeoutId", function() { return /* binding */ getResumeTimeoutId; });

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__("lSNA");
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("yXPU");
var asyncToGenerator_default = /*#__PURE__*/__webpack_require__.n(asyncToGenerator);

// CONCATENATED MODULE: ./src/Tickets/Seating/app/frontend/session/localized-data.js
/**
 * @typedef {Object} LocalizedTimerData
 * @property {string} ajaxUrl                   The URL to the service iframe.
 * @property {string} ajaxNonce                 The AJAX nonce.
 * @property {number} checkoutGraceTime         The grace time, in seconds, given to a user to complete the checkout.
 * @property {string} ACTION_START              The action to start the timer.
 * @property {string} ACTION_SYNC               The action to sync the timer with the backend.
 * @property {string} ACTION_INTERRUPT_GET_DATA The action to get the data required to render the redirection modal.
 * @property {string} ACTION_PAUSE_TO_CHECKOUT  The action to signal the backend we're pausing the timer to checkout.
 * @property {string} TICKETS_BLOCK_DIALOG_NAME The name of the dialog element used to render the seat selection modal.
 */

/**
 * @type {LocalizedTimerData}
 */
const localizedData = tec.tickets.seating.frontend.session;
// EXTERNAL MODULE: ./src/Tickets/Seating/app/frontend/session/style.pcss
var style = __webpack_require__("lo4d");

// EXTERNAL MODULE: external "wp.hooks"
var external_wp_hooks_ = __webpack_require__("g56x");

// EXTERNAL MODULE: external "tec.tickets.seating.utils"
var external_tec_tickets_seating_utils_ = __webpack_require__("MsaN");

// CONCATENATED MODULE: ./src/Tickets/Seating/app/frontend/session/interrupt-dialog-component.js


/**
 * @typedef {Object} InterruptDialogComponentProps
 * @property {string} dataJs      The data-js attribute to use for the dialog content.
 * @property {string} title       The title of the modal.
 * @property {string} content     The content of the modal.
 * @property {string} redirectUrl The URL to redirect the user to when the timer expires.
 */

/**
 * Builds and returns the interrupt dialog component.
 *
 * @since 5.16.0
 *
 * @param {InterruptDialogComponentProps} props The props to use to build the component.
 *
 * @return {HTMLElement|null} The interrupt dialog component, or `null` if the
 *                             template counld not be found or the element could not be created.
 */
function InterruptDialogComponent(props) {
  return Object(external_tec_tickets_seating_utils_["createHtmlComponentFromTemplateString"])(`<script
		id="tec-tickets-seating-interrupt-dialog-template"
		type="text/template"
		data-js="{dataJs}"
	>
		<div class="tribe-tickets-seating__interrupt-dialog" role="dialog">
			<div class="tribe-tickets-seating__interrupt-header">
				<div class="dashicons dashicons-clock"></div>
				<div class="tribe-tickets-seating__interrupt-title">{title}</div>
			</div>
			<div class="tribe-dialog__content tribe-modal__content tribe-tickets-seating__interrupt-content">{content}</div>
			<div class="tribe-tickets-seating__interrupt-footer">
				<button
					type="button"
					onclick="window.location.href='{redirectUrl}'"
					class="tribe-common-c-btn tribe-common-c-btn--small"
				>
					{buttonLabel}
				</button>
		</div>
	</script>`, props);
}
// EXTERNAL MODULE: external "wp.i18n"
var external_wp_i18n_ = __webpack_require__("l3Sj");

// CONCATENATED MODULE: ./src/Tickets/Seating/app/frontend/session/index.js


function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { defineProperty_default()(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }






const {
  ajaxUrl,
  ajaxNonce,
  checkoutGraceTime,
  ACTION_START,
  ACTION_SYNC,
  ACTION_INTERRUPT_GET_DATA,
  ACTION_PAUSE_TO_CHECKOUT
} = localizedData;

/**
 * The selector used to find the timer elements on the page.
 *
 * @since 5.16.0
 *
 * @type {string}
 */
const selector = '.tec-tickets-seating__timer';

/**
 * The class name that, applied to the timer elements, will hide them.
 *
 * @since 5.16.0
 *
 * @type {string}
 */
const hiddenClassName = 'tec-tickets-seating__timer--hidden';

/**
 * The ID of the countdown loop that will update the timer every second.
 *
 * @since 5.16.0
 *
 * @type {?number}
 */
let countdownTimeoutId = null;

/**
 * The ID of the health check loop that will sync the timer with the backend every minute.
 *
 * @since 5.16.0
 *
 * @type {?number}
 */
let healthCheckTimeoutId = null;

/**
 * The ID of the resume loop that will resume the timer after a pause.
 *
 * @since 5.16.0
 *
 * @type {?number}
 */
let resumeTimeoutId = null;

/**
 * Whether the timer has been started or not.
 *
 * @since 5.16.0
 *
 * @type {boolean}
 */
let started = false;

/**
 * Whether the timer is currently interruptable or not.
 *
 * @since 5.16.0
 *
 * @type {boolean}
 */
let interruptable = true;

/**
 * Whether the timer has expired or not.
 *
 * @since 5.16.0
 *
 * @type {boolean}
 */
let expired = false;

/**
 * The interrupt dialog HTML element.
 *
 * @since 5.16.0
 *
 * @type {HTMLElement|null}
 */
let interruptDialogElement = null;

/**
 * The document element that should be targeted by the module.
 * Defaults to the document.
 *
 * @since 5.16.0
 *
 * @type {HTMLElement}
 */
let targetDom = document;

/**
 * The list of checkout controls that are being watched.
 *
 * @since 5.16.0
 *
 *
 * @type {HTMLElement[]} the list of checkout controls that are being watched.
 */
let watchedCheckoutControls = [];

/**
 * The selectors used to find the checkout controls on the page.
 *
 * @since 5.16.0
 *
 * @type {string[]}
 */
const checkoutControlsSelectors = ['.tribe-tickets__commerce-checkout-form-submit-button', '.tribe-tickets__commerce-checkout-paypal-buttons button'];

/**
 * Sets the interruptable flag.
 *
 * @since 5.16.0
 *
 * @param {boolean} interruptableFlag The interruptable flag.
 */
function setIsInterruptable(interruptableFlag) {
  interruptable = interruptableFlag;
}

/**
 * Returns the interruptable flag.
 *
 * @since 5.16.0
 *
 * @return {boolean} Whether the timer is currently interruptable or not.
 */
function isInterruptable() {
  return interruptable;
}

/**
 * Sets the expired flag.
 *
 * @since 5.16.0
 *
 * @param {boolean} expiredFlag The expired flag.
 */
function setIsExpired(expiredFlag) {
  expired = expiredFlag;
}

/**
 * Returns the expired flag.
 *
 * @since 5.16.0
 *
 * @return {boolean} Whether the timer has expired or not.
 */
function isExpired() {
  return expired;
}

/**
 * Sets the started flag.
 *
 * @since 5.16.0
 *
 * @param {boolean} startedFlag The started flag.
 */
function setIsStarted(startedFlag) {
  started = startedFlag;
}

/**
 * Returns the started flag.
 *
 * @since 5.16.0
 *
 * @return {boolean} Whether the timer has been started or not.
 */
function isStarted() {
  return started;
}

/**
 * @typedef {Object} TimerData
 * @property {number} postId      The post ID of the post to purchase tickets for.
 * @property {string} token       The ephemeral token used to secure the iframe communication with the service.
 * @property {string} redirectUrl The URL to redirect the user to when the timer expires.
 */

/**
 * Returns all the timer elements on the page.
 *
 * @since 5.16.0
 *
 * @return {NodeList<HTMLElement>} All the timer elements on the page.
 */
function getTimerElements() {
  return targetDom.querySelectorAll(selector);
}

/**
 * Finds and returns the data attached to the first valid timer element on the page.
 *
 * Note: multiple timer elements with different datasets are not supported, this function
 * will find the first timer element providing all the required data and return its data.
 *
 * @return {TimerData|null} The data attached to the first valid timer element on the page, or `null` if no
 *                          timer element is found.
 */
function findTimerData() {
  const sourceTimerElements = getTimerElements();
  if (sourceTimerElements.length === 0) {
    return null;
  }
  let token = null;
  let postId = null;
  let redirectUrl = null;
  Array.from(sourceTimerElements).find(timerElement => {
    if (timerElement.dataset.token && timerElement.dataset.postId && timerElement.dataset.redirectUrl) {
      token = timerElement.dataset.token;
      postId = timerElement.dataset.postId;
      redirectUrl = timerElement.dataset.redirectUrl;
      return true;
    }
    return false;
  });
  if (!(token && postId && redirectUrl)) {
    return null;
  }
  return {
    token,
    postId,
    redirectUrl
  };
}

/**
 * @typedef {Object} TimerStartData
 * @property {number} secondsLeft The number of seconds left in the timer.
 * @property {number} timestamp   The timestamp of the timer start including microseconds.
 */

/**
 * Sets the minutes and seconds of the timer.
 *
 * @since 5.16.0
 *
 * @param {HTMLElement} timerElement The timer element to set the minutes and seconds for..
 * @param {number}      minutes
 * @param {number}      seconds
 */
function setTimerTimeLeft(timerElement, minutes, seconds) {
  timerElement.classList.remove(hiddenClassName);
  const minutesElement = timerElement.querySelector('.tec-tickets-seating__time-minutes');
  const secondsElement = timerElement.querySelector('.tec-tickets-seating__time-seconds');
  if (!minutesElement || !secondsElement) {
    return;
  }
  minutesElement.innerText = minutes;
  secondsElement.innerText = String(seconds).padStart(2, '0');
}

/**
 * @typedef {Object} InterruptModalData
 * @property {string} title       The title of the modal.
 * @property {string} content     The content of the modal.
 * @property {string} redirectUrl The URL to redirect the user to when the timer expires.
 */

/**
 * Fetches the data required to render the correct timer expiration modal on the frontend.
 *
 * @since 5.16.0
 *
 * @return {Promise<InterruptModalData>} The data required to render the correct timer expiration modal on the frontend.
 */
function fetchInterruptModalData() {
  return _fetchInterruptModalData.apply(this, arguments);
}
/**
 * Returns  the interrupt dialog element.
 *
 * @since 5.16.0
 *
 * @return {A11yDialog|null} Either the interrupt dialog element or `null` if it could not be found.
 */
function _fetchInterruptModalData() {
  _fetchInterruptModalData = asyncToGenerator_default()(function* () {
    const {
      postId,
      token
    } = findTimerData();
    const requestUrl = new URL(ajaxUrl);
    requestUrl.searchParams.set('_ajaxNonce', ajaxNonce);
    requestUrl.searchParams.set('action', ACTION_INTERRUPT_GET_DATA);
    requestUrl.searchParams.set('postId', postId);
    requestUrl.searchParams.set('token', token);
    const response = yield fetch(requestUrl.toString(), {
      method: 'GET'
    });
    const defaultData = {
      title: Object(external_wp_i18n_["_x"])('Time limit expired', 'Seat selection expired timer title', 'event-tickets'),
      content: Object(external_wp_i18n_["_x"])('Your seat selections are no longer reserved, but tickets are still available.', 'Seat selection expired timer content', 'event-tickets'),
      buttonLabel: Object(external_wp_i18n_["_x"])('Find Seats', 'Seat selection expired timer button label', 'event-tickets'),
      redirectUrl: window.location.href
    };
    if (!response.ok) {
      console.error('Failed to fetch interrupt modal data');
      return defaultData;
    }
    const responseJson = yield response.json();
    if (!(responseJson.success && responseJson.data)) {
      console.error('Failed to fetch interrupt modal data');
      return defaultData;
    }
    return {
      title: responseJson.data.title || defaultData.title,
      content: responseJson.data.content || defaultData.content,
      buttonLabel: responseJson.data.buttonLabel || defaultData.buttonLabel,
      redirectUrl: responseJson.data.redirectUrl || defaultData.redirectUrl
    };
  });
  return _fetchInterruptModalData.apply(this, arguments);
}
function getInterruptDialogElement() {
  return _getInterruptDialogElement.apply(this, arguments);
}
/**
 * Interrupts the user triggering the user flow redirection when the time is up.
 *
 * @since 5.16.0
 *
 * @return {void} The timer is interrupted.
 */
function _getInterruptDialogElement() {
  _getInterruptDialogElement = asyncToGenerator_default()(function* () {
    var _getTimerElements;
    const firstTimerElement = (_getTimerElements = getTimerElements()) === null || _getTimerElements === void 0 ? void 0 : _getTimerElements[0];
    if (!firstTimerElement) {
      console.warn('No timer element found');
      return null;
    }
    const dialogDataJSAttribute = 'dialog-content-tec-tickets-seating-timer-interrupt';
    const {
      title,
      content,
      buttonLabel,
      redirectUrl
    } = yield fetchInterruptModalData();

    // The `A11yDialog` library will read this data attribute to find the dialog element..
    firstTimerElement.dataset.content = dialogDataJSAttribute;

    // By default, attach the dialog to the first timer element.
    let appendTarget = '.tec-tickets-seating__timer';

    // Are we rendering inside another dialog?
    const dialogParent = firstTimerElement.closest('.tribe-dialog');
    if (dialogParent) {
      // If the timer element is being rendered in the context of a dialog, then attach the dialog to that dialog parent.
      appendTarget = '.tribe-tickets__tickets-form, .tec-tickets-seating__tickets-block';
    }
    if (!interruptDialogElement) {
      var _targetDom$querySelec;
      interruptDialogElement = InterruptDialogComponent({
        dataJs: dialogDataJSAttribute,
        title,
        content,
        buttonLabel,
        redirectUrl
      });
      (_targetDom$querySelec = targetDom.querySelector(appendTarget)) === null || _targetDom$querySelec === void 0 || _targetDom$querySelec.appendChild(interruptDialogElement);
    }

    // @see tec-a11y-dialog.js in Common.
    return new A11yDialog({
      trigger: '.tec-tickets-seating__timer',
      appendTarget,
      wrapperClasses: 'tribe-dialog',
      overlayClasses: 'tribe-dialog__overlay tribe-modal__overlay',
      contentClasses: 'tribe-dialog__wrapper tribe-tickets-seating__interrupt-wrapper',
      overlayClickCloses: false
    });
  });
  return _getInterruptDialogElement.apply(this, arguments);
}
function interrupt() {
  return _interrupt.apply(this, arguments);
}
/**
 * Sends a beacon to the backend to interrupt the user flow.
 *
 * @since 5.16.0
 *
 * @return {void} The timer is interrupted.
 */
function _interrupt() {
  _interrupt = asyncToGenerator_default()(function* () {
    if (!isInterruptable()) {
      return true;
    }
    setIsInterruptable(true);
    getTimerElements().forEach(timerElement => {
      setTimerTimeLeft(timerElement, 0, 0);
    });
    setIsExpired(true);
    clearTimeout(countdownTimeoutId);
    countdownTimeoutId = null;
    clearTimeout(healthCheckTimeoutId);
    healthCheckTimeoutId = null;
    const interruptDialog = yield getInterruptDialogElement();

    /**
     * Fires to trigger an interruption of the user flow due to the timer expiring.
     *
     * @since 5.16.0
     */
    Object(external_wp_hooks_["doAction"])('tec.tickets.seating.timer_interrupt');
    if (interruptDialog) {
      interruptDialog.show();
      // This is a  hack to prevent the user from being able to dismiss or close the dialog.
      interruptDialog.shown = false;
    }
    setIsInterruptable(false);
  });
  return _interrupt.apply(this, arguments);
}
function beaconInterrupt() {
  if (!isInterruptable()) {
    return;
  }
  const {
    postId,
    token
  } = findTimerData();
  const requestUrl = new URL(ajaxUrl);
  requestUrl.searchParams.set('_ajaxNonce', ajaxNonce);
  requestUrl.searchParams.set('action', ACTION_INTERRUPT_GET_DATA);
  requestUrl.searchParams.set('postId', postId);
  requestUrl.searchParams.set('token', token);
  window.navigator.sendBeacon(requestUrl.toString());
}

/**
 * Starts the loop that will recursively update the timer(s) every second.
 *
 * @since 5.16.0
 *
 * @param {number} secondsLeft The number of seconds left in the timer.
 *
 * @return {void}
 */
function startCountdownLoop(secondsLeft) {
  if (secondsLeft <= 0) {
    interrupt();
    return;
  }
  setIsStarted(true);
  countdownTimeoutId = setTimeout(() => {
    secondsLeft -= 1;
    getTimerElements().forEach(timerElement => {
      setTimerTimeLeft(timerElement, Math.floor(secondsLeft / 60), secondsLeft % 60);
    });
    if (!isExpired()) {
      startCountdownLoop(secondsLeft);
    }
  }, 1000);
}

/**
 * Starts a loop to sync the timer with the backend every minute.
 *
 * @since 5.16.0
 *
 * @return {void}
 */
function startHealthCheckLoop() {
  if (isExpired()) {
    return;
  }
  healthCheckTimeoutId = setTimeout(/*#__PURE__*/asyncToGenerator_default()(function* () {
    yield syncWithBackend();
    startHealthCheckLoop();
  }), 3 * 1000);
}

/**
 * Sends a request to the backend to get the timer's seconds left.
 *
 * If the seconds left is less than or equal to 0, the interruption logic will be triggered.
 *
 * @since 5.16.0
 *
 * @return {Promise<void>} A promise that will resolve when the request is completed.
 */
function syncWithBackend() {
  return _syncWithBackend.apply(this, arguments);
}

/**
 * Sends a request to the backend to either start or sync the timer.
 *
 * @since 5.16.0
 *
 * @param {ACTION_START|ACTION_SYNC} action The action to send to the backend.
 *
  @return {Promise<number|boolean>} A promise that will resolve to the number of seconds left
 *                                  in the timer or `false` if the request failed.
 */
function _syncWithBackend() {
  _syncWithBackend = asyncToGenerator_default()(function* () {
    if (isExpired() || getTimerElements().length === 0) {
      return;
    }
    const secondsLeft = yield requestToBackend(ACTION_SYNC);
    if (secondsLeft <= 0) {
      interrupt();
      return;
    }
    if (countdownTimeoutId) {
      clearTimeout(countdownTimeoutId);
      countdownTimeoutId = null;
    }
    startCountdownLoop(secondsLeft);
    if (!healthCheckTimeoutId) {
      startHealthCheckLoop();
    }
  });
  return _syncWithBackend.apply(this, arguments);
}
function requestToBackend(_x2) {
  return _requestToBackend.apply(this, arguments);
}
/**
 * Starts the seat selection timer on the backend and frontend of the site.
 *
 * @since 5.16.0
 *
 * @return {Promise<void>} A Promise that resolves when the timer is started.
 */
function _requestToBackend() {
  _requestToBackend = asyncToGenerator_default()(function* (action) {
    const timerData = findTimerData();
    if (timerData === null) {
      return false;
    }
    if ([ACTION_START, ACTION_SYNC, ACTION_PAUSE_TO_CHECKOUT].indexOf(action) === -1) {
      return false;
    }
    const requestUrl = new URL(ajaxUrl);
    requestUrl.searchParams.set('_ajaxNonce', ajaxNonce);
    requestUrl.searchParams.set('action', action);
    requestUrl.searchParams.set('token', timerData.token);
    requestUrl.searchParams.set('postId', timerData.postId);
    const response = yield fetch(requestUrl.toString(), {
      method: 'POST'
    });
    if (!response.ok) {
      return false;
    }
    const responseJson = yield response.json();
    if (!(responseJson.success && responseJson.data.secondsLeft && responseJson.data.timestamp)) {
      console.error('Failed to communicate with the backend');
      return false;
    }

    /**
     * @typedef {Object} StartTimerResponse
     * @property {number} secondsLeft The number of seconds left in the timer.
     * @property {number} timestamp   The timestamp of the timer start as a Unix timestamp with microseconds.
     *                                This is what the PHP function `microtime` returns.
     */

    /**
     * @type {StartTimerResponse}
     */
    const startTimerResponse = responseJson.data;

    /*
     * The browser and the backend might not produce the same exact time.
     * Do not allow the time to increase due to the browser's inaccuracy.
     */
    return startTimerResponse.secondsLeft - Math.max(0, Math.floor(startTimerResponse.timestamp - Date.now() / 1000));
  });
  return _requestToBackend.apply(this, arguments);
}
function start() {
  return _start.apply(this, arguments);
}

/**
 * Resets the timer cancelling any pending countdown and health check loops and setting the started flag to false.
 *
 * @since 5.16.0
 *
 * @return {void} The timer is reset.
 */
function _start() {
  _start = asyncToGenerator_default()(function* () {
    if (setIsStarted() || getTimerElements().length === 0) {
      return;
    }
    const secondsLeft = yield requestToBackend(ACTION_START);
    const {
      postId,
      token
    } = findTimerData();
    if (!(secondsLeft && postId && token)) {
      // The timer could not be started, communication with the backend failed. Restart the flow.
      interrupt();
      return;
    }
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    getTimerElements().forEach(timerElement => {
      setTimerTimeLeft(timerElement, minutes, seconds);
    });
    setIsStarted(true);
    startCountdownLoop(secondsLeft);
    startHealthCheckLoop();
  });
  return _start.apply(this, arguments);
}
function session_reset() {
  if (countdownTimeoutId) {
    clearTimeout(countdownTimeoutId);
  }
  if (healthCheckTimeoutId) {
    clearTimeout(healthCheckTimeoutId);
  }
  if (resumeTimeoutId) {
    clearTimeout(resumeTimeoutId);
  }
  started = false;
  expired = false;
  healthCheckTimeoutId = null;
  countdownTimeoutId = null;
  resumeTimeoutId = null;
  interruptable = true;
  stopWatchingCheckoutControls();
}

/**
 * Postpones the healthcheck that will sync with the backend resetting its timer.
 *
 * @since 5.16.0
 * @since 5.17.0 Added the `resumeInSeconds` parameter.
 *
 * @param {number} resumeInSeconds The amount of seconds after which the timer should resume. `0` to not resume.
 *
 * @return {void}
 */
function pause(resumeInSeconds) {
  // By default, do not resume.
  resumeInSeconds = resumeInSeconds || 0;
  setIsInterruptable(false);
  if (healthCheckTimeoutId) {
    // Pause the healthcheck loop.
    clearTimeout(healthCheckTimeoutId);
    healthCheckTimeoutId = null;
  }
  if (countdownTimeoutId) {
    // Pause the countdown loop.
    clearTimeout(countdownTimeoutId);
    countdownTimeoutId = null;
  }
  if (!resumeInSeconds) {
    return;
  }

  // Postpone the healthcheck for 60 seconds.
  resumeTimeoutId = setTimeout(resume, resumeInSeconds * 1000);
}

/**
 * Postpones the healthcheck that will sync with the backend resetting its timer for the purpose of
 * giving the user time to checkout.
 *
 * @since 5.17.0
 *
 * @return {Promise<void>} A promise that will resolve when the backend received the signal and the timer paused.
 */
function pauseToCheckout() {
  return _pauseToCheckout.apply(this, arguments);
}

/**
 * Resumes the timer from a pause.
 *
 * @since 5.16.0
 *
 * @return {void} The timer is resumed.
 */
function _pauseToCheckout() {
  _pauseToCheckout = asyncToGenerator_default()(function* () {
    const secondsLeft = yield requestToBackend(ACTION_PAUSE_TO_CHECKOUT);
    if (secondsLeft <= 0) {
      interrupt();
      return;
    }
    pause(checkoutGraceTime);
  });
  return _pauseToCheckout.apply(this, arguments);
}
function resume() {
  return _resume.apply(this, arguments);
}

/**
 * Sets the DOM to initialize the timer(s) in.
 *
 * Defaults to the document.
 *
 * @since 5.16.0
 *
 * @param {HTMLElement} targetDocument The DOM to initialize the timer(s) in.
 */
function _resume() {
  _resume = asyncToGenerator_default()(function* () {
    if (resumeTimeoutId) {
      clearTimeout(resumeTimeoutId);
      resumeTimeoutId = null;
    }
    setIsInterruptable(true);
    yield syncWithBackend();
  });
  return _resume.apply(this, arguments);
}
function setTargetDom(targetDocument) {
  targetDom = targetDocument || document;
}

/**
 * Syncs the timer with the backend on DOM ready.
 *
 * @since 5.16.0
 *
 * @return {void} The timer is synced.
 */
function syncOnLoad() {
  return _syncOnLoad.apply(this, arguments);
}

/**
 * Watches for the checkout controls to be clicked or submitted and postpones the healthcheck.
 *
 * @since 5.16.0
 *
 * @return {void}
 */
function _syncOnLoad() {
  _syncOnLoad = asyncToGenerator_default()(function* () {
    const syncTimerElements = Array.from(getTimerElements()).filter(syncTimerElement => {
      return 'syncOnLoad' in syncTimerElement.dataset;
    });
    if (syncTimerElements.length === 0) {
      return;
    }
    setIsInterruptable(true);

    // On page/tab close (or app close in some instances) interrupt the timer, clear the sessions and cancel the reservations.
    window.addEventListener('beforeunload', beaconInterrupt);
    yield syncWithBackend();
  });
  return _syncOnLoad.apply(this, arguments);
}
function watchCheckoutControls() {
  /**
   * Filters the selectors used to find the checkout controls on the page.
   *
   * @since 5.16.0
   *
   * @type {string[]} The `querySelectorAll` selectors used to find the checkout controls on the page.
   */
  const filteredCheckoutControls = Object(external_wp_hooks_["applyFilters"])('tec.tickets.seating.frontend.session.checkoutControls', checkoutControlsSelectors);
  const checkoutControlElements = targetDom.querySelectorAll(filteredCheckoutControls.join(', '));
  checkoutControlElements.forEach(checkoutControlElement => {
    watchedCheckoutControls.push(checkoutControlElement);
    checkoutControlElement.addEventListener('click', pauseToCheckout);
    checkoutControlElement.addEventListener('submit', pauseToCheckout);
  });
}

/**
 * Remove the event listeners from the watched checkout controls.
 *
 * @since 5.16.0
 *
 * @return {void} The event listeners are removed from the watched checkout controls.
 */
function stopWatchingCheckoutControls() {
  watchedCheckoutControls.forEach(checkoutControlElement => {
    checkoutControlElement.removeEventListener('click', pauseToCheckout);
    checkoutControlElement.removeEventListener('submit', pauseToCheckout);
  });
  watchedCheckoutControls = [];
}

/**
 * Returns the list of checkout controls that are being watched by the timer.
 *
 * @since 5.16.0
 *
 * @return {HTMLElement[]} The list of checkout controls that are being watched by the timer.
 */
function getWatchedCheckoutControls() {
  return watchedCheckoutControls;
}

/**
 * Sets the healthcheck loop ID.
 *
 * @since 5.16.0
 *
 * @param {number} id The ID of the healthcheck loop.
 *
 * @return {number} The updated healthcheck loop ID.
 */
function setHealthcheckLoopId(id) {
  healthCheckTimeoutId = id;
  return healthCheckTimeoutId;
}

/**
 * Returns the ID of the healthcheck timeout.
 *
 * @since 5.16.0
 *
 * @return {?number} The ID of the healthcheck timeout.
 */
function getHealthcheckTimeoutId() {
  return healthCheckTimeoutId;
}

/**
 * Returns the ID of the countdown timeout.
 *
 * @since 5.16.0
 *
 * @return {?number} The ID of the countdown timeout.
 */
function getCountdownTimeoutId() {
  return countdownTimeoutId;
}

/**
 * Returns the ID of the resume timeout
 *
 * @since 5.16.0
 *
 * @return {?number} The ID of the resume timeout.
 */
function getResumeTimeoutId() {
  return resumeTimeoutId;
}

// On DOM ready check if any timer needs to be synced.
Object(external_tec_tickets_seating_utils_["onReady"])(() => syncOnLoad());
Object(external_tec_tickets_seating_utils_["onReady"])(() => watchCheckoutControls());
window.tec = window.tec || {};
window.tec.tickets = window.tec.tickets || {};
window.tec.tickets.seating = window.tec.tickets.seating || {};
window.tec.tickets.seating.frontend = window.tec.tickets.seating.frontend || {};
window.tec.tickets.seating.frontend.session = _objectSpread(_objectSpread({}, window.tec.tickets.seating.frontend.session || {}), {}, {
  start,
  reset: session_reset,
  syncOnLoad,
  interrupt,
  setIsInterruptable
});

/***/ }),

/***/ "MsaN":
/***/ (function(module, exports) {

module.exports = tec.tickets.seating.utils;

/***/ }),

/***/ "g56x":
/***/ (function(module, exports) {

module.exports = wp.hooks;

/***/ }),

/***/ "l3Sj":
/***/ (function(module, exports) {

module.exports = wp.i18n;

/***/ }),

/***/ "lo4d":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });