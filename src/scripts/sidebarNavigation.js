import {
  CLASSES,
  DOM,
  VIEWPORT_HEIGHT,
  DEFAULT_DURATION,
} from '../helpers/_consts';
import FUNC from '../helpers/_functions';

// const debounce = require('debounce');

class MyFullPage {
  constructor(config) {
    this.sections = config.sections || DOM.sections;
    this.duration = config.duration || DEFAULT_DURATION;
    this.parent = config.parent || DOM.parent;
    this.spinValue = config.spinValue || 0;
    this.canScroll = config.canScroll || true;
    this.onEnd = config.onEnd || null;
    this.onStart = config.onStart || null;
    this.dots = config.dots || false;
    this.sectionNavigation = '';

    this.onMouseWheel();
    this.setAnimationDuration(this.duration);

    // working start
    this.startY = undefined;
    // working end
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

  onMouseWheel() {
    const throttle = (method, context, delay) => {
      let wait = false;
      return function wrapper(...args) {
        if (!wait) {
          method.apply(context, args);
          wait = true;
          setTimeout(() => {
            wait = false;
          }, delay);
        }
      };
    };

    const wheelHandler = (event) => {
      if (event.deltaY > 0) {
        this.spinValue += this.spinValue < (this.sections.length - 1) ? 1 : 0;
      } else {
        this.spinValue -= this.spinValue > 0 ? 1 : 0;
      }

      this.scrollContent();
    };

    document.addEventListener('wheel', throttle(wheelHandler, this, this.duration));

    // working start

    document.addEventListener('touchstart', (event) => {
      this.startY = event.touches[0].pageY;
    });
    const handleTouchEnd = throttle(this.touchEnd, this, this.duration);
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('touchmove', (event) => {
      event.preventDefault();
    }, { passive: false });
    // not needed? due to Passive event listeners

    document.addEventListener('scroll', () => {
      console.log('scroll');
    });

    // working end
  }
  // working start

  touchEnd(event) {
    const endY = event.changedTouches[0].pageY;
    console.log('touchEnd');
    if (endY - this.startY === 0) {
      return;
    }

    if (endY - this.startY < 0) {
      // Scroll down by fingers
      this.spinValue += this.spinValue < (this.sections.length - 1) ? 1 : 0;
      this.scrollContent();
    } else {
      // Scroll up by fingers
      this.spinValue -= this.spinValue > 0 ? 1 : 0;
      this.scrollContent();
    }
  }
  // working end

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
}

const config = {
  sections: null,
  duration: 1000,
  parent: null,
  spinValue: null,
  canScroll: null,
  onEnd: null,
  onStart: null,
  dots: true,
};

const newNavigation = new MyFullPage(config);
newNavigation.generateNavigation();
newNavigation.on('end', FUNC.runAtEnd);
newNavigation.on('start', FUNC.runAtStart);
// newNavigation.goTo(0);
