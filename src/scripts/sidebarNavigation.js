'use-strict';

import {
  CLASSES,
  DOM,
  VIEWPORT_HEIGHT,
} from '../helpers/_consts';
import FUNC from '../helpers/_functions';

// const debounce = require('debounce');

class MyFullPage {
  constructor(config) {
    this.sections = config.sections || DOM.sections;
    this.duration = config.duration || 500;
    this.parent = config.parent || DOM.parent;
    this.spinValue = config.spinValue || 0;
    this.onEnd = config.onEnd || null;
    this.onStart = config.onStart || null;
    this.dots = config.dots || false;
    this.sectionNavigation = '';
    this.startY = undefined;

    this.initializeScroll();
    this.setAnimationDuration(this.duration);

    // this.prevTime = new Date().getTime();

    this.refreshPageToTop();
  }

  scrollContent() {
    if (this.onStart) {
      this.onStart();
    }

    this.parent.style.transform = `translateY(-${this.spinValue * VIEWPORT_HEIGHT}vh)`;

    FUNC.removeActiveClass();

    this.buttons[this.spinValue].classList.add(CLASSES.sidebarNavButtonActive);

    if (this.onEnd) {
      setTimeout(() => {
        this.onEnd();
      }, this.duration);
    }
  }

  touchEnd(event) {
    const endY = event.changedTouches[0].pageY;
    if (endY - this.startY === 0) {
      return;
    }

    if (endY - this.startY < 0) {
      this.spinValue += this.spinValue < (this.sections.length - 1) ? 1 : 0;
      this.scrollContent();
    } else {
      this.spinValue -= this.spinValue > 0 ? 1 : 0;
      this.scrollContent();
    }
  }

  // wheelHandler = (event) => {
  //   document.removeEventListener('wheel', this.wheelHandler);

  //   if (event.deltaY > 0) {
  //     this.spinValue += this.spinValue < (this.sections.length - 1) ? 1 : 0;
  //   } else {
  //     this.spinValue -= this.spinValue > 0 ? 1 : 0;
  //   }

  //   this.scrollContent();

  //   setTimeout(() => {
  //     document.addEventListener('wheel', this.wheelHandler);
  //   }, this.duration)
  // }

  initializeScroll() {
    const throttle = (func, delay) => {
      let isThrottle = false;

      const wrapper = (...args) => {
        if (isThrottle) {
          return;
        }

        func(...args);

        isThrottle = true;
        setTimeout(() => {
          isThrottle = false;
        }, delay);
      };

      return wrapper;
    };

    const scrollHandler = (event) => {
      // this.currentTime = new Date().getTime();

      // if ((this.currentTime - this.prevTime) < 1000) {
      //   return;
      // }

      document.removeEventListener('wheel', throttledScrollHandler);

      if (event.deltaY > 0) {
        this.spinValue += this.spinValue < (this.sections.length - 1) ? 1 : 0;
      } else {
        this.spinValue -= this.spinValue > 0 ? 1 : 0;
      }

      this.scrollContent();

      // setTimeout(() => {
      //   this.prevTime = new Date().getTime();
      // }, 500);

      setTimeout(() => {
        document.addEventListener('wheel', throttledScrollHandler);
      }, this.duration);
    };

    const throttledScrollHandler = throttle(scrollHandler, this.duration);

    document.addEventListener('wheel', throttledScrollHandler);
    // document.addEventListener('wheel', this.wheelHandler);

    document.addEventListener('touchstart', (event) => {
      this.startY = event.touches[0].pageY;
    });

    const handleTouchEnd = FUNC.throttle(this.touchEnd, this, this.duration);

    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('touchmove', (event) => {
      event.preventDefault();
    }, { passive: false });
  }

  setAnimationDuration(duration) {
    this.parent.style.transition = `transform ${duration}ms ease-out`;
  }

  generateNavigation() {
    if (!this.dots) {
      return;
    }

    document.body.insertAdjacentHTML('beforeEnd', DOM.sidebarNav);

    this.sections.forEach((section) => {
      this.sectionNavigation += `
        <div class="${CLASSES.sidebarNavButton}">
          <span class="${CLASSES.sidebarNavItem}">
          ${section.dataset.target}
          </span>
        </div>
      `;
    });

    document.querySelector(`.${CLASSES.sidebarNav}`).innerHTML = this.sectionNavigation;

    this.buttons = document.querySelectorAll(`.${CLASSES.sidebarNavButton}`);
    this.buttons[this.spinValue].classList.add(CLASSES.sidebarNavButtonActive);
    this.buttons.forEach((button, index) => {
      button.addEventListener('click', () => {
        FUNC.removeActiveClass();

        button.classList.add(CLASSES.sidebarNavButtonActive);

        this.spinValue = index;
        this.scrollContent();
      });
    });
  }

  on(point, func) {
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

  goTo(sectionNumber) {
    this.spinValue = sectionNumber;
    this.scrollContent();
  }

  refreshPageToTop() {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 40)
  }
}

const config = {
  sections: null,
  duration: 1000,
  parent: null,
  spinValue: null,
  onEnd: null,
  onStart: null,
  dots: true,
};

const newNavigation = new MyFullPage(config);
newNavigation.generateNavigation();
newNavigation.on('end', FUNC.runAtEnd);
newNavigation.on('start', FUNC.runAtStart);
newNavigation.goTo(0);
