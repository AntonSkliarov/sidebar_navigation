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

    const wheelHandler = (event) => {
      document.removeEventListener('wheel', throttledScrollHandler);

      if (event.deltaY > 0) {
        this.spinValue += this.spinValue < (this.sections.length - 1) ? 1 : 0;
      } else {
        this.spinValue -= this.spinValue > 0 ? 1 : 0;
      }

      this.scrollContent();

      setTimeout(() => {
        document.addEventListener('wheel', throttledScrollHandler);
      }, this.duration);
    };

    const throttledScrollHandler = throttle(wheelHandler, this.duration);

    document.addEventListener('wheel', throttledScrollHandler);

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

/////////////////////

{spinX: -0, spinY: -1.7916666666666667, pixelX: -0, pixelY: -179.16664123535156}
{spinX: -0, spinY: -2.433333333333333, pixelX: -0, pixelY: -243.75}
{spinX: -0, spinY: -2.6416666666666666, pixelX: -0, pixelY: -264.58331298828125}
{spinX: -0, spinY: -3, pixelX: -0, pixelY: -300}
{spinX: -0, spinY: -4.033333333333333, pixelX: -0, pixelY: -404.1666259765625}
{spinX: -0, spinY: -5.183333333333334, pixelX: -0, pixelY: -518.75}
{spinX: -0, spinY: -4.916666666666667, pixelX: -0, pixelY: -491.6666259765625}
{spinX: -0, spinY: -3.375, pixelX: -0, pixelY: -337.5}
{spinX: -0, spinY: -5.183333333333334, pixelX: -0, pixelY: -518.75}
{spinX: -0, spinY: -4.816666666666666, pixelX: -0, pixelY: -482.2916259765625}
{spinX: -0, spinY: -4.475, pixelX: -0, pixelY: -447.9166259765625}
{spinX: -0, spinY: -4.158333333333333, pixelX: -0, pixelY: -416.6666259765625}
{spinX: -0, spinY: -3.875, pixelX: -0, pixelY: -387.4999694824219}
{spinX: -0, spinY: -3.6, pixelX: -0, pixelY: -360.41668701171875}
{spinX: -0, spinY: -3.35, pixelX: -0, pixelY: -335.41668701171875}
{spinX: -0, spinY: -3.1083333333333334, pixelX: -0, pixelY: -311.45831298828125}
{spinX: -0, spinY: -2.8916666666666666, pixelX: -0, pixelY: -289.58331298828125}
{spinX: -0, spinY: -2.691666666666667, pixelX: -0, pixelY: -269.7916564941406}
{spinX: -0, spinY: -2.5, pixelX: -0, pixelY: -250}
{spinX: -0, spinY: -2.3333333333333335, pixelX: -0, pixelY: -233.33331298828125}
{spinX: -0, spinY: -2.1666666666666665, pixelX: -0, pixelY: -216.66664123535156}
{spinX: -0, spinY: -2.0083333333333333, pixelX: -0, pixelY: -201.04165649414062}
{spinX: -0, spinY: -1.875, pixelX: -0, pixelY: -187.5}
{spinX: -0, spinY: -1.7333333333333334, pixelX: -0, pixelY: -173.95834350585938}
{spinX: -0, spinY: -1.6083333333333334, pixelX: -0, pixelY: -161.45831298828125}
{spinX: -0, spinY: -1.5, pixelX: -0, pixelY: -150}
{spinX: -0, spinY: -1.3916666666666666, pixelX: -0, pixelY: -139.58331298828125}
{spinX: -0, spinY: -1.3, pixelX: -0, pixelY: -130.2083282470703}
{spinX: -0, spinY: -1.2, pixelX: -0, pixelY: -120.83332061767578}
{spinX: -0, spinY: -1.125, pixelX: -0, pixelY: -112.49999237060547}
{spinX: -0, spinY: -1.0333333333333334, pixelX: -0, pixelY: -104.16665649414062}
{spinX: -0, spinY: -0.9666666666666667, pixelX: -0, pixelY: -96.87499237060547}
{spinX: -0, spinY: -0.9, pixelX: -0, pixelY: -90.625}
{spinX: -0, spinY: -0.8416666666666667, pixelX: -0, pixelY: -84.375}
{spinX: -0, spinY: -0.775, pixelX: -0, pixelY: -78.12499237060547}
{spinX: -0, spinY: -0.725, pixelX: -0, pixelY: -72.91666412353516}
{spinX: -0, spinY: -0.675, pixelX: -0, pixelY: -67.70832824707031}
{spinX: -0, spinY: -0.625, pixelX: -0, pixelY: -62.5}
{spinX: -0, spinY: -0.5833333333333334, pixelX: -0, pixelY: -58.33332824707031}
{spinX: -0, spinY: -0.5416666666666666, pixelX: -0, pixelY: -54.16666030883789}
{spinX: -0, spinY: -0.5, pixelX: -0, pixelY: -50}
{spinX: -0, spinY: -0.4666666666666667, pixelX: -0, pixelY: -46.875}
{spinX: -0, spinY: -0.43333333333333335, pixelX: -0, pixelY: -43.749996185302734}
{spinX: -0, spinY: -0.4, pixelX: -0, pixelY: -40.624996185302734}
{spinX: -0, spinY: -0.375, pixelX: -0, pixelY: -37.5}
{spinX: -0, spinY: -0.3416666666666667, pixelX: -0, pixelY: -34.375}
{spinX: -0, spinY: -0.31666666666666665, pixelX: -0, pixelY: -32.291664123535156}
{spinX: -0, spinY: -0.3, pixelX: -0, pixelY: -30.208330154418945}
{spinX: -0, spinY: -0.275, pixelX: -0, pixelY: -28.124998092651367}
{spinX: -0, spinY: -0.25833333333333336, pixelX: -0, pixelY: -26.041664123535156}
{spinX: -0, spinY: -0.23333333333333334, pixelX: -0, pixelY: -23.958332061767578}
{spinX: -0, spinY: -0.21666666666666667, pixelX: -0, pixelY: -21.874998092651367}
{spinX: -0, spinY: -0.20833333333333334, pixelX: -0, pixelY: -20.833332061767578}
{spinX: -0, spinY: -0.18333333333333332, pixelX: -0, pixelY: -18.75}
{spinX: -0, spinY: -0.175, pixelX: -0, pixelY: -17.70833396911621}
{spinX: -0, spinY: -0.16666666666666666, pixelX: -0, pixelY: -16.666667938232422}
{spinX: -0, spinY: -0.15, pixelX: -0, pixelY: -15.625}
{spinX: -0, spinY: -0.14166666666666666, pixelX: -0, pixelY: -14.583332061767578}
{spinX: -0, spinY: -0.13333333333333333, pixelX: -0, pixelY: -13.541665077209473}
{spinX: -0, spinY: -0.125, pixelX: -0, pixelY: -12.5}
{spinX: -0, spinY: -0.10833333333333334, pixelX: -0, pixelY: -11.458333969116211}
{spinX: -0, spinY: -0.1, pixelX: -0, pixelY: -10.416666030883789}
{spinX: -0, spinY: -0.09166666666666666, pixelX: -0, pixelY: -9.375}
{spinX: -0, spinY: -0.09166666666666666, pixelX: -0, pixelY: -9.375}
{spinX: -0, spinY: -0.08333333333333333, pixelX: -0, pixelY: -8.333333969116211}
{spinX: -0, spinY: -0.06666666666666667, pixelX: -0, pixelY: -7.291666030883789}
{spinX: -0, spinY: -0.06666666666666667, pixelX: -0, pixelY: -7.291666030883789}
{spinX: -0, spinY: -0.058333333333333334, pixelX: -0, pixelY: -6.25}
{spinX: -0, spinY: -0.058333333333333334, pixelX: -0, pixelY: -6.25}
{spinX: -0, spinY: -0.05, pixelX: -0, pixelY: -5.2083330154418945}
{spinX: -0, spinY: -0.05, pixelX: -0, pixelY: -5.2083330154418945}
{spinX: -0, spinY: -0.05, pixelX: -0, pixelY: -5.2083330154418945}
{spinX: -0, spinY: -0.041666666666666664, pixelX: -0, pixelY: -4.1666669845581055}
{spinX: -0, spinY: -0.041666666666666664, pixelX: -0, pixelY: -4.1666669845581055}
{spinX: -0, spinY: -0.041666666666666664, pixelX: -0, pixelY: -4.1666669845581055}
{spinX: -0, spinY: -0.025, pixelX: -0, pixelY: -3.125}
{spinX: -0, spinY: -0.025, pixelX: -0, pixelY: -3.125}
{spinX: -0, spinY: -0.025, pixelX: -0, pixelY: -3.125}
{spinX: -0, spinY: -0.025, pixelX: -0, pixelY: -3.125}
{spinX: -0, spinY: -0.016666666666666666, pixelX: -0, pixelY: -2.0833334922790527}
{spinX: -0, spinY: -0.016666666666666666, pixelX: -0, pixelY: -2.0833334922790527}
{spinX: -0, spinY: -0.016666666666666666, pixelX: -0, pixelY: -2.0833334922790527}
{spinX: -0, spinY: -0.016666666666666666, pixelX: -0, pixelY: -2.0833334922790527}
{spinX: -0, spinY: -0.016666666666666666, pixelX: -0, pixelY: -2.0833334922790527}
{spinX: -0, spinY: -0.008333333333333333, pixelX: -0, pixelY: -1.0416667461395264}
