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
/******/ 		13: 0
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
/******/ 	deferredModules.push(["6Qrv",0]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "6Qrv":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/Tickets/Seating/app/admin/layouts/style.pcss
var style = __webpack_require__("ruqd");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("yXPU");
var asyncToGenerator_default = /*#__PURE__*/__webpack_require__.n(asyncToGenerator);

// EXTERNAL MODULE: external "tec.tickets.seating.ajax"
var external_tec_tickets_seating_ajax_ = __webpack_require__("lL5a");

// EXTERNAL MODULE: external "tec.tickets.seating.utils"
var external_tec_tickets_seating_utils_ = __webpack_require__("MsaN");

// CONCATENATED MODULE: ./src/Tickets/Seating/app/admin/layouts/actions.js




/**
 * Get localized string for the given key.
 *
 * @since 5.16.0
 *
 * @param {string} key The key to get the localized string for.
 *
 * @return {string} The localized string.
 */
function getString(key) {
  return Object(external_tec_tickets_seating_utils_["getLocalizedString"])(key, 'layouts');
}

/**
 * Register delete action on all links with class 'delete-layout'.
 *
 * @since 5.16.0
 *
 * @param {HTMLDocument|null} dom The document to use to search for the delete buttons.
 */
function registerDeleteAction(dom) {
  dom = dom || document;
  // Add click listener to all links with class 'delete'.
  dom.querySelectorAll('.delete-layout').forEach(function (link) {
    link.addEventListener('click', deleteListener);
  });
}

/**
 * Bind the delete action.
 *
 * @since 5.17.0
 *
 * @param {Event} event The click event.
 */
function deleteListener(_x) {
  return _deleteListener.apply(this, arguments);
}
/**
 * Handle delete action.
 *
 * @since 5.16.0
 *
 * @param {HTMLElement} element The target item.
 *
 * @return {Promise<void>}
 */
function _deleteListener() {
  _deleteListener = asyncToGenerator_default()(function* (event) {
    event.preventDefault();
    yield handleDelete(event.target);
  });
  return _deleteListener.apply(this, arguments);
}
function handleDelete(_x2) {
  return _handleDelete.apply(this, arguments);
}
/**
 * Delete layout.
 *
 * @since 5.16.0
 *
 * @param {string} layoutId The layout ID.
 * @param {string} mapId    The map ID.
 *
 * @return {Promise<boolean>} Promise resolving to true if delete was successful, false otherwise.
 */
function _handleDelete() {
  _handleDelete = asyncToGenerator_default()(function* (element) {
    const layoutId = element.getAttribute('data-layout-id');
    const mapId = element.getAttribute('data-map-id');
    if (!(layoutId && mapId)) {
      return;
    }
    const card = element.closest('.tec-tickets__seating-tab__card');
    card.style.opacity = 0.5;
    if (confirm(getString('delete-confirmation'))) {
      const result = yield deleteLayout(layoutId, mapId);
      if (result) {
        window.location.reload();
        return;
      }
      card.style.opacity = 1;
      alert(getString('delete-failed'));
      return;
    }
    card.style.opacity = 1;
  });
  return _handleDelete.apply(this, arguments);
}
function deleteLayout(_x3, _x4) {
  return _deleteLayout.apply(this, arguments);
}
/**
 * Register destructive edit action on all links with class 'edit-layout'.
 *
 * @since 5.16.0
 *
 * @param {HTMLDocument|null} dom The document to use to search for the edit buttons.
 */
function _deleteLayout() {
  _deleteLayout = asyncToGenerator_default()(function* (layoutId, mapId) {
    const url = new URL(external_tec_tickets_seating_ajax_["ajaxUrl"]);
    url.searchParams.set('_ajax_nonce', external_tec_tickets_seating_ajax_["ajaxNonce"]);
    url.searchParams.set('layoutId', layoutId);
    url.searchParams.set('mapId', mapId);
    url.searchParams.set('action', 'tec_tickets_seating_service_delete_layout');
    const response = yield fetch(url.toString(), {
      method: 'POST'
    });
    return response.status === 200;
  });
  return _deleteLayout.apply(this, arguments);
}
function registerDestructiveEditAction(dom) {
  dom = dom || document;
  // Add click listener to all links with class 'delete'.
  dom.querySelectorAll('.edit-layout').forEach(function (link) {
    link.addEventListener('click', destructiveEditActionListener);
  });
}

/**
 * Bind the destructive edit action.
 *
 * @since 5.17.0
 *
 * @param {Event} event The click event.
 */
function destructiveEditActionListener(_x5) {
  return _destructiveEditActionListener.apply(this, arguments);
}
/**
 * Handle destructive edit action.
 *
 * @since 5.16.0
 *
 * @param {Event} event The click event.
 *
 * @return {Promise<void>}
 */
function _destructiveEditActionListener() {
  _destructiveEditActionListener = asyncToGenerator_default()(function* (event) {
    yield handleDestructiveEdit(event);
  });
  return _destructiveEditActionListener.apply(this, arguments);
}
function handleDestructiveEdit(_x6) {
  return _handleDestructiveEdit.apply(this, arguments);
}
/**
 * Register a duplicate action on all the duplicate layout buttons.
 *
 * @since 5.17.0
 *
 * @param {HTMLDocument|null} dom The document to use to search for the duplicate buttons.
 */
function _handleDestructiveEdit() {
  _handleDestructiveEdit = asyncToGenerator_default()(function* (event) {
    const associatedEvents = event.target.getAttribute('data-event-count');
    if (Number(associatedEvents) > 0) {
      const card = event.target.closest('.tec-tickets__seating-tab__card');
      card.style.opacity = 0.5;
      if (!confirm(getString('edit-confirmation').replace('{count}', associatedEvents))) {
        card.style.opacity = 1;
        event.preventDefault();
      }
    }
  });
  return _handleDestructiveEdit.apply(this, arguments);
}
function registerDuplicateLayoutAction(dom) {
  dom = dom || document;
  dom.querySelectorAll('.duplicate-layout').forEach(function (btn) {
    btn.addEventListener('click', duplicateListener);
  });
}

/**
 * Bind the duplicate action.
 *
 * @since 5.17.0
 *
 * @param {Event} event The click event.
 */
function duplicateListener(_x7) {
  return _duplicateListener.apply(this, arguments);
}
/**
 * Handle the duplicate layout action.
 *
 * @since 5.17.0
 *
 * @param {HTMLButtonElement} target The target button.
 *
 * @return {Promise<void>}
 */
function _duplicateListener() {
  _duplicateListener = asyncToGenerator_default()(function* (event) {
    event.preventDefault();
    yield handleDuplicateAction(event.target);
  });
  return _duplicateListener.apply(this, arguments);
}
function handleDuplicateAction(_x8) {
  return _handleDuplicateAction.apply(this, arguments);
}
/**
 * Duplicate a layout by layout ID.
 *
 * @since 5.17.0
 *
 * @param {string} layoutId The layout ID.
 *
 * @return {Promise<boolean|object>} A promise with an object of the duplicated layout, or false otherwise.
 */
function _handleDuplicateAction() {
  _handleDuplicateAction = asyncToGenerator_default()(function* (target) {
    const layoutId = target.getAttribute('data-layout-id');
    if (!layoutId) {
      alert(Object(external_tec_tickets_seating_utils_["getLocalizedString"])('duplicate-failed', 'layouts'));
      return;
    }
    target.disabled = false;
    const card = target.closest('.tec-tickets__seating-tab__card');
    card.style.opacity = 0.5;
    const result = yield duplicateLayout(layoutId);
    if (!(result !== null && result !== void 0 && result.success)) {
      alert(Object(external_tec_tickets_seating_utils_["getLocalizedString"])('duplicate-failed', 'layouts'));
      card.style.opacity = 1;
      target.disabled = false;
      return;
    }
    Object(external_tec_tickets_seating_utils_["redirectTo"])(result.data);
  });
  return _handleDuplicateAction.apply(this, arguments);
}
function duplicateLayout(_x9) {
  return _duplicateLayout.apply(this, arguments);
}
function _duplicateLayout() {
  _duplicateLayout = asyncToGenerator_default()(function* (layoutId) {
    const url = new URL(external_tec_tickets_seating_ajax_["ajaxUrl"]);
    url.searchParams.set('_ajax_nonce', external_tec_tickets_seating_ajax_["ajaxNonce"]);
    url.searchParams.set('layoutId', layoutId);
    url.searchParams.set('action', external_tec_tickets_seating_ajax_["ACTION_DUPLICATE_LAYOUT"]);
    const response = yield fetch(url.toString(), {
      method: 'POST'
    });
    return yield response.json();
  });
  return _duplicateLayout.apply(this, arguments);
}

Object(external_tec_tickets_seating_utils_["onReady"])(() => registerDeleteAction(document));
Object(external_tec_tickets_seating_utils_["onReady"])(() => registerDestructiveEditAction(document));
Object(external_tec_tickets_seating_utils_["onReady"])(() => registerDuplicateLayoutAction(document));
// CONCATENATED MODULE: ./src/Tickets/Seating/app/admin/layouts/localized-data.js
var _window;
/**
 * @typedef {Object} LayoutsLocalizedData
 * @property {string} addLayoutModal The add layout modal identifier.
 */

/**
 * @type {LayoutsLocalizedData}
 */
const localizedData = (_window = window) === null || _window === void 0 || (_window = _window.tec) === null || _window === void 0 || (_window = _window.tickets) === null || _window === void 0 || (_window = _window.seating) === null || _window === void 0 ? void 0 : _window.layouts;
// CONCATENATED MODULE: ./src/Tickets/Seating/app/admin/layouts/add-new-modal.js





/**
 * @type {string}
 */
const {
  addLayoutModal
} = localizedData;

/**
 * Waits for the modal element to be present in the DOM.
 *
 * @return {Promise<Element>} A promise that resolves to the modal element.
 */
function waitForModalElement() {
  return _waitForModalElement.apply(this, arguments);
}

/**
 * Registers the modal actions.
 *
 * @since 5.16.0
 *
 * @return {void} Handles the modal actions.
 */
function _waitForModalElement() {
  _waitForModalElement = asyncToGenerator_default()(function* () {
    return new Promise(resolve => {
      let timeoutId;
      const check = () => {
        if (window[addLayoutModal]) {
          clearTimeout(timeoutId);
          resolve(window[addLayoutModal]);
          return;
        }
        timeoutId = setTimeout(check, 50);
      };
      check();
    });
  });
  return _waitForModalElement.apply(this, arguments);
}
function modalActionListener() {
  const mapSelect = document.getElementById('tec-tickets-seating__select-map');
  mapSelect === null || mapSelect === void 0 || mapSelect.addEventListener('change', handleSelectUpdates);
  const cancelButton = document.querySelector('.tec-tickets-seating__new-layout-button-cancel');
  cancelButton === null || cancelButton === void 0 || cancelButton.addEventListener('click', closeModal);
  const addButton = document.querySelector('.tec-tickets-seating__new-layout-button-add');
  addButton === null || addButton === void 0 || addButton.addEventListener('click', addNewLayout);
}

/**
 * Handles adding a new layout.
 *
 * @since 5.16.0
 *
 * @param {Event} event The event object.
 *
 * @return {Promise<void>}
 */
function addNewLayout(_x) {
  return _addNewLayout.apply(this, arguments);
}

/**
 * Adds a new layout by map ID.
 *
 * @since 5.16.0
 *
 * @param {string} mapId The map ID.
 *
 * @return {Promise<boolean|object>} A promise that resolves to data object if the layout was added successfully, false otherwise.
 */
function _addNewLayout() {
  _addNewLayout = asyncToGenerator_default()(function* (event) {
    const mapSelect = document.getElementById('tec-tickets-seating__select-map');
    const mapId = mapSelect.selectedOptions[0].value;
    const wrapper = document.querySelector('.tec-tickets-seating__new-layout-wrapper');
    if (!mapId) {
      return;
    }
    event.target.disabled = true;
    wrapper.style.opacity = 0.5;
    const result = yield addLayoutByMapId(mapId);
    if (result) {
      closeModal();
      Object(external_tec_tickets_seating_utils_["redirectTo"])(result.data);
    } else {
      alert(Object(external_tec_tickets_seating_utils_["getLocalizedString"])('add-failed', 'layouts'));
      wrapper.style.opacity = 1;
      event.target.disabled = false;
    }
  });
  return _addNewLayout.apply(this, arguments);
}
function addLayoutByMapId(_x2) {
  return _addLayoutByMapId.apply(this, arguments);
}

/**
 * Handles the map select updates.
 *
 * @since 5.16.0
 *
 * @param {Event} event The event object.
 *
 * @return {void} Handles the map select updates.
 */
function _addLayoutByMapId() {
  _addLayoutByMapId = asyncToGenerator_default()(function* (mapId) {
    const url = new URL(external_tec_tickets_seating_ajax_["ajaxUrl"]);
    url.searchParams.set('_ajax_nonce', external_tec_tickets_seating_ajax_["ajaxNonce"]);
    url.searchParams.set('mapId', mapId);
    url.searchParams.set('action', external_tec_tickets_seating_ajax_["ACTION_ADD_NEW_LAYOUT"]);
    const response = yield fetch(url.toString(), {
      method: 'POST'
    });
    if (response.status === 200) {
      return yield response.json();
    }
    return false;
  });
  return _addLayoutByMapId.apply(this, arguments);
}
function handleSelectUpdates(event) {
  const selectedOption = event.target.options[event.target.selectedIndex];
  const img = document.getElementById('tec-tickets-seating__new-layout-map-preview-img');
  img.src = selectedOption.getAttribute('data-screenshot-url');
  ;
  const seatsCountElement = document.querySelector('.tec-tickets-seating__new-layout-map-seats-count');
  seatsCountElement.innerHTML = selectedOption.getAttribute('data-seats-count');
  const mapNameElement = document.querySelector('.tec-tickets-seating__new-layout-map-name');
  mapNameElement.innerHTML = selectedOption.innerHTML;
}

/**
 * Closes the modal element using its reference on the window object.
 *
 * @since 5.16.0
 *
 * @return {void} The modal is closed.
 */
function closeModal() {
  var _window;
  const modal = (_window = window) === null || _window === void 0 ? void 0 : _window[addLayoutModal];
  if (!modal) {
    return;
  }
  modal._hide();
}

/**
 * Initializes the modal element once it's loaded.
 *
 * @since 5.16.0
 *
 * @return {void} Initializes the modal element once it's loaded.
 */
function init() {
  return _init.apply(this, arguments);
}
function _init() {
  _init = asyncToGenerator_default()(function* () {
    const modalElement = yield waitForModalElement();
    modalElement.on('show', () => {
      modalActionListener();
    });
  });
  return _init.apply(this, arguments);
}
Object(external_tec_tickets_seating_utils_["onReady"])(/*#__PURE__*/asyncToGenerator_default()(function* () {
  yield init();
}));
// CONCATENATED MODULE: ./src/Tickets/Seating/app/admin/layouts/index.js




/***/ }),

/***/ "MsaN":
/***/ (function(module, exports) {

module.exports = tec.tickets.seating.utils;

/***/ }),

/***/ "lL5a":
/***/ (function(module, exports) {

module.exports = tec.tickets.seating.ajax;

/***/ }),

/***/ "ruqd":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });