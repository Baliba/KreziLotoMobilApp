(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["status-tap-9cb487b1-js"],{

/***/ "eVst":
/*!******************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/status-tap-9cb487b1.js ***!
  \******************************************************************/
/*! exports provided: startStatusTap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startStatusTap", function() { return startStatusTap; });
/* harmony import */ var C_Users_Monkata_Documents_lotteryAppClient_lotteryPosClient_lotAppMobile_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ "o0o1");
/* harmony import */ var C_Users_Monkata_Documents_lotteryAppClient_lotteryPosClient_lotAppMobile_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(C_Users_Monkata_Documents_lotteryAppClient_lotteryPosClient_lotAppMobile_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var C_Users_Monkata_Documents_lotteryAppClient_lotteryPosClient_lotAppMobile_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ "HaE+");
/* harmony import */ var _index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index-7a8b7a1c.js */ "wEJo");
/* harmony import */ var _helpers_1457892a_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers-1457892a.js */ "W6o/");





var startStatusTap = function startStatusTap() {
  var win = window;
  win.addEventListener('statusTap', function () {
    Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_2__["f"])(function () {
      var width = win.innerWidth;
      var height = win.innerHeight;
      var el = document.elementFromPoint(width / 2, height / 2);

      if (!el) {
        return;
      }

      var contentEl = el.closest('ion-content');

      if (contentEl) {
        new Promise(function (resolve) {
          return Object(_helpers_1457892a_js__WEBPACK_IMPORTED_MODULE_3__["c"])(contentEl, resolve);
        }).then(function () {
          Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_2__["c"])( /*#__PURE__*/Object(C_Users_Monkata_Documents_lotteryAppClient_lotteryPosClient_lotAppMobile_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/C_Users_Monkata_Documents_lotteryAppClient_lotteryPosClient_lotAppMobile_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
            return C_Users_Monkata_Documents_lotteryAppClient_lotteryPosClient_lotAppMobile_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    /**
                     * If scrolling and user taps status bar,
                     * only calling scrollToTop is not enough
                     * as engines like WebKit will jump the
                     * scroll position back down and complete
                     * any in-progress momentum scrolling.
                     */
                    contentEl.style.setProperty('--overflow', 'hidden');
                    _context.next = 3;
                    return contentEl.scrollToTop(300);

                  case 3:
                    contentEl.style.removeProperty('--overflow');

                  case 4:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          })));
        });
      }
    });
  });
};



/***/ })

}]);
//# sourceMappingURL=status-tap-9cb487b1-js.js.map