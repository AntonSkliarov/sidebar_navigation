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
})({"scripts/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * utils 为工具函数，对原生API做兼容性处理及提取公共方法
 */
var utils = {
  // 鼠标滚轮事件
  getWheelDelta: function getWheelDelta(event) {
    if (event.wheelDelta) {
      // 第一次调用之后惰性载入
      this.getWheelDelta = function (e) {
        return e.wheelDelta;
      }; // 第一次调用使用


      return event.wheelDelta;
    } // 兼容火狐


    this.getWheelDelta = function (e) {
      return -e.detail;
    };

    return -event.detail;
  },
  // 防抖动函数，method 回调函数，context 上下文，event 传入的时间，delay 延迟函数
  // 调用的时候直接执行，注意和 throttle 在使用的时候的区别
  debounce: function debounce(method, context, event, delay) {
    clearTimeout(method.tId);
    method.tId = setTimeout(function () {
      method.call(context, event);
    }, delay);
  },
  // 截流函数，method 回调函数，context 上下文，delay 延迟函数，
  // 返回的是一个函数
  throttle: function throttle(method, context, delay) {
    var wait = false;
    return function () {
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
  },
  // 删除 类名
  deleteClassName: function deleteClassName(el, className) {
    if (el.classList.contains(className)) {
      el.classList.remove(className);
    }
  },
  // polyfill Object.assign
  polyfill: function polyfill() {
    if (typeof Object.assign !== 'function') {
      Object.defineProperty(Object, 'assign', {
        value: function assign(target) {
          if (target == null) {
            throw new TypeError('Cannot convert undefined or null to object');
          }

          var to = Object(target);

          for (var index = 1; index < arguments.length; index += 1) {
            var nextSource = arguments[index];

            if (nextSource != null) {
              for (var nextKey in nextSource) {
                if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                  to[nextKey] = nextSource[nextKey];
                }
              }
            }
          }

          return to;
        },
        writable: true,
        configurable: true
      });
    }
  }
};
var _default = utils;
exports.default = _default;
},{}],"scripts/test.js":[function(require,module,exports) {
"use strict";

var _utils = _interopRequireDefault(require("./utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Полноэкранная логика прокрутки
 */
var PureFullPage = /*#__PURE__*/function () {
  function PureFullPage(options) {
    _classCallCheck(this, PureFullPage);

    // распределение по умолчанию
    var defaultOptions = {
      isShowNav: true,
      delay: 1000 // definePages: () => { },

    };

    _utils.default.polyfill(); // объединить пользовательскую конфигурацию
    // this.options = Object.assign(defaultOptions, options);


    this.options = options || defaultOptions; // Привязываем пользовательскую функцию к экземпляру this
    // this.options.definePages = this.options.definePages.bind(this);
    // Получить контейнер перелистывания страниц

    this.container = document.querySelector('.main-content'); // Получаем общее количество страниц, использованных при создании правой точки навигации

    this.pages = document.querySelectorAll('.section');
    this.pagesNum = this.pages.length; // Инициализируем навигацию с правой стороны для дальнейшего использования

    this.navDots = []; // Получить текущую высоту просмотра

    this.viewHeight = document.documentElement.clientHeight; // Текущая позиция, отрицательное значение представляет собой
    // смещение вниз от верха окна просмотра

    this.currentPosition = 0; // время задержки функции перехвата / интервала, миллисекунды

    this.DELAY = this.options.delay; // Чтобы определить направление скольжения, нужно определить только ординату

    this.startY = undefined;
    /**
     * Инициализация
     */

    this.init();
  } // Повторное получение позиции при изменении размера окна


  _createClass(PureFullPage, [{
    key: "getNewPosition",
    value: function getNewPosition() {
      this.viewHeight = document.documentElement.clientHeight;
      this.container.style.height = "".concat(this.viewHeight, "px");
      var activeNavIndex;
      this.navDots.forEach(function (e, i) {
        if (e.classList.contains('active')) {
          activeNavIndex = i;
        }
      });
      this.currentPosition = -(activeNavIndex * this.viewHeight);
      this.turnPage(this.currentPosition);
    }
  }, {
    key: "handleWindowResize",
    value: function handleWindowResize(event) {
      // Устанавливаем функцию защиты от сотрясения
      _utils.default.debounce(this.getNewPosition, this, event, this.DELAY);
    } // переход на страницу

  }, {
    key: "turnPage",
    value: function turnPage(height) {
      this.container.style.top = "".concat(height, "px");
    } // Изменяем стиль при прокрутке страницы

  }, {
    key: "changeNavStyle",
    value: function changeNavStyle(height) {
      if (this.options.isShowNav) {
        this.navDots.forEach(function (el) {
          _utils.default.deleteClassName(el, 'active');
        });
        var i = -(height / this.viewHeight);
        this.navDots[i].classList.add('active');
      }
    } // Создание навигации по правой стороне

  }, {
    key: "createNav",
    value: function createNav() {
      var _this = this;

      var nav = document.createElement('div');
      nav.className = 'nav';
      this.container.appendChild(nav); // Есть несколько страниц, показывающих несколько точек

      for (var i = 0; i < this.pagesNum; i += 1) {
        nav.innerHTML += '<p class="nav-dot"><span></span></p>';
      }

      var navDots = document.querySelectorAll('.nav-dot');
      this.navDots = Array.prototype.slice.call(navDots); // Добавляем начальный стиль

      this.navDots[0].classList.add('active'); // Добавить событие click по точке навигации

      this.navDots.forEach(function (el, i) {
        el.addEventListener('click', function () {
          // переход на страницу
          _this.currentPosition = -(i * _this.viewHeight); // Обрабатываем пользовательские функции
          // this.options.definePages();

          _this.turnPage(_this.currentPosition); // изменить стиль


          _this.navDots.forEach(function (el) {
            _utils.default.deleteClassName(el, 'active');
          });

          el.classList.add('active');
        });
      });
    }
  }, {
    key: "goUp",
    value: function goUp() {
      // Страница прокручивается вверх только тогда, когда есть страницы вверху страницы
      if (-this.container.offsetTop >= this.viewHeight) {
        // Повторно укажите currentPosition текущей страницы из верхней части представления,
        // чтобы обеспечить полноэкранную прокрутку.CurrentPosition - отрицательное значение,
        // и чем больше значение, тем меньше часть за верхним
        this.currentPosition += this.viewHeight;
        this.turnPage(this.currentPosition);
        this.changeNavStyle(this.currentPosition); // Обрабатываем пользовательские функции
        // this.options.definePages();
      }
    }
  }, {
    key: "goDown",
    value: function goDown() {
      // Страница прокручивается вниз только тогда, когда есть страницы внизу страницы
      if (-this.container.offsetTop <= this.viewHeight * (this.pagesNum - 2)) {
        // Повторно укажите currentPosition текущей страницы из верхней части представления,
        // чтобы обеспечить полноэкранную прокрутку.CurrentPosition - отрицательное значение,
        // и чем меньше значение, тем больше часть за верхним
        this.currentPosition -= this.viewHeight;
        this.turnPage(this.currentPosition);
        this.changeNavStyle(this.currentPosition); // Обработка пользовательских функций
        // this.options.definePages();
      }
    } // Логика прокрутки мыши (логика клавиш для полноэкранной прокрутки)

  }, {
    key: "scrollMouse",
    value: function scrollMouse(event) {
      var delta = _utils.default.getWheelDelta(event); // дельта <0, прокрутка мыши вперед, прокрутка страницы вниз


      if (delta < 0) {
        this.goDown();
      } else {
        this.goUp();
      }
    } // событие сенсорного экрана

  }, {
    key: "touchEnd",
    value: function touchEnd(event) {
      var endY = event.changedTouches[0].pageY;

      if (endY - this.startY < 0) {
        // Проведите пальцем вверх, прокрутите соответствующую страницу вниз
        this.goDown();
      } else {
        // Проведите пальцем вниз, прокрутите соответствующую страницу вверх
        this.goUp();
      }
    } // Функция инициализации

  }, {
    key: "init",
    value: function init() {
      var _this2 = this;

      this.container.style.height = "".concat(this.viewHeight, "px"); // Создание точечной навигации

      if (this.options.isShowNav) {
        this.createNav();
      } // Устанавливаем функцию перехвата


      var handleMouseWheel = _utils.default.throttle(this.scrollMouse, this, this.DELAY); // Мониторинг колесика мыши, события прокрутки мыши Firefox отличаются от других


      if (navigator.userAgent.toLowerCase().indexOf('firefox') === -1) {
        document.addEventListener('mousewheel', handleMouseWheel);
      } else {
        document.addEventListener('DOMMouseScroll', handleMouseWheel);
      } // сенсорный экран мобильного телефона


      document.addEventListener('touchstart', function (event) {
        _this2.startY = event.touches[0].pageY;
      });

      var handleTouchEnd = _utils.default.throttle(this.touchEnd, this, 500);

      document.addEventListener('touchend', handleTouchEnd);
      document.addEventListener('touchmove', function (event) {
        event.preventDefault();
      }); // Сбрасываем позицию при изменении размера окна

      window.addEventListener('resize', this.handleWindowResize.bind(this));
    }
  }]);

  return PureFullPage;
}();

var fullpage = new PureFullPage({
  delay: 1000
});
},{"./utils":"scripts/utils.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50716" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts/test.js"], null)
//# sourceMappingURL=/test.c9078b0e.js.map