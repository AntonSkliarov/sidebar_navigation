'use-strict';

import {
  CLASSES,
  DOM,
  VIEWPORT_HEIGHT,
  // DEFAULT_DURATION,
} from '../helpers/_consts';
import FUNC from '../helpers/_functions';

class MyFullPage {
  constructor(config) {
    this.sections = config.sections || DOM.sections; // this.pages
    this.sectionsCount = this.sections.length; // this.amountOfPages
    this.animationFinished = true;
    this.dots = config.dots || false;
    this.currentPage = 0;
    this.debounce = null;
    this.duration = config.duration || 500;
    this.callback = {
      start: null,
      end: null,
    };
    this.sectionNavigation = '';

    this.parent = config.parent || DOM.parent;

    this.init();

    // old
    // this.parent = config.parent || DOM.parent;
    // this.spinValue = config.spinValue || 0; // currentPage
    // this.sectionNavigation = '';
    // this.startY = undefined;

    // this.initializeScroll();
    // this.setAnimationDuration(this.duration);

    // this.prevTime = new Date().getTime();

    // this.refreshPageToTop();
    // old
  }

  init() {
    this.refreshPageToTop();
    this.setSideNavigation();
    this.addScrollListener();
    this.setAnimationDuration(this.duration);
  }

  refreshPageToTop() {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 40);
  }

  setAnimationDuration(duration) {
    console.log(this.parent);
    this.parent.style.transition = `transform ${duration}ms ease-out`;
  }

  setSideNavigation() {
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
    this.buttons[this.currentPage].classList.add(CLASSES.sidebarNavButtonActive);
    this.buttons.forEach((button, index) => {
      button.addEventListener('click', () => {
        FUNC.removeActiveClass();

        button.classList.add(CLASSES.sidebarNavButtonActive);

        this.currentPage = index;
        this.scrollContent();
      });
    });
  }

  debounceFunction(f, ms) {
    return function () {
      if (!this.animationFinished) return;
      f.apply(this, arguments);

      this.animationFinished = false;
      setTimeout(() => this.animationFinished = true, ms);
    };
  }
l
  goto() {
    // let numberOfPage = num;

    // if (num >= this.amountOfPages) {
    //   numberOfPage = this.amountOfPages - 1;
    // } else if (num < 0) {
    //   numberOfPage = 0;
    // }

    // gsap.to('body', { position: 'relative', top: -100 * numberOfPage + 'vh', duration: this.duration });

    // if (this.dots) {
    //   this.changeActiveButton(numberOfPage);
    // }
    // this.currentPage = numberOfPage;

    if (this.onStart) {
      this.onStart();
    }

    this.parent.style.transform = `translateY(-${this.currentPage * VIEWPORT_HEIGHT}vh)`;

    FUNC.removeActiveClass();

    this.buttons[this.currentPage].classList.add(CLASSES.sidebarNavButtonActive);

    if (this.onEnd) {
      setTimeout(() => {
        this.onEnd();
      }, this.duration);
    }
  }

  addScrollListener() {
    window.addEventListener('mousewheel', (event) => {
      if (!this.animationFinished) {
        return;
      }

      if (this.callback.start) {
        this.callback.start();
      }

      if (event.deltaY > 0) {
        this.currentPage += this.currentPage < (this.sections.length - 1) ? 1 : 0;
      } else {
        this.currentPage -= this.currentPage > 0 ? 1 : 0;
      }

      this.debounce = this.debounceFunction(() => {
        this.goto();
      }, this.duration);

      this.debounce();

      setTimeout(() => {
        if (this.callback.end) {
          this.callback.end();
        }
      }, this.duration);
    });
  }

  on(point, func) {
    this.callback[point] = func;
  }
}

const config = {
  duration: 1000,
  dots: true,
};

const fullPage = new MyFullPage(config);
fullPage.on('start', FUNC.runAtStart);
fullPage.on('end', FUNC.runAtEnd);
