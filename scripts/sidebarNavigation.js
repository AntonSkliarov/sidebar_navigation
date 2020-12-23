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

  scrollContent(count) {
    if (this.onStartRunFunc) {
      this.onStartRunFunc();
    }

    this.content.style.transform = `translateY(-${count * 100}vh)`;

    document.querySelector('.sidebar-nav__button_is-active')
      .classList.remove('sidebar-nav__button_is-active');

    this.buttons[count].classList.add('sidebar-nav__button_is-active');

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

  setScroll() {
    window.addEventListener('mousewheel', (event) => {
      if (this.canScroll) {
        this.canScroll = false;

        if (event.deltaY > 0) {
          this.spinValue += this.spinValue < (this.sections.length - 1) ? 1 : 0;
        } else {
          this.spinValue -= this.spinValue > 0 ? 1 : 0;
        }

        this.scrollContent(this.spinValue);
      }

      setTimeout(() => {
        this.canScroll = true;
      }, 500);
    });
  }

  setNavigation() {
    document.body.insertAdjacentHTML('beforeEnd', '<div class="sidebar-nav"></div>');

    for (let i = 0; i < this.sections.length; i += 1) {
      this.sectionNavigation
        += `<div class="sidebar-nav__button"><span class="sidebar-nav__item">
        ${this.sections[i].dataset.target}
        </span></div>`;
    }

    document.querySelector('.sidebar-nav').innerHTML = this.sectionNavigation;

    this.buttons = document.querySelectorAll('.sidebar-nav__button');

    this.buttons[0].classList.add('sidebar-nav__button_is-active');

    for (let i = 0; i < this.buttons.length; i += 1) {
      this.buttons[i].addEventListener('click', () => {
        document.querySelector('.sidebar-nav__button_is-active')
          .classList.remove('sidebar-nav__button_is-active');

        this.buttons[i].classList.add('sidebar-nav__button_is-active');

        this.spinValue = i;

        this.scrollContent(this.spinValue);
      });
    }
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
}
const runAtEnd = () => {
  console.log('Look, I\'m running at the end');
};
const runAtStart = () => {
  console.log('Look, I\'m running at the start');
};

const newNavigation = new MyFullPage();
newNavigation.setScroll();
newNavigation.setNavigation();
newNavigation.setAnimationDuration(1);
newNavigation.setFuncOnPoint('end', runAtEnd);
newNavigation.setFuncOnPoint('start', runAtStart);
