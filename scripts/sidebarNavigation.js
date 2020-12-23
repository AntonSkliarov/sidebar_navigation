import { CLASSES } from '../helpers/_consts';

class MyFullPage {
  constructor() {
    this.sections = document.querySelectorAll('.section');
    this.content = document.querySelector('.main-content');
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
      .querySelector(CLASSES.navButtonActive)
      .classList.remove('sidebar-nav__button_is-active');

    this.buttons[this.spinValue].classList.add('sidebar-nav__button_is-active');

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
    document.body.insertAdjacentHTML('beforeEnd', '<div class="sidebar-nav"></div>');

    this.sections.forEach((section) => {
      console.log(section.getBoundingClientRect());
      this.sectionNavigation
        += `<div class="sidebar-nav__button"><span class="sidebar-nav__item">
          ${section.dataset.target}
          </span></div>`;
    });

    document.querySelector('.sidebar-nav').innerHTML = this.sectionNavigation;

    this.buttons = document.querySelectorAll('.sidebar-nav__button');

    this.buttons[0].classList.add('sidebar-nav__button_is-active');

    this.buttons.forEach((button, index) => {
      button.addEventListener('click', () => {
        document
          .querySelector(CLASSES.navButtonActive)
          .classList.remove('sidebar-nav__button_is-active');

        button.classList.add('sidebar-nav__button_is-active');

        this.spinValue = index;

        this.scrollContent(this.spinValue);
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

const runAtEnd = () => {
  console.log('I run at the end');
};

const runAtStart = () => {
  console.log('I run at the start');
};

const newNavigation = new MyFullPage();
newNavigation.setScroll();
newNavigation.setNavigation();
newNavigation.setAnimationDuration(1);
newNavigation.setFuncOnPoint('end', runAtEnd);
newNavigation.setFuncOnPoint('start', runAtStart);
// newNavigation.goTo(1);
