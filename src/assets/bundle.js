(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _Util = require('./Util.js');

var _Util2 = _interopRequireDefault(_Util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Application entry point
window.onload = function () {
  var date = _Util2.default.formatDate();
  console.log('[' + date + '] Application was launched.');

  var elm = document.querySelector('.date');
  if (elm) {
    elm.textContent = date;
  }
};

$(function () {
  console.log("test");
  //ページ内スクロール
  $("a[href^='#']").on("click", function () {
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top - 60;
    $("html, body").animate({ scrollTop: position }, 500, "swing");
    return false;
  });
});

},{"./Util.js":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Provide a utility method.
 */
var Util = function () {
  function Util() {
    _classCallCheck(this, Util);
  }

  _createClass(Util, null, [{
    key: 'formatDate',

    /**
     * Converts the value of the Date object to its equivalent string representation using the specified format.
     *
     * @param {Date}   date   Date and time. Default is current date and time.
     * @param {String} format Date and time format string. Default is "YYYY-MM-DD hh:mm:ss.SSS".
     *
     * @return {String} Formatted string.
     *
     * @see http://qiita.com/osakanafish/items/c64fe8a34e7221e811d0
     */
    value: function formatDate() {
      var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
      var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'YYYY-MM-DD hh:mm:ss.SSS';

      var Y = date.getFullYear();
      var M = date.getMonth() + 1;
      var D = date.getDate();
      var h = date.getHours();
      var l = 12 < h ? h - 12 : h;
      var m = date.getMinutes();
      var s = date.getSeconds();

      var str = format.replace(/YYYY/g, Y);
      str = str.replace(/MM/g, ('0' + M).slice(-2));
      str = str.replace(/DD/g, ('0' + D).slice(-2));
      str = str.replace(/hh/g, ('0' + h).slice(-2));
      str = str.replace(/mm/g, ('0' + m).slice(-2));
      str = str.replace(/ss/g, ('0' + s).slice(-2));

      str = str.replace(/M/g, M);
      str = str.replace(/D/g, D);
      str = str.replace(/h/g, h);
      str = str.replace(/m/g, m);
      str = str.replace(/s/g, s);

      // 12 Hour
      str = str.replace(/l/g, l);

      // AM/PM
      str = str.replace(/p/g, h < 12 ? 'AM' : 'PM');

      // Month name
      var monthShortNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      var monthFullNames = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      str = str.replace(/b/g, monthShortNames[M]);
      str = str.replace(/B/g, monthFullNames[M]);

      // milliSeconds
      if (str.match(/S/g)) {
        var S = date.getMilliseconds();
        var ms = ('00' + S).slice(-3);
        for (var i = 0, max = str.match(/S/g).length; i < max; ++i) {
          str = str.replace(/S/, ms.substring(i, i + 1));
        }
      }

      return str;
    }
  }]);

  return Util;
}();

exports.default = Util;

},{}]},{},[1])
//# sourceMappingURL=bundle.js.map
