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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"fetchProducts\": function() { return /* binding */ fetchProducts; },\n/* harmony export */   \"productSlice\": function() { return /* binding */ productSlice; }\n/* harmony export */ });\n/* harmony import */ var _swc_helpers_src_async_to_generator_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @swc/helpers/src/_async_to_generator.mjs */ \"./node_modules/@swc/helpers/src/_async_to_generator.mjs\");\n/* harmony import */ var C_Users_Omen_Desktop_my_next_js_nbti_commerce_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/next/dist/compiled/regenerator-runtime/runtime.js */ \"./node_modules/next/dist/compiled/regenerator-runtime/runtime.js\");\n/* harmony import */ var C_Users_Omen_Desktop_my_next_js_nbti_commerce_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(C_Users_Omen_Desktop_my_next_js_nbti_commerce_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @reduxjs/toolkit */ \"./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n\n\n\n\nvar initialState = {\n    loading: false,\n    products: [],\n    error: \"\"\n};\nvar fetchProducts = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__.createAsyncThunk)(\"products/fetchProducts\", (0,_swc_helpers_src_async_to_generator_mjs__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(C_Users_Omen_Desktop_my_next_js_nbti_commerce_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {\n    var response;\n    return C_Users_Omen_Desktop_my_next_js_nbti_commerce_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_ctx) {\n        while(1)switch(_ctx.prev = _ctx.next){\n            case 0:\n                _ctx.next = 2;\n                return axios__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get(\"http://localhost:8000/api/products\").then(function(res) {\n                    return res.data;\n                });\n            case 2:\n                response = _ctx.sent;\n            case 3:\n            case \"end\":\n                return _ctx.stop();\n        }\n    }, _callee);\n})));\nvar productSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__.createSlice)({\n    name: \"products\",\n    initialState: initialState,\n    extraReducers: function(builder) {\n        builder.addCase(fetchProducts.pending, function(state, action) {\n            state.loading = true;\n        });\n        builder.addCase(fetchProducts.fulfilled, function(state, action) {\n            state.loading = false;\n            state.products = action.payload;\n            state.error = \"\";\n        });\n        builder.addCase(fetchProducts.rejected, function(state, action) {\n            state.error = action.error.message;\n            state.loading = false;\n            state.products = [];\n        });\n    }\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (productSlice.reducer);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9iYWNrZW5kL3JlZHVjZXJzL3ByZG91Y3RTbGljZS5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7O0FBQWlFO0FBQ3ZDO0FBRTFCLElBQU1HLFlBQVksR0FBRztJQUNuQkMsT0FBTyxFQUFFLEtBQUs7SUFDZEMsUUFBUSxFQUFFLEVBQUU7SUFDWkMsS0FBSyxFQUFFLEVBQUU7Q0FDVjtBQUVNLElBQU1DLGFBQWEsR0FBR1Asa0VBQWdCLENBQzNDLHdCQUF3QixFQUN4QixnUUFBWTtRQUNKUSxRQUFROzs7Ozt1QkFBU04saURBQ2pCLENBQUMsb0NBQW9DLENBQUMsQ0FDekNRLElBQUksQ0FBQyxTQUFDQyxHQUFHOzJCQUFLQSxHQUFHLENBQUNDLElBQUk7aUJBQUEsQ0FBQzs7Z0JBRnBCSixRQUFRLFlBRVk7Ozs7OztDQUMzQixHQUNGLENBQUM7QUFFSyxJQUFNSyxZQUFZLEdBQUdaLDZEQUFXLENBQUM7SUFDdENhLElBQUksRUFBRSxVQUFVO0lBQ2hCWCxZQUFZLEVBQVpBLFlBQVk7SUFDWlksYUFBYSxFQUFFLFNBQUNDLE9BQU8sRUFBSztRQUMxQkEsT0FBTyxDQUFDQyxPQUFPLENBQUNWLGFBQWEsQ0FBQ1csT0FBTyxFQUFFLFNBQUNDLEtBQUssRUFBRUMsTUFBTSxFQUFLO1lBQ3hERCxLQUFLLENBQUNmLE9BQU8sR0FBRyxJQUFJLENBQUM7U0FDdEIsQ0FBQyxDQUFDO1FBQ0hZLE9BQU8sQ0FBQ0MsT0FBTyxDQUFDVixhQUFhLENBQUNjLFNBQVMsRUFBRSxTQUFDRixLQUFLLEVBQUVDLE1BQU0sRUFBSztZQUMxREQsS0FBSyxDQUFDZixPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3RCZSxLQUFLLENBQUNkLFFBQVEsR0FBR2UsTUFBTSxDQUFDRSxPQUFPLENBQUM7WUFDaENILEtBQUssQ0FBQ2IsS0FBSyxHQUFHLEVBQUUsQ0FBQztTQUNsQixDQUFDLENBQUM7UUFDSFUsT0FBTyxDQUFDQyxPQUFPLENBQUNWLGFBQWEsQ0FBQ2dCLFFBQVEsRUFBRSxTQUFDSixLQUFLLEVBQUVDLE1BQU0sRUFBSztZQUN6REQsS0FBSyxDQUFDYixLQUFLLEdBQUdjLE1BQU0sQ0FBQ2QsS0FBSyxDQUFDa0IsT0FBTyxDQUFDO1lBQ25DTCxLQUFLLENBQUNmLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDdEJlLEtBQUssQ0FBQ2QsUUFBUSxHQUFHLEVBQUUsQ0FBQztTQUNyQixDQUFDLENBQUM7S0FDSjtDQUNGLENBQUMsQ0FBQztBQUVILCtEQUFlUSxZQUFZLENBQUNZLE9BQU8sRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9iYWNrZW5kL3JlZHVjZXJzL3ByZG91Y3RTbGljZS5qcz9mNzYzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUFzeW5jVGh1bmssIGNyZWF0ZVNsaWNlIH0gZnJvbSBcIkByZWR1eGpzL3Rvb2xraXRcIjtcclxuaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xyXG5cclxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xyXG4gIGxvYWRpbmc6IGZhbHNlLFxyXG4gIHByb2R1Y3RzOiBbXSxcclxuICBlcnJvcjogXCJcIixcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBmZXRjaFByb2R1Y3RzID0gY3JlYXRlQXN5bmNUaHVuayhcclxuICBcInByb2R1Y3RzL2ZldGNoUHJvZHVjdHNcIixcclxuICBhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zXHJcbiAgICAgIC5nZXQoXCJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL3Byb2R1Y3RzXCIpXHJcbiAgICAgIC50aGVuKChyZXMpID0+IHJlcy5kYXRhKTtcclxuICB9XHJcbik7XHJcblxyXG5leHBvcnQgY29uc3QgcHJvZHVjdFNsaWNlID0gY3JlYXRlU2xpY2Uoe1xyXG4gIG5hbWU6IFwicHJvZHVjdHNcIixcclxuICBpbml0aWFsU3RhdGUsXHJcbiAgZXh0cmFSZWR1Y2VyczogKGJ1aWxkZXIpID0+IHtcclxuICAgIGJ1aWxkZXIuYWRkQ2FzZShmZXRjaFByb2R1Y3RzLnBlbmRpbmcsIChzdGF0ZSwgYWN0aW9uKSA9PiB7XHJcbiAgICAgIHN0YXRlLmxvYWRpbmcgPSB0cnVlO1xyXG4gICAgfSk7XHJcbiAgICBidWlsZGVyLmFkZENhc2UoZmV0Y2hQcm9kdWN0cy5mdWxmaWxsZWQsIChzdGF0ZSwgYWN0aW9uKSA9PiB7XHJcbiAgICAgIHN0YXRlLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgc3RhdGUucHJvZHVjdHMgPSBhY3Rpb24ucGF5bG9hZDtcclxuICAgICAgc3RhdGUuZXJyb3IgPSBcIlwiO1xyXG4gICAgfSk7XHJcbiAgICBidWlsZGVyLmFkZENhc2UoZmV0Y2hQcm9kdWN0cy5yZWplY3RlZCwgKHN0YXRlLCBhY3Rpb24pID0+IHtcclxuICAgICAgc3RhdGUuZXJyb3IgPSBhY3Rpb24uZXJyb3IubWVzc2FnZTtcclxuICAgICAgc3RhdGUubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICBzdGF0ZS5wcm9kdWN0cyA9IFtdO1xyXG4gICAgfSk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwcm9kdWN0U2xpY2UucmVkdWNlcjtcclxuIl0sIm5hbWVzIjpbImNyZWF0ZUFzeW5jVGh1bmsiLCJjcmVhdGVTbGljZSIsImF4aW9zIiwiaW5pdGlhbFN0YXRlIiwibG9hZGluZyIsInByb2R1Y3RzIiwiZXJyb3IiLCJmZXRjaFByb2R1Y3RzIiwicmVzcG9uc2UiLCJnZXQiLCJ0aGVuIiwicmVzIiwiZGF0YSIsInByb2R1Y3RTbGljZSIsIm5hbWUiLCJleHRyYVJlZHVjZXJzIiwiYnVpbGRlciIsImFkZENhc2UiLCJwZW5kaW5nIiwic3RhdGUiLCJhY3Rpb24iLCJmdWxmaWxsZWQiLCJwYXlsb2FkIiwicmVqZWN0ZWQiLCJtZXNzYWdlIiwicmVkdWNlciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./backend/reducers/prdouctSlice.js\n"));

/***/ })

});