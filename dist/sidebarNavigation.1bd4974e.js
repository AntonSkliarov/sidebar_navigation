parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"UAzc":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.DOM=exports.CLASSES=void 0;var e={sidebarNav:"sidebar-nav",sidebarNavButton:"sidebar-nav__button",sidebarNavButtonActive:"sidebar-nav__button_is-active",sidebarNavItem:"sidebar-nav__item"};exports.CLASSES=e;var t={content:document.querySelector(".main-content"),sections:document.querySelectorAll(".section"),sidebarNav:'<div class="'.concat(e.sidebarNav,'"></div>')};exports.DOM=t;
},{}],"CiKE":[function(require,module,exports) {
"use strict";var t=require("../helpers/_consts");function n(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function e(t,n){for(var e=0;e<n.length;e++){var s=n[e];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}function s(t,n,s){return n&&e(t.prototype,n),s&&e(t,s),t}var i=function(){function e(){n(this,e),this.sections=t.DOM.sections,this.content=t.DOM.content,this.spinValue=0,this.canScroll=!0,this.sectionNavigation="",this.onEndRunFunc=null,this.onStartRunFunc=null}return s(e,[{key:"setScroll",value:function(){var t=this;window.addEventListener("mousewheel",function(n){t.canScroll&&(t.canScroll=!1,n.deltaY>0?t.spinValue+=t.spinValue<t.sections.length-1?1:0:t.spinValue-=t.spinValue>0?1:0,t.scrollContent()),setTimeout(function(){t.canScroll=!0},1e3)})}},{key:"scrollContent",value:function(){var n=this;this.onStartRunFunc&&this.onStartRunFunc(),this.content.style.transform="translateY(-".concat(100*this.spinValue,"vh)"),document.querySelector(".".concat(t.CLASSES.sidebarNavButtonActive)).classList.remove(t.CLASSES.sidebarNavButtonActive),this.buttons[this.spinValue].classList.add(t.CLASSES.sidebarNavButtonActive),this.onEndRunFunc&&setTimeout(function(){n.onEndRunFunc()},1e3)}},{key:"setAnimationDuration",value:function(t){t&&(this.content.style.transition="transform ".concat(t,"s ease-out"))}},{key:"setNavigation",value:function(){var n=this;document.body.insertAdjacentHTML("beforeEnd",t.DOM.sidebarNav),this.sections.forEach(function(e){n.sectionNavigation+='\n        <div class="'.concat(t.CLASSES.sidebarNavButton,'">\n          <span class="').concat(t.CLASSES.sidebarNavItem,'">\n          ').concat(e.dataset.target,"\n          </span>\n        </div>\n      ")}),document.querySelector(".".concat(t.CLASSES.sidebarNav)).innerHTML=this.sectionNavigation,this.buttons=document.querySelectorAll(".".concat(t.CLASSES.sidebarNavButton)),this.buttons[0].classList.add(t.CLASSES.sidebarNavButtonActive),this.buttons.forEach(function(e,s){e.addEventListener("click",function(){document.querySelector(".".concat(t.CLASSES.sidebarNavButtonActive)).classList.remove(t.CLASSES.sidebarNavButtonActive),e.classList.add(t.CLASSES.sidebarNavButtonActive),n.spinValue=s,n.scrollContent()})})}},{key:"setFuncOnPoint",value:function(t,n){switch(t){case"end":this.onEndRunFunc=n;break;case"start":this.onStartRunFunc=n;break;default:this.onEndRunFunc=null,this.onStartRunFunc=null}}},{key:"goTo",value:function(t){this.spinValue=t,this.scrollContent()}}]),e}(),o=function(){console.log("I run at the end")},a=function(){console.log("I run at the start")},c=new i;c.setScroll(),c.setNavigation(),c.setAnimationDuration(1),c.setFuncOnPoint("end",o),c.setFuncOnPoint("start",a);
},{"../helpers/_consts":"UAzc"}]},{},["CiKE"], null)
//# sourceMappingURL=sidebarNavigation.1bd4974e.js.map