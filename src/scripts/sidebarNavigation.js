import {
  CLASSES,
  DOM,
  VIEWPORT_HEIGHT,
  DEFAULT_DURATION,
} from '../helpers/_consts';
import FUNC from '../helpers/_functions';

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
    this.generateNavigation(this.dots);

    // this.onScroll();
    // this.currentScrollTop = window.scrollY;
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
    const throttle = (func, delay) => {
      let lastTime = 0;
      return function wrapper(...args) {
        const now = new Date();
        if (now - lastTime >= delay) {
          func(...args);
          lastTime = now;
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

    window.addEventListener('wheel', throttle(wheelHandler, this.duration));
  }

  setAnimationDuration(duration) {
    this.parent.style.transition = `transform ${duration}ms ease-out`;
  }

  // in progress - start
  // onScroll() {
  //   const throttle = (func, delay) => {
  //     let time = Date.now();
  //     return function wrapper() {
  //       if ((time + delay - Date.now()) < 0) {
  //         func();
  //         time = Date.now();
  //       }
  //     };
  //   };

  //   const scrollHandler = () => {
  //     if (window.scrollY > 0) {
  //       this.spinValue += this.spinValue < (this.sections.length - 1) ? 1 : 0;
  //     } else {
  //       this.spinValue -= this.spinValue > 0 ? 1 : 0;
  //     }

  //     this.scrollContent();

  //     console.log('scrolled');
  //     console.log('window.scrollY: ', window.scrollY);
  //   };

  //   document.addEventListener('scroll', throttle(scrollHandler, 1000));
  // }
  // in progress - end

  generateNavigation(dots) {
    if (!dots) {
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
newNavigation.on('end', FUNC.runAtEnd);
newNavigation.on('start', FUNC.runAtStart);
// newNavigation.goTo(0);
