window.addEventListener('load', () => {
  const sections = document.querySelectorAll('.section');

  const content = document.querySelector('.main');

  let spinValue = 0;

  let canScroll = true;

  let sectionNavigation = '';

  document.body.insertAdjacentHTML('beforeEnd', '<div class="sidebar-nav"></div>');

  for (let i = 0; i < sections.length; i += 1) {
    sectionNavigation
      += `<div class="sidebar-nav__button"><span class="sidebar-nav__item">
        ${sections[i].dataset.target}
        </span></div>`;
  }

  function scrollContent(count) {
    content.setAttribute('style', `transform: translateY(-${count * 100}vh)`);
  }

  document.querySelector('.sidebar-nav').innerHTML = sectionNavigation;

  const buttons = document.querySelectorAll('.sidebar-nav__button');

  buttons[0].classList.add('sidebar-nav__button_is-active');

  for (let i = 0; i < buttons.length; i += 1) {
    buttons[i].addEventListener('click', () => {
      document.querySelector('.sidebar-nav__button_is-active')
        .classList.remove('.sidebar-nav__button_is-active');
      buttons[i].classList.add('sidebar-nav__button_is-active');
      console.log(this);
      scrollContent(i);
    });
  }

  window.addEventListener('mousewheel', (event) => {
    if (canScroll) {
      canScroll = false;

      if (event.deltaY > 0) {
        spinValue += spinValue < sections.length - 1 ? 1 : 0;
      } else {
        spinValue -= spinValue > 0 ? 1 : 0;
      }

      scrollContent(spinValue);
    }

    setTimeout(() => {
      canScroll = true;
    }, 500);
  });
});
