import { CLASSES } from './_consts';

const FUNC = {
  runAtEnd: () => {
    console.log('I run at the end');
  },

  runAtStart: () => {
    console.log('I run at the start');
  },

  removeActiveClass: () => {
    document
      .querySelector(`.${CLASSES.sidebarNavButtonActive}`)
      .classList.remove(CLASSES.sidebarNavButtonActive);
  },

  throttle: (method, context, delay) => {
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
  },
};

export default FUNC;
