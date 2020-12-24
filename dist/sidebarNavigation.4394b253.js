parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"UAzc":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.MS_COEFFICIENT=exports.ANIMATION_DELAY=exports.VIEWPORT_HEIGHT=exports.DOM=exports.CLASSES=void 0;var e={sidebarNav:"sidebar-nav",sidebarNavButton:"sidebar-nav__button",sidebarNavButtonActive:"sidebar-nav__button_is-active",sidebarNavItem:"sidebar-nav__item"};exports.CLASSES=e;var t={content:document.querySelector(".main-content"),sections:document.querySelectorAll(".section"),sidebarNav:'<div class="'.concat(e.sidebarNav,'"></div>')};exports.DOM=t;var r=100;exports.VIEWPORT_HEIGHT=r;var a=1;exports.ANIMATION_DELAY=a;var s=1e3;exports.MS_COEFFICIENT=s;
},{}],"aMcj":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t=require("./_consts"),e={runAtEnd:function(){console.log("I run at the end")},runAtStart:function(){console.log("I run at the start")},removeActiveClass:function(){document.querySelector(".".concat(t.CLASSES.sidebarNavButtonActive)).classList.remove(t.CLASSES.sidebarNavButtonActive)}},o=e;exports.default=o;
},{"./_consts":"UAzc"}],"CiKE":[function(require,module,exports) {
"use strict";var n=require("../helpers/_consts"),t=e(require("../helpers/_functions"));function e(n){return n&&n.__esModule?n:{default:n}}function s(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function i(n,t){for(var e=0;e<t.length;e++){var s=t[e];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(n,s.key,s)}}function a(n,t,e){return t&&i(n.prototype,t),e&&i(n,e),n}var o=function(){function e(){s(this,e),this.sections=n.DOM.sections,this.content=n.DOM.content,this.spinValue=0,this.canScroll=!0,this.sectionNavigation="",this.onEndRunFunc=null,this.onStartRunFunc=null,this.setScroll()}return a(e,[{key:"scrollContent",value:function(){var e=this;this.onStartRunFunc&&this.onStartRunFunc(),this.content.style.transform="translateY(-".concat(this.spinValue*n.VIEWPORT_HEIGHT,"vh)"),t.default.removeActiveClass(),this.buttons[this.spinValue].classList.add(n.CLASSES.sidebarNavButtonActive),this.onEndRunFunc&&setTimeout(function(){e.onEndRunFunc()},n.ANIMATION_DELAY*n.MS_COEFFICIENT)}},{key:"setScroll",value:function(){var t=this;window.addEventListener("mousewheel",function(e){t.canScroll&&(t.canScroll=!1,e.deltaY>0?t.spinValue+=t.spinValue<t.sections.length-1?1:0:t.spinValue-=t.spinValue>0?1:0,t.scrollContent()),setTimeout(function(){t.canScroll=!0},n.ANIMATION_DELAY*n.MS_COEFFICIENT)})}},{key:"setAnimationDuration",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:n.ANIMATION_DELAY;t&&(this.content.style.transition="transform ".concat(t,"s ease-out"))}},{key:"setNavigation",value:function(){var e=this;document.body.insertAdjacentHTML("beforeEnd",n.DOM.sidebarNav),this.sections.forEach(function(t){e.sectionNavigation+='\n        <div class="'.concat(n.CLASSES.sidebarNavButton,'">\n          <span class="').concat(n.CLASSES.sidebarNavItem,'">\n          ').concat(t.dataset.target,"\n          </span>\n        </div>\n      ")}),document.querySelector(".".concat(n.CLASSES.sidebarNav)).innerHTML=this.sectionNavigation,this.buttons=document.querySelectorAll(".".concat(n.CLASSES.sidebarNavButton)),this.buttons[0].classList.add(n.CLASSES.sidebarNavButtonActive),this.buttons.forEach(function(s,i){s.addEventListener("click",function(){t.default.removeActiveClass(),s.classList.add(n.CLASSES.sidebarNavButtonActive),e.spinValue=i,e.scrollContent()})})}},{key:"setFuncOnPoint",value:function(n,t){switch(n){case"end":this.onEndRunFunc=t;break;case"start":this.onStartRunFunc=t;break;default:this.onEndRunFunc=null,this.onStartRunFunc=null}}},{key:"goTo",value:function(n){this.spinValue=n,this.scrollContent()}}]),e}(),c=new o;c.setNavigation(),c.setAnimationDuration(),c.setFuncOnPoint("end",t.default.runAtEnd),c.setFuncOnPoint("start",t.default.runAtStart),c.goTo(1);
},{"../helpers/_consts":"UAzc","../helpers/_functions":"aMcj"}]},{},["CiKE"], null)
//# sourceMappingURL=sidebarNavigation.4394b253.js.map