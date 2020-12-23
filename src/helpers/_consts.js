export const CLASSES = {
  sidebarNav: 'sidebar-nav',
  sidebarNavButton: 'sidebar-nav__button',
  sidebarNavButtonActive: 'sidebar-nav__button_is-active',
  sidebarNavItem: 'sidebar-nav__item',
};

export const DOM = {
  content: document.querySelector('.main-content'),
  sections: document.querySelectorAll('.section'),
  sidebarNav: `<div class="${CLASSES.sidebarNav}"></div>`,
};

export const VIEWPORT_HEIGHT = 100;
export const ANIMATION_DELAY = 1;
export const MS_COEFFICIENT = 1000;
