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
};

export default FUNC;
