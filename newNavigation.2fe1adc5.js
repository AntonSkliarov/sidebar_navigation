parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"UAzc":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.VIEWPORT_HEIGHT=exports.DOM=exports.CLASSES=void 0;var e={sidebarNav:"sidebar-nav",sidebarNavButton:"sidebar-nav__button",sidebarNavButtonActive:"sidebar-nav__button_is-active",sidebarNavItem:"sidebar-nav__item"};exports.CLASSES=e;var t={parent:document.querySelector(".main-content"),sections:document.querySelectorAll(".section"),sidebarNav:'<div class="'.concat(e.sidebarNav,'"></div>')};exports.DOM=t;var a=100;exports.VIEWPORT_HEIGHT=a;
},{}],"aMcj":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t=require("./_consts"),e={runAtEnd:function(){console.log("I run at the end")},runAtStart:function(){console.log("I run at the start")},removeActiveClass:function(){document.querySelector(".".concat(t.CLASSES.sidebarNavButtonActive)).classList.remove(t.CLASSES.sidebarNavButtonActive)},throttle:function(t,e,n){var o=!1;return function(){if(!o){for(var r=arguments.length,u=new Array(r),a=0;a<r;a++)u[a]=arguments[a];t.apply(e,u),o=!0,setTimeout(function(){o=!1},n)}}}},n=e;exports.default=n;
},{"./_consts":"UAzc"}],"XS8Z":[function(require,module,exports) {
"use strict";var t=require("../helpers/_consts"),n=e(require("../helpers/_functions"));function e(t){return t&&t.__esModule?t:{default:t}}function i(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function a(t,n){for(var e=0;e<n.length;e++){var i=n[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function o(t,n,e){return n&&a(t.prototype,n),e&&a(t,e),t}function s(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}var r=function(){function e(n){i(this,e),s(this,"l",void 0),this.sections=n.sections||t.DOM.sections,this.sectionsCount=this.sections.length,this.animationFinished=!0,this.dots=n.dots||!1,this.currentPage=0,this.debounce=null,this.duration=n.duration||500,this.callback={start:null,end:null},this.sectionNavigation="",this.parent=n.parent||t.DOM.parent,this.init()}return o(e,[{key:"init",value:function(){this.refreshPageToTop(),this.setSideNavigation(),this.addScrollListener(),this.setAnimationDuration(this.duration)}},{key:"refreshPageToTop",value:function(){setTimeout(function(){window.scrollTo(0,0)},40)}},{key:"setAnimationDuration",value:function(t){console.log(this.parent),this.parent.style.transition="transform ".concat(t,"ms ease-out")}},{key:"setSideNavigation",value:function(){var e=this;this.dots&&(document.body.insertAdjacentHTML("beforeEnd",t.DOM.sidebarNav),this.sections.forEach(function(n){e.sectionNavigation+='\n        <div class="'.concat(t.CLASSES.sidebarNavButton,'">\n          <span class="').concat(t.CLASSES.sidebarNavItem,'">\n          ').concat(n.dataset.target,"\n          </span>\n        </div>\n      ")}),document.querySelector(".".concat(t.CLASSES.sidebarNav)).innerHTML=this.sectionNavigation,this.buttons=document.querySelectorAll(".".concat(t.CLASSES.sidebarNavButton)),this.buttons[this.currentPage].classList.add(t.CLASSES.sidebarNavButtonActive),this.buttons.forEach(function(i,a){i.addEventListener("click",function(){n.default.removeActiveClass(),i.classList.add(t.CLASSES.sidebarNavButtonActive),e.currentPage=a,e.scrollContent()})}))}},{key:"debounceFunction",value:function(t,n){return function(){var e=this;this.animationFinished&&(t.apply(this,arguments),this.animationFinished=!1,setTimeout(function(){return e.animationFinished=!0},n))}}},{key:"goto",value:function(){var e=this;this.onStart&&this.onStart(),this.parent.style.transform="translateY(-".concat(this.currentPage*t.VIEWPORT_HEIGHT,"vh)"),n.default.removeActiveClass(),this.buttons[this.currentPage].classList.add(t.CLASSES.sidebarNavButtonActive),this.onEnd&&setTimeout(function(){e.onEnd()},this.duration)}},{key:"addScrollListener",value:function(){var t=this;window.addEventListener("mousewheel",function(n){t.animationFinished&&(t.callback.start&&t.callback.start(),n.deltaY>0?t.currentPage+=t.currentPage<t.sections.length-1?1:0:t.currentPage-=t.currentPage>0?1:0,t.debounce=t.debounceFunction(function(){t.goto()},t.duration),t.debounce(),setTimeout(function(){t.callback.end&&t.callback.end()},t.duration))})}},{key:"on",value:function(t,n){this.callback[t]=n}}]),e}(),c={duration:1e3,dots:!0},u=new r(c);u.on("start",n.default.runAtStart),u.on("end",n.default.runAtEnd);
},{"../helpers/_consts":"UAzc","../helpers/_functions":"aMcj"}]},{},["XS8Z"], null)
//# sourceMappingURL=newNavigation.2fe1adc5.js.map