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
exports.DEFAULT_DURATION = exports.VIEWPORT_HEIGHT = exports.DOM = exports.CLASSES = void 0;
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
var DEFAULT_DURATION = 500;
exports.DEFAULT_DURATION = DEFAULT_DURATION;
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
  }
};
var _default = FUNC;
exports.default = _default;
},{"./_consts":"helpers/_consts.js"}],"../node_modules/debounce/index.js":[function(require,module,exports) {
/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing. The function also has a property 'clear' 
 * that is a function which will clear the timer to prevent previously scheduled executions. 
 *
 * @source underscore.js
 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 * @param {Function} function to wrap
 * @param {Number} timeout in ms (`100`)
 * @param {Boolean} whether to execute at the beginning (`false`)
 * @api public
 */
function debounce(func, wait, immediate){
  var timeout, args, context, timestamp, result;
  if (null == wait) wait = 100;

  function later() {
    var last = Date.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        context = args = null;
      }
    }
  };

  var debounced = function(){
    context = this;
    args = arguments;
    timestamp = Date.now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };

  debounced.clear = function() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };
  
  debounced.flush = function() {
    if (timeout) {
      result = func.apply(context, args);
      context = args = null;
      
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
};

// Adds compatibility for ES modules
debounce.debounce = debounce;

module.exports = debounce;

},{}],"scripts/sidebarNavigation.js":[function(require,module,exports) {
"use strict";

var _consts = require("../helpers/_consts");

var _functions = _interopRequireDefault(require("../helpers/_functions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var debounce = require('debounce');

var MyFullPage = /*#__PURE__*/function () {
  function MyFullPage(config) {
    _classCallCheck(this, MyFullPage);

    this.sections = config.sections || _consts.DOM.sections;
    this.duration = config.duration || _consts.DEFAULT_DURATION;
    this.parent = config.parent || _consts.DOM.parent;
    this.spinValue = config.spinValue || 0;
    this.canScroll = config.canScroll || true;
    this.onEnd = config.onEnd || null;
    this.onStart = config.onStart || null;
    this.dots = config.dots || false;
    this.sectionNavigation = '';
    this.onMouseWheel();
    this.setAnimationDuration(this.duration);
    this.generateNavigation(this.dots); // this.onScroll();
    // this.currentScrollTop = window.scrollY;
  }

  _createClass(MyFullPage, [{
    key: "scrollContent",
    value: function scrollContent() {
      var _this = this;

      if (this.onStart) {
        this.onStart();
      }

      this.parent.style.transform = "translateY(-".concat(this.spinValue * _consts.VIEWPORT_HEIGHT, "vh)");

      _functions.default.removeActiveClass();

      this.buttons[this.spinValue].classList.add(_consts.CLASSES.sidebarNavButtonActive);

      if (this.onEnd) {
        setTimeout(function () {
          _this.onEnd();
        }, this.duration);
      }
    }
  }, {
    key: "onMouseWheel",
    value: function onMouseWheel() {
      var _this2 = this;

      var throttle = function throttle(func, delay) {
        var lastTime = 0;
        return function wrapper() {
          var now = new Date();

          if (now - lastTime >= delay) {
            func.apply(void 0, arguments);
            lastTime = now;
          }
        };
      };

      var wheelHandler = function wheelHandler(event) {
        if (event.deltaY > 0) {
          _this2.spinValue += _this2.spinValue < _this2.sections.length - 1 ? 1 : 0;
        } else {
          _this2.spinValue -= _this2.spinValue > 0 ? 1 : 0;
        }

        _this2.scrollContent();
      };

      window.addEventListener('wheel', debounce(wheelHandler, this.duration));
    }
  }, {
    key: "setAnimationDuration",
    value: function setAnimationDuration(duration) {
      this.parent.style.transition = "transform ".concat(duration, "ms ease-out");
    } // in progress - start
    // onScroll() {
    //   const throttle = (func, delay) => {
    //     let time = Date.now();
    //     return function wrapper() {
    //       if ((time + delay - Date.now()) < 0) {
    //         func();
    //         time = Date.now();
    //       }
    //     };
    //   };
    //   const scrollHandler = () => {
    //     if (window.scrollY > 0) {
    //       this.spinValue += this.spinValue < (this.sections.length - 1) ? 1 : 0;
    //     } else {
    //       this.spinValue -= this.spinValue > 0 ? 1 : 0;
    //     }
    //     this.scrollContent();
    //     console.log('scrolled');
    //     console.log('window.scrollY: ', window.scrollY);
    //   };
    //   document.addEventListener('scroll', throttle(scrollHandler, 1000));
    // }
    // in progress - end

  }, {
    key: "generateNavigation",
    value: function generateNavigation(dots) {
      var _this3 = this;

      if (!dots) {
        return;
      }

      document.body.insertAdjacentHTML('beforeEnd', _consts.DOM.sidebarNav);
      this.sections.forEach(function (section) {
        _this3.sectionNavigation += "\n        <div class=\"".concat(_consts.CLASSES.sidebarNavButton, "\">\n          <span class=\"").concat(_consts.CLASSES.sidebarNavItem, "\">\n          ").concat(section.dataset.target, "\n          </span>\n        </div>\n      ");
      });
      document.querySelector(".".concat(_consts.CLASSES.sidebarNav)).innerHTML = this.sectionNavigation;
      this.buttons = document.querySelectorAll(".".concat(_consts.CLASSES.sidebarNavButton));
      this.buttons[this.spinValue].classList.add(_consts.CLASSES.sidebarNavButtonActive);
      this.buttons.forEach(function (button, index) {
        button.addEventListener('click', function () {
          _functions.default.removeActiveClass();

          button.classList.add(_consts.CLASSES.sidebarNavButtonActive);
          _this3.spinValue = index;

          _this3.scrollContent();
        });
      });
    }
  }, {
    key: "on",
    value: function on(point, func) {
      switch (point) {
        case 'end':
          this.onEnd = func;
          break;

        case 'start':
          this.onStart = func;
          break;

        default:
          this.onEnd = null;
          this.onStart = null;
      }
    }
  }, {
    key: "goTo",
    value: function goTo(sectionNumber) {
      this.spinValue = sectionNumber;
      this.scrollContent();
    }
  }]);

  return MyFullPage;
}();

var config = {
  sections: null,
  duration: 1000,
  parent: null,
  spinValue: null,
  canScroll: null,
  onEnd: null,
  onStart: null,
  dots: true
};
var newNavigation = new MyFullPage(config);
newNavigation.on('end', _functions.default.runAtEnd);
newNavigation.on('start', _functions.default.runAtStart); // newNavigation.goTo(0);
},{"../helpers/_consts":"helpers/_consts.js","../helpers/_functions":"helpers/_functions.js","debounce":"../node_modules/debounce/index.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59576" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts/sidebarNavigation.js"], null)
//# sourceMappingURL=/sidebarNavigation.5b19f901.js.map