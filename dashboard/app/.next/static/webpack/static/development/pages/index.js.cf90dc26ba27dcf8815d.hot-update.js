webpackHotUpdate("static/development/pages/index.js",{

/***/ "./pages/index.jsx":
/*!*************************!*\
  !*** ./pages/index.jsx ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Layout */ "./components/Layout.jsx");
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! semantic-ui-react */ "./node_modules/semantic-ui-react/dist/es/index.js");
/* harmony import */ var react_request__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-request */ "./node_modules/react-request/es/index.js");
/* harmony import */ var react_d3_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-d3-components */ "./node_modules/react-d3-components/lib/index.js");
/* harmony import */ var react_d3_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_d3_components__WEBPACK_IMPORTED_MODULE_4__);
var _jsxFileName = "/home/chetan/Documents/affable/dashboard/app/pages/index.jsx";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









var MainIndex =
/*#__PURE__*/
function (_Component) {
  _inherits(MainIndex, _Component);

  function MainIndex() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, MainIndex);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MainIndex)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      messages: [],
      min: 1,
      max: 10,
      number: 6,
      chartData: {
        label: 'Knimbus Report',
        values: []
      },
      xScale: react_d3_components__WEBPACK_IMPORTED_MODULE_4__["d3"].time.scale().domain([new Date(2015, 2, 5), new Date(2015, 2, 26)]).range([0, 800 - 70]),
      xScaleBrush: react_d3_components__WEBPACK_IMPORTED_MODULE_4__["d3"].time.scale().domain([new Date(2015, 2, 5), new Date(2015, 2, 26)]).range([0, 800 - 70])
    });

    return _this;
  }

  _createClass(MainIndex, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      // this is an "echo" websocket service

      /*
      this.connection = new WebSocket('wss://echo.websocket.org');
      // listen to onmessage event
      this.connection.onmessage = evt => { 
          // add the new message to state
          this.setState({
              messages : this.state.messages.concat([ evt.data ])
          })
      };
      
      // for testing purposes: sending to the echo service which will send it back back
      setInterval( _ =>{
          //this.connection.send( Math.floor(Math.random()*(this.state.max-this.state.min+1)+this.state.min) )
      }, 2000 )*/
      console.log("Starting = ");
      fetch("http://localhost:5000/").then(function (res) {
        return res.json();
      }).then(function (result) {
        console.log(result); //var data = JSON.parse(result)

        var data = result;
        var keys = Object.keys(data);
        console.log(keys.sort());
        var a = [];

        for (var i = 0; i < keys.sort().length; i++) {
          a.push(data[keys[i]]);
        }

        console.log(a);
        var chartData = _this2.state.chartData;
        chartData["values"] = a;

        _this2.setState({
          chartData: chartData
        });
      }, // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      function (error) {
        console.log("  scjhsvccjsd =   " + JSON.stringify(error));

        _this2.setState({
          isLoaded: true,
          error: error
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Layout__WEBPACK_IMPORTED_MODULE_1__["default"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 79
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__["Segment"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 80
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__["Segment"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 101
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__["Segment"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 104
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_d3_components__WEBPACK_IMPORTED_MODULE_4__["LineChart"], {
        data: this.state.chartData,
        width: 800,
        height: 400,
        margin: {
          top: 10,
          bottom: 50,
          left: 50,
          right: 20
        },
        xScale: this.state.xScale,
        xAxis: {
          tickValues: this.state.xScale.ticks(react_d3_components__WEBPACK_IMPORTED_MODULE_4__["d3"].time.day, 2),
          tickFormat: react_d3_components__WEBPACK_IMPORTED_MODULE_4__["d3"].time.format("%m/%d")
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 107
        },
        __self: this
      })));
    }
  }]);

  return MainIndex;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (MainIndex);
    (function (Component, route) {
      if(!Component) return
      if (false) {}
      module.hot.accept()
      Component.__route = route

      if (module.hot.status() === 'idle') return

      var components = next.router.components
      for (var r in components) {
        if (!components.hasOwnProperty(r)) continue

        if (components[r].Component.__route === route) {
          next.router.update(r, Component)
        }
      }
    })(typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__.default : (module.exports.default || module.exports), "/")
  
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=index.js.cf90dc26ba27dcf8815d.hot-update.js.map