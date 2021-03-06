// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"helpers/_consts.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VIEWPORT_HEIGHT = exports.DOM = exports.CLASSES = void 0;
var CLASSES = {
  sidebarNav: 'sidebar-nav',
  sidebarNavButton: 'sidebar-nav__button',
  sidebarNavButtonActive: 'sidebar-nav__button_is-active',
  sidebarNavItem: 'sidebar-nav__item'
};
exports.CLASSES = CLASSES;
var DOM = {
  parent: document.querySelector('.main-content'),
  sections: document.querySelectorAll('.section'),
  sidebarNav: "<div class=\"".concat(CLASSES.sidebarNav, "\"></div>")
};
exports.DOM = DOM;
var VIEWPORT_HEIGHT = 100;
exports.VIEWPORT_HEIGHT = VIEWPORT_HEIGHT;
},{}],"helpers/_functions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _consts = require("./_consts");

var FUNC = {
  runAtEnd: function runAtEnd() {
    console.log('I run at the end');
  },
  runAtStart: function runAtStart() {
    console.log('I run at the start');
  },
  removeActiveClass: function removeActiveClass() {
    document.querySelector(".".concat(_consts.CLASSES.sidebarNavButtonActive)).classList.remove(_consts.CLASSES.sidebarNavButtonActive);
  },
  throttle: function throttle(method, context, delay) {
    var wait = false;
    return function wrapper() {
      if (!wait) {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        method.apply(context, args);
        wait = true;
        setTimeout(function () {
          wait = false;
        }, delay);
      }
    };
  }
};
var _default = FUNC;
exports.default = _default;
},{"./_consts":"helpers/_consts.js"}],"scripts/newNavigation.js":[function(require,module,exports) {
"use strict";
'use-strict';

var _consts = require("../helpers/_consts");

var _functions = _interopRequireDefault(require("../helpers/_functions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MyFullPage = /*#__PURE__*/function () {
  function MyFullPage(config) {
    _classCallCheck(this, MyFullPage);

    this.sections = config.sections || _consts.DOM.sections; // this.pages

    this.sectionsCount = this.sections.length; // this.amountOfPages

    this.animationFinished = true;
    this.dots = config.dots || false;
    this.currentPage = 0;
    this.debounce = null;
    this.duration = config.duration || 500;
    this.callback = {
      start: null,
      end: null
    };
    this.sectionNavigation = '';
    this.parent = config.parent || _consts.DOM.parent;
    this.init(); // old
    // this.parent = config.parent || DOM.parent;
    // this.spinValue = config.spinValue || 0; // currentPage
    // this.sectionNavigation = '';
    // this.startY = undefined;
    // this.initializeScroll();
    // this.setAnimationDuration(this.duration);
    // this.prevTime = new Date().getTime();
    // this.refreshPageToTop();
    // old
  }

  _createClass(MyFullPage, [{
    key: "init",
    value: function init() {
      this.refreshPageToTop();
      this.setSideNavigation();
      this.addScrollListener();
      this.setAnimationDuration(this.duration);
    }
  }, {
    key: "refreshPageToTop",
    value: function refreshPageToTop() {
      setTimeout(function () {
        window.scrollTo(0, 0);
      }, 40);
    }
  }, {
    key: "setAnimationDuration",
    value: function setAnimationDuration(duration) {
      this.parent.style.transition = "transform ".concat(duration, "ms ease-out");
    }
  }, {
    key: "setSideNavigation",
    value: function setSideNavigation() {
      var _this = this;

      if (!this.dots) {
        return;
      }

      document.body.insertAdjacentHTML('beforeEnd', _consts.DOM.sidebarNav);
      this.sections.forEach(function (section) {
        _this.sectionNavigation += "\n        <div class=\"".concat(_consts.CLASSES.sidebarNavButton, "\">\n          <span class=\"").concat(_consts.CLASSES.sidebarNavItem, "\">\n          ").concat(section.dataset.target, "\n          </span>\n        </div>\n      ");
      });
      document.querySelector(".".concat(_consts.CLASSES.sidebarNav)).innerHTML = this.sectionNavigation;
      this.buttons = document.querySelectorAll(".".concat(_consts.CLASSES.sidebarNavButton));
      this.buttons[this.currentPage].classList.add(_consts.CLASSES.sidebarNavButtonActive);
      this.buttons.forEach(function (button, index) {
        button.addEventListener('click', function () {
          _functions.default.removeActiveClass();

          button.classList.add(_consts.CLASSES.sidebarNavButtonActive);
          _this.currentPage = index;

          _this.goto();
        });
      });
    } // debounceFunction(f, ms) {
    //   return function () {
    //     if (!this.animationFinished) {
    //       return;
    //     }
    //     f.apply(this, arguments);
    //     this.animationFinished = false;
    //     setTimeout(() => this.animationFinished = true, ms);
    //   };
    // }

  }, {
    key: "goto",
    value: function goto() {
      var _this2 = this;

      if (this.onStart) {
        this.onStart();
      }

      this.parent.style.transform = "translateY(-".concat(this.currentPage * _consts.VIEWPORT_HEIGHT, "vh)");

      _functions.default.removeActiveClass();

      this.buttons[this.currentPage].classList.add(_consts.CLASSES.sidebarNavButtonActive);

      if (this.onEnd) {
        setTimeout(function () {
          _this2.onEnd();
        }, this.duration);
      }
    }
  }, {
    key: "addScrollListener",
    value: function addScrollListener() {
      var _this3 = this;

      window.addEventListener('mousewheel', function (event) {
        if (!_this3.animationFinished) {
          return;
        }

        if (_this3.callback.start) {
          _this3.callback.start();
        }

        if (event.deltaY > 0) {
          _this3.currentPage += _this3.currentPage < _this3.sections.length - 1 ? 1 : 0;
        } else {
          _this3.currentPage -= _this3.currentPage > 0 ? 1 : 0;
        } // this.debounce = this.debounceFunction(() => {
        //   this.goto();
        // }, this.duration);
        // this.debounce();


        _this3.goto();

        setTimeout(function () {
          if (_this3.callback.end) {
            _this3.callback.end();
          }
        }, _this3.duration);
      });
    }
  }, {
    key: "on",
    value: function on(point, func) {
      this.callback[point] = func;
    }
  }]);

  return MyFullPage;
}();

var config = {
  duration: 1000,
  dots: true
};
var fullPage = new MyFullPage(config);
fullPage.on('start', _functions.default.runAtStart);
fullPage.on('end', _functions.default.runAtEnd);
},{"../helpers/_consts":"helpers/_consts.js","../helpers/_functions":"helpers/_functions.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63337" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts/newNavigation.js"], null)
//# sourceMappingURL=/newNavigation.73fa0f58.js.map