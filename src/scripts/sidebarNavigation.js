import { CLASSES, DOM } from '../helpers/_consts';
import FUNC from '../helpers/_functions';

class MyFullPage {
  constructor() {
    this.sections = DOM.sections;

    this.content = DOM.content;

    this.spinValue = 0;

    this.canScroll = true;

    this.sectionNavigation = '';

    this.onEndRunFunc = null;

    this.onStartRunFunc = null;
  }

  setScroll() {
    window.addEventListener('mousewheel', (event) => {
      if (this.canScroll) {
        this.canScroll = false;

        if (event.deltaY > 0) {
          this.spinValue += this.spinValue < (this.sections.length - 1) ? 1 : 0;
        } else {
          this.spinValue -= this.spinValue > 0 ? 1 : 0;
        }

        this.scrollContent();
      }

      setTimeout(() => {
        this.canScroll = true;
      }, 1000);
    });
  }

  scrollContent() {
    if (this.onStartRunFunc) {
      this.onStartRunFunc();
    }

    this.content.style.transform = `translateY(-${this.spinValue * 100}vh)`;

    document
      .querySelector(`.${CLASSES.sidebarNavButtonActive}`)
      .classList.remove(CLASSES.sidebarNavButtonActive);

    this.buttons[this.spinValue].classList.add(CLASSES.sidebarNavButtonActive);

    if (this.onEndRunFunc) {
      setTimeout(() => {
        this.onEndRunFunc();
      }, 1000);
    }
  }

  setAnimationDuration(duration) {
    if (duration) {
      this.content.style.transition = `transform ${duration}s ease-out`;
    }
  }

  setNavigation() {
    document.body.insertAdjacentHTML('beforeEnd', DOM.sidebarNav);

    this.sections.forEach((section) => {
      // console.log(section.getBoundingClientRect());
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

    this.buttons[0].classList.add(CLASSES.sidebarNavButtonActive);

    this.buttons.forEach((button, index) => {
      button.addEventListener('click', () => {
        document
          .querySelector(`.${CLASSES.sidebarNavButtonActive}`)
          .classList.remove(CLASSES.sidebarNavButtonActive);

        button.classList.add(CLASSES.sidebarNavButtonActive);

        this.spinValue = index;

        this.scrollContent();
      });
    });
  }

  setFuncOnPoint(point, func) {
    switch (point) {
      case 'end':
        this.onEndRunFunc = func;
        break;
      case 'start':
        this.onStartRunFunc = func;
        break;
      default:
        this.onEndRunFunc = null;
        this.onStartRunFunc = null;
    }
  }

  goTo(sectionNumber) {
    this.spinValue = sectionNumber;
    this.scrollContent();
  }
}

const newNavigation = new MyFullPage();
newNavigation.setScroll();
newNavigation.setNavigation();
newNavigation.setAnimationDuration(1);
newNavigation.setFuncOnPoint('end', FUNC.runAtEnd);
newNavigation.setFuncOnPoint('start', FUNC.runAtStart);
// newNavigation.goTo(1);
