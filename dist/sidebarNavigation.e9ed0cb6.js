parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"UAzc":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.DEFAULT_DURATION=exports.VIEWPORT_HEIGHT=exports.DOM=exports.CLASSES=void 0;var e={sidebarNav:"sidebar-nav",sidebarNavButton:"sidebar-nav__button",sidebarNavButtonActive:"sidebar-nav__button_is-active",sidebarNavItem:"sidebar-nav__item"};exports.CLASSES=e;var t={parent:document.querySelector(".main-content"),sections:document.querySelectorAll(".section"),sidebarNav:'<div class="'.concat(e.sidebarNav,'"></div>')};exports.DOM=t;var r=100;exports.VIEWPORT_HEIGHT=r;var a=500;exports.DEFAULT_DURATION=a;
},{}],"aMcj":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t=require("./_consts"),e={runAtEnd:function(){console.log("I run at the end")},runAtStart:function(){console.log("I run at the start")},removeActiveClass:function(){document.querySelector(".".concat(t.CLASSES.sidebarNavButtonActive)).classList.remove(t.CLASSES.sidebarNavButtonActive)}},o=e;exports.default=o;
},{"./_consts":"UAzc"}],"CiKE":[function(require,module,exports) {
"use strict";var t=require("../helpers/_consts"),n=e(require("../helpers/_functions"));function e(t){return t&&t.__esModule?t:{default:t}}function s(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function i(t,n){for(var e=0;e<n.length;e++){var s=n[e];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}function o(t,n,e){return n&&i(t.prototype,n),e&&i(t,e),t}var a=function(){function e(n){s(this,e),this.sections=n.sections||t.DOM.sections,this.duration=n.duration||t.DEFAULT_DURATION,this.parent=n.parent||t.DOM.parent,this.spinValue=n.spinValue||0,this.canScroll=n.canScroll||!0,this.onEnd=n.onEnd||null,this.onStart=n.onStart||null,this.dots=n.dots||!1,this.sectionNavigation="",this.onMouseWheel(),this.setAnimationDuration(this.duration),this.startY=void 0}return o(e,[{key:"scrollContent",value:function(){var e=this;this.onStart&&this.onStart(),this.parent.style.transform="translateY(-".concat(this.spinValue*t.VIEWPORT_HEIGHT,"vh)"),n.default.removeActiveClass(),this.buttons[this.spinValue].classList.add(t.CLASSES.sidebarNavButtonActive),this.onEnd&&setTimeout(function(){e.onEnd()},this.duration)}},{key:"onMouseWheel",value:function(){var t=this,n=function(t,n,e){var s=!1;return function(){if(!s){for(var i=arguments.length,o=new Array(i),a=0;a<i;a++)o[a]=arguments[a];t.apply(n,o),s=!0,setTimeout(function(){s=!1},e)}}};document.addEventListener("wheel",n(function(n){console.log("wheel"),n.deltaY>0?t.spinValue+=t.spinValue<t.sections.length-1?1:0:t.spinValue-=t.spinValue>0?1:0,t.scrollContent()},this,this.duration)),document.addEventListener("touchstart",function(n){t.startY=n.touches[0].pageY});var e=n(this.touchEnd,this,this.duration);document.addEventListener("touchend",e),document.addEventListener("touchmove",function(t){t.preventDefault()},{passive:!1}),document.addEventListener("scroll",function(){console.log("scroll")})}},{key:"touchEnd",value:function(t){var n=t.changedTouches[0].pageY;console.log("touchEnd"),n-this.startY!=0&&(n-this.startY<0?(this.spinValue+=this.spinValue<this.sections.length-1?1:0,this.scrollContent()):(this.spinValue-=this.spinValue>0?1:0,this.scrollContent()))}},{key:"setAnimationDuration",value:function(t){this.parent.style.transition="transform ".concat(t,"ms ease-out")}},{key:"generateNavigation",value:function(){var e=this;this.dots&&(document.body.insertAdjacentHTML("beforeEnd",t.DOM.sidebarNav),this.sections.forEach(function(n){e.sectionNavigation+='\n        <div class="'.concat(t.CLASSES.sidebarNavButton,'">\n          <span class="').concat(t.CLASSES.sidebarNavItem,'">\n          ').concat(n.dataset.target,"\n          </span>\n        </div>\n      ")}),document.querySelector(".".concat(t.CLASSES.sidebarNav)).innerHTML=this.sectionNavigation,this.buttons=document.querySelectorAll(".".concat(t.CLASSES.sidebarNavButton)),this.buttons[this.spinValue].classList.add(t.CLASSES.sidebarNavButtonActive),this.buttons.forEach(function(s,i){s.addEventListener("click",function(){n.default.removeActiveClass(),s.classList.add(t.CLASSES.sidebarNavButtonActive),e.spinValue=i,e.scrollContent()})}))}},{key:"on",value:function(t,n){switch(t){case"end":this.onEnd=n;break;case"start":this.onStart=n;break;default:this.onEnd=null,this.onStart=null}}},{key:"goTo",value:function(t){this.spinValue=t,this.scrollContent()}}]),e}(),r={sections:null,duration:1e3,parent:null,spinValue:null,canScroll:null,onEnd:null,onStart:null,dots:!0},u=new a(r);u.generateNavigation(),u.on("end",n.default.runAtEnd),u.on("start",n.default.runAtStart);
},{"../helpers/_consts":"UAzc","../helpers/_functions":"aMcj"}]},{},["CiKE"], null)
//# sourceMappingURL=sidebarNavigation.e9ed0cb6.js.map