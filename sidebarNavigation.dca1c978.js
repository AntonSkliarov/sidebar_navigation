parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"UAzc":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.VIEWPORT_HEIGHT=exports.DOM=exports.CLASSES=void 0;var e={sidebarNav:"sidebar-nav",sidebarNavButton:"sidebar-nav__button",sidebarNavButtonActive:"sidebar-nav__button_is-active",sidebarNavItem:"sidebar-nav__item"};exports.CLASSES=e;var t={parent:document.querySelector(".main-content"),sections:document.querySelectorAll(".section"),sidebarNav:'<div class="'.concat(e.sidebarNav,'"></div>')};exports.DOM=t;var a=100;exports.VIEWPORT_HEIGHT=a;
},{}],"aMcj":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t=require("./_consts"),e={runAtEnd:function(){console.log("I run at the end")},runAtStart:function(){console.log("I run at the start")},removeActiveClass:function(){document.querySelector(".".concat(t.CLASSES.sidebarNavButtonActive)).classList.remove(t.CLASSES.sidebarNavButtonActive)},throttle:function(t,e,n){var o=!1;return function(){if(!o){for(var r=arguments.length,u=new Array(r),a=0;a<r;a++)u[a]=arguments[a];t.apply(e,u),o=!0,setTimeout(function(){o=!1},n)}}}},n=e;exports.default=n;
},{"./_consts":"UAzc"}],"CiKE":[function(require,module,exports) {
"use strict";var t=require("../helpers/_consts"),n=e(require("../helpers/_functions"));function e(t){return t&&t.__esModule?t:{default:t}}function i(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function s(t,n){for(var e=0;e<n.length;e++){var i=n[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function a(t,n,e){return n&&s(t.prototype,n),e&&s(t,e),t}var o=function(){function e(n){i(this,e),this.sections=n.sections||t.DOM.sections,this.duration=n.duration||500,this.parent=n.parent||t.DOM.parent,this.spinValue=n.spinValue||0,this.onEnd=n.onEnd||null,this.onStart=n.onStart||null,this.dots=n.dots||!1,this.sectionNavigation="",this.startY=void 0,this.initializeScroll(),this.setAnimationDuration(this.duration),this.prevTime=(new Date).getTime(),this.refreshPageToTop()}return a(e,[{key:"scrollContent",value:function(){var e=this;this.onStart&&this.onStart(),this.parent.style.transform="translateY(-".concat(this.spinValue*t.VIEWPORT_HEIGHT,"vh)"),n.default.removeActiveClass(),this.buttons[this.spinValue].classList.add(t.CLASSES.sidebarNavButtonActive),this.onEnd&&setTimeout(function(){e.onEnd()},this.duration)}},{key:"touchEnd",value:function(t){var n=t.changedTouches[0].pageY;n-this.startY!=0&&(n-this.startY<0?(this.spinValue+=this.spinValue<this.sections.length-1?1:0,this.scrollContent()):(this.spinValue-=this.spinValue>0?1:0,this.scrollContent()))}},{key:"initializeScroll",value:function(){var t,e,i,s=this;document.addEventListener("wheel",(t=function(t){s.currentTime=(new Date).getTime(),s.currentTime-s.prevTime<1e3||(t.deltaY>0?s.spinValue+=s.spinValue<s.sections.length-1?1:0:s.spinValue-=s.spinValue>0?1:0,s.scrollContent(),setTimeout(function(){s.prevTime=(new Date).getTime()},500))},e=this.duration,i=!1,function(){i||(t.apply(void 0,arguments),i=!0,setTimeout(function(){i=!1},e))})),document.addEventListener("touchstart",function(t){s.startY=t.touches[0].pageY});var a=n.default.throttle(this.touchEnd,this,this.duration);document.addEventListener("touchend",a),document.addEventListener("touchmove",function(t){t.preventDefault()},{passive:!1})}},{key:"setAnimationDuration",value:function(t){this.parent.style.transition="transform ".concat(t,"ms ease-out")}},{key:"generateNavigation",value:function(){var e=this;this.dots&&(document.body.insertAdjacentHTML("beforeEnd",t.DOM.sidebarNav),this.sections.forEach(function(n){e.sectionNavigation+='\n        <div class="'.concat(t.CLASSES.sidebarNavButton,'">\n          <span class="').concat(t.CLASSES.sidebarNavItem,'">\n          ').concat(n.dataset.target,"\n          </span>\n        </div>\n      ")}),document.querySelector(".".concat(t.CLASSES.sidebarNav)).innerHTML=this.sectionNavigation,this.buttons=document.querySelectorAll(".".concat(t.CLASSES.sidebarNavButton)),this.buttons[this.spinValue].classList.add(t.CLASSES.sidebarNavButtonActive),this.buttons.forEach(function(i,s){i.addEventListener("click",function(){n.default.removeActiveClass(),i.classList.add(t.CLASSES.sidebarNavButtonActive),e.spinValue=s,e.scrollContent()})}))}},{key:"on",value:function(t,n){switch(t){case"end":this.onEnd=n;break;case"start":this.onStart=n;break;default:this.onEnd=null,this.onStart=null}}},{key:"goTo",value:function(t){this.spinValue=t,this.scrollContent()}},{key:"refreshPageToTop",value:function(){setTimeout(function(){window.scrollTo(0,0)},40)}}]),e}(),r={sections:null,duration:1e3,parent:null,spinValue:null,onEnd:null,onStart:null,dots:!0},u=new o(r);u.generateNavigation(),u.on("end",n.default.runAtEnd),u.on("start",n.default.runAtStart),u.goTo(0);
},{"../helpers/_consts":"UAzc","../helpers/_functions":"aMcj"}]},{},["CiKE"], null)
//# sourceMappingURL=sidebarNavigation.dca1c978.js.map