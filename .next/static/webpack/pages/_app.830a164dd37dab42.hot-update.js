"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/_app",{

/***/ "./backend/reducers/prdouctSlice.js":
/*!******************************************!*\
  !*** ./backend/reducers/prdouctSlice.js ***!
  \******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"fetchProducts\": function() { return /* binding */ fetchProducts; },\n/* harmony export */   \"productSlice\": function() { return /* binding */ productSlice; }\n/* harmony export */ });\n/* harmony import */ var _swc_helpers_src_async_to_generator_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @swc/helpers/src/_async_to_generator.mjs */ \"./node_modules/@swc/helpers/src/_async_to_generator.mjs\");\n/* harmony import */ var C_Users_Omen_Desktop_my_next_js_nbti_commerce_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/next/dist/compiled/regenerator-runtime/runtime.js */ \"./node_modules/next/dist/compiled/regenerator-runtime/runtime.js\");\n/* harmony import */ var C_Users_Omen_Desktop_my_next_js_nbti_commerce_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(C_Users_Omen_Desktop_my_next_js_nbti_commerce_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @reduxjs/toolkit */ \"./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n\n\n\n\nvar initialState = {\n    loading: false,\n    products: [],\n    error: \"\"\n};\nvar fetchProducts = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__.createAsyncThunk)(\"products/fetchProducts\", (0,_swc_helpers_src_async_to_generator_mjs__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(C_Users_Omen_Desktop_my_next_js_nbti_commerce_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {\n    var response;\n    return C_Users_Omen_Desktop_my_next_js_nbti_commerce_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_ctx) {\n        while(1)switch(_ctx.prev = _ctx.next){\n            case 0:\n                _ctx.next = 2;\n                return axios__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get(\"http://localhost:8000/api/products\").then(function(res) {\n                    return res.data;\n                });\n            case 2:\n                response = _ctx.sent;\n                return _ctx.abrupt(\"return\", data);\n            case 4:\n            case \"end\":\n                return _ctx.stop();\n        }\n    }, _callee);\n})));\nvar productSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__.createSlice)({\n    name: \"products\",\n    initialState: initialState,\n    extraReducers: function(builder) {\n        builder.addCase(fetchProducts.pending, function(state, action) {\n            state.loading = true;\n        });\n        builder.addCase(fetchProducts.fulfilled, function(state, action) {\n            state.products = action.payload;\n            state.loading = false;\n        });\n        builder.addCase(fetchProducts.rejected, function(state, action) {\n            state.error = action.error.message;\n            state.loading = false;\n        });\n    }\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (productSlice.reducer);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9iYWNrZW5kL3JlZHVjZXJzL3ByZG91Y3RTbGljZS5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7O0FBQWlFO0FBQ3ZDO0FBRTFCLElBQU1HLFlBQVksR0FBRztJQUNuQkMsT0FBTyxFQUFFLEtBQUs7SUFDZEMsUUFBUSxFQUFFLEVBQUU7SUFDWkMsS0FBSyxFQUFFLEVBQUU7Q0FDVjtBQUVNLElBQU1DLGFBQWEsR0FBR1Asa0VBQWdCLENBQzNDLHdCQUF3QixFQUN4QixnUUFBWTtRQUNKUSxRQUFROzs7Ozt1QkFBU04saURBQVMsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDUSxJQUFJLENBQUMsU0FBQ0MsR0FBRzsyQkFBS0EsR0FBRyxDQUFDQyxJQUFJO2lCQUFBLENBQUM7O2dCQUF4RkosUUFBUSxZQUFnRjs2Q0FDdkZJLElBQUk7Ozs7OztDQUNaLEdBQ0YsQ0FBQztBQUVLLElBQU1DLFlBQVksR0FBR1osNkRBQVcsQ0FBQztJQUN0Q2EsSUFBSSxFQUFFLFVBQVU7SUFDaEJYLFlBQVksRUFBWkEsWUFBWTtJQUNaWSxhQUFhLEVBQUUsU0FBQ0MsT0FBTyxFQUFLO1FBQzFCQSxPQUFPLENBQUNDLE9BQU8sQ0FBQ1YsYUFBYSxDQUFDVyxPQUFPLEVBQUUsU0FBQ0MsS0FBSyxFQUFFQyxNQUFNLEVBQUs7WUFDeERELEtBQUssQ0FBQ2YsT0FBTyxHQUFHLElBQUksQ0FBQztTQUN0QixDQUFDLENBQUM7UUFDSFksT0FBTyxDQUFDQyxPQUFPLENBQUNWLGFBQWEsQ0FBQ2MsU0FBUyxFQUFFLFNBQUNGLEtBQUssRUFBRUMsTUFBTSxFQUFLO1lBQzFERCxLQUFLLENBQUNkLFFBQVEsR0FBR2UsTUFBTSxDQUFDRSxPQUFPLENBQUM7WUFDaENILEtBQUssQ0FBQ2YsT0FBTyxHQUFHLEtBQUssQ0FBQztTQUN2QixDQUFDLENBQUM7UUFDSFksT0FBTyxDQUFDQyxPQUFPLENBQUNWLGFBQWEsQ0FBQ2dCLFFBQVEsRUFBRSxTQUFDSixLQUFLLEVBQUVDLE1BQU0sRUFBSztZQUN6REQsS0FBSyxDQUFDYixLQUFLLEdBQUdjLE1BQU0sQ0FBQ2QsS0FBSyxDQUFDa0IsT0FBTyxDQUFDO1lBQ25DTCxLQUFLLENBQUNmLE9BQU8sR0FBRyxLQUFLLENBQUM7U0FDdkIsQ0FBQyxDQUFDO0tBQ0o7Q0FDRixDQUFDLENBQUM7QUFFSCwrREFBZVMsWUFBWSxDQUFDWSxPQUFPLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYmFja2VuZC9yZWR1Y2Vycy9wcmRvdWN0U2xpY2UuanM/Zjc2MyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVBc3luY1RodW5rLCBjcmVhdGVTbGljZSB9IGZyb20gXCJAcmVkdXhqcy90b29sa2l0XCI7XHJcbmltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcclxuXHJcbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcclxuICBsb2FkaW5nOiBmYWxzZSxcclxuICBwcm9kdWN0czogW10sXHJcbiAgZXJyb3I6IFwiXCIsXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZmV0Y2hQcm9kdWN0cyA9IGNyZWF0ZUFzeW5jVGh1bmsoXHJcbiAgXCJwcm9kdWN0cy9mZXRjaFByb2R1Y3RzXCIsXHJcbiAgYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5nZXQoXCJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL3Byb2R1Y3RzXCIpLnRoZW4oKHJlcykgPT4gcmVzLmRhdGEpO1xyXG4gICAgcmV0dXJuIGRhdGE7XHJcbiAgfVxyXG4pO1xyXG5cclxuZXhwb3J0IGNvbnN0IHByb2R1Y3RTbGljZSA9IGNyZWF0ZVNsaWNlKHtcclxuICBuYW1lOiBcInByb2R1Y3RzXCIsXHJcbiAgaW5pdGlhbFN0YXRlLFxyXG4gIGV4dHJhUmVkdWNlcnM6IChidWlsZGVyKSA9PiB7XHJcbiAgICBidWlsZGVyLmFkZENhc2UoZmV0Y2hQcm9kdWN0cy5wZW5kaW5nLCAoc3RhdGUsIGFjdGlvbikgPT4ge1xyXG4gICAgICBzdGF0ZS5sb2FkaW5nID0gdHJ1ZTtcclxuICAgIH0pO1xyXG4gICAgYnVpbGRlci5hZGRDYXNlKGZldGNoUHJvZHVjdHMuZnVsZmlsbGVkLCAoc3RhdGUsIGFjdGlvbikgPT4ge1xyXG4gICAgICBzdGF0ZS5wcm9kdWN0cyA9IGFjdGlvbi5wYXlsb2FkO1xyXG4gICAgICBzdGF0ZS5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICB9KTtcclxuICAgIGJ1aWxkZXIuYWRkQ2FzZShmZXRjaFByb2R1Y3RzLnJlamVjdGVkLCAoc3RhdGUsIGFjdGlvbikgPT4ge1xyXG4gICAgICBzdGF0ZS5lcnJvciA9IGFjdGlvbi5lcnJvci5tZXNzYWdlO1xyXG4gICAgICBzdGF0ZS5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICB9KTtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHByb2R1Y3RTbGljZS5yZWR1Y2VyOyJdLCJuYW1lcyI6WyJjcmVhdGVBc3luY1RodW5rIiwiY3JlYXRlU2xpY2UiLCJheGlvcyIsImluaXRpYWxTdGF0ZSIsImxvYWRpbmciLCJwcm9kdWN0cyIsImVycm9yIiwiZmV0Y2hQcm9kdWN0cyIsInJlc3BvbnNlIiwiZ2V0IiwidGhlbiIsInJlcyIsImRhdGEiLCJwcm9kdWN0U2xpY2UiLCJuYW1lIiwiZXh0cmFSZWR1Y2VycyIsImJ1aWxkZXIiLCJhZGRDYXNlIiwicGVuZGluZyIsInN0YXRlIiwiYWN0aW9uIiwiZnVsZmlsbGVkIiwicGF5bG9hZCIsInJlamVjdGVkIiwibWVzc2FnZSIsInJlZHVjZXIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./backend/reducers/prdouctSlice.js\n"));

/***/ })

});