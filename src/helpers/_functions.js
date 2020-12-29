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

  // currentSectionCheck: (sections) => {
  //   function elementInViewport(el) {
  //     const top = el.offsetTop;
  //     const left = el.offsetLeft;
  //     const width = el.offsetWidth;
  //     const height = el.offsetHeight;

  //     return (
  //       top < (window.pageYOffset + window.innerHeight)
  //       && left < (window.pageXOffset + window.innerWidth)
  //       && (top + height) > window.pageYOffset
  //       && (left + width) > window.pageXOffset
  //     );
  //   }

  //   const visibleSectionCheck = [...sections].map((section) => elementInViewport(section));
  //   console.log(visibleSectionCheck);

  //   return visibleSectionCheck.indexOf(true);
  // },

  isInViewport: (elements) => {
    const checkCurrentElement = (elem) => {
      const bounding = elem.getBoundingClientRect();
      // console.log(bounding.bottom);

      // console.log('bounding: ', bounding);
      // console.log('Height: ', document.body.scrollHeight);
      // console.log('result: ', bounding.bottom - (document.body.scrollHeight / elements.length));

      const currentSectionCheck = bounding.bottom - (document.body.scrollHeight / elements.length);

      return currentSectionCheck;

      // return (
      //   (bounding.top >= 0 && bounding.bottom >= 0)
      //   // && bounding.left >= 0
      //   && bounding.top <= (window.innerHeight || document.documentElement.clientHeight)
      //   // && bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
      // );
    };

    const visibleElementCheck = [...elements].map((element) => checkCurrentElement(element));

    // console.log(visibleElementCheck);
    return visibleElementCheck.indexOf(0);
  },
};

export default FUNC;
