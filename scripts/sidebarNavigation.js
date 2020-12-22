window.addEventListener('load', () => {
  const sections = document.querySelectorAll('.section');

  const content = document.querySelector('.main');

  let spinValue = 0;

  function scrollContent(count) {
    content.setAttribute('style', `transform: translateY(-${count * 100}vh)`);
  }

  window.addEventListener('mousewheel', (event) => {
    if (event.deltaY > 0) {
      spinValue += spinValue < sections.length - 1 ? 1 : 0;
    } else {
      spinValue -= spinValue > 0 ? 1 : 0;
    }

    scrollContent(spinValue);
  });

  console.log(sections, content);
});
