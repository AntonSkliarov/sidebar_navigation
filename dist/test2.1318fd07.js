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
})({"scripts/test2.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

var _renderNav = new WeakSet();

var _setActive = new WeakSet();

var _setup = new WeakSet();

var PageScroll = /*#__PURE__*/function () {
  function PageScroll(selector, opts) {
    _classCallCheck(this, PageScroll);

    _setup.add(this);

    _setActive.add(this);

    _renderNav.add(this);

    this.$root = document.querySelector(selector);
    this.$sections = this.$root.querySelectorAll('.section');
    this.opts = opts;
    this.$up = null;
    this.$down = null;
    this.level = 0;
    this.bound = this.$sections.length;
    this.isAnimating = false;

    _classPrivateMethodGet(this, _setup, _setup2).call(this);
  }

  _createClass(PageScroll, [{
    key: "moveup",
    value: function moveup() {
      var _this = this;

      if (this.level != 0 && !this.isAnimating) {
        this.isAnimating = true;
        this.level--;
        this.$sections.forEach(function (elem) {
          return elem.style.transform = "translateY(".concat(-_this.level * 100, "%)");
        });
        setTimeout(function () {
          _this.isAnimating = false;
        }, this.opts.animDuration || 300);

        _classPrivateMethodGet(this, _setActive, _setActive2).call(this, this.level);
      }
    }
  }, {
    key: "movedown",
    value: function movedown() {
      var _this2 = this;

      if (this.level + 1 < this.bound && !this.isAnimating) {
        this.isAnimating = true;
        this.level++;
        this.$sections.forEach(function (elem) {
          return elem.style.transform = "translateY(".concat(-_this2.level * 100, "%)");
        });
        setTimeout(function () {
          _this2.isAnimating = false;
        }, this.opts.animDuration || 300);

        _classPrivateMethodGet(this, _setActive, _setActive2).call(this, this.level);
      }
    }
  }, {
    key: "moveto",
    value: function moveto(pos) {
      var _this3 = this;

      if (pos >= 0 && pos <= this.bound) {
        var movingTo = this.level - pos;
        console.log(movingTo * 100);
        this.$sections.forEach(function (elem) {
          return elem.style.transform = "translateY(".concat((movingTo - _this3.level) * 100, "%)");
        });
        this.level = pos;
      }
    }
  }]);

  return PageScroll;
}();

var _renderNav2 = function _renderNav2() {
  var arrows = "<svg id='control-up' width=\"40\" height=\"35\" viewBox=\"0 0 40 35\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M17.4019 1.5C18.5566 -0.5 21.4434 -0.5 22.5981 1.5L39.0526 30C40.2073 32 38.7639 34.5 36.4545 34.5H3.54552C1.23612 34.5 -0.207259 32 0.947441 30L17.4019 1.5Z\" fill=\"".concat(this.opts.controlColor || 'white', "\"/>\n        </svg>\n        <svg id='control-down' width=\"40\" height=\"35\" viewBox=\"0 0 40 35\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M17.4019 1.5C18.5566 -0.5 21.4434 -0.5 22.5981 1.5L39.0526 30C40.2073 32 38.7639 34.5 36.4545 34.5H3.54552C1.23612 34.5 -0.207259 32 0.947441 30L17.4019 1.5Z\" fill=\"").concat(this.opts.controlColor || 'white', "\"/>\n        </svg>\n        ");
  var container = document.createElement("div");
  container.id = container.classList = 'controllers';
  container.innerHTML = arrows;
  this.$root.appendChild(container);
};

var _setActive2 = function _setActive2(index) {
  this.opts.nav[index].classList.add('active-link');

  for (var j = 0; j < this.opts.nav.length; j++) {
    if (index != j) {
      this.opts.nav[j].classList.remove('active-link');
    }
  }
};

var _setup2 = function _setup2() {
  var _this4 = this;

  _classPrivateMethodGet(this, _renderNav, _renderNav2).call(this);

  this.$up = document.querySelector('#control-up');
  this.$down = document.querySelector('#control-down');
  this.$sections.forEach(function (elem) {
    return elem.style.transition = "transform ".concat(+_this4.opts.animDuration / 1000 + 's' || '0.3s');
  });
  this.$sections.forEach(function (elem) {
    return elem.style.transitionTimingFunction = _this4.opts.easing ? _this4.opts.easing : 'linear';
  });
  this.moveup = this.moveup.bind(this);
  this.movedown = this.movedown.bind(this);
  this.$up.addEventListener('click', this.moveup);
  this.$down.addEventListener('click', this.movedown);
  this.$root.addEventListener('wheel', function (event) {
    if (event.deltaY > 0) _this4.movedown();else _this4.moveup();
  });

  if (this.opts.nav) {
    var _loop = function _loop(i) {
      _this4.opts.nav[i].addEventListener('click', function () {
        _this4.moveto(i);

        _classPrivateMethodGet(_this4, _setActive, _setActive2).call(_this4, i);
      });
    };

    for (var i = 0; i < this.opts.nav.length; i++) {
      _loop(i);
    }
  }
};

new PageScroll('.main-content', {
  animDuration: 1000,
  // 2 seconds
  // easing: 'cubic-bezier(.17,.67,.83,.67)', //animation easing
  controlColor: '#ccc' // color of navigation arrows

});
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54844" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts/test2.js"], null)
//# sourceMappingURL=/test2.1318fd07.js.map