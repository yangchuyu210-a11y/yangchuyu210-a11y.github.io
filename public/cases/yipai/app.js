const screen = document.querySelector('#h5-screen');
const callouts = [...document.querySelectorAll('[data-scroll]')];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
callouts.forEach(button => {
  button.addEventListener('click', () => {
    const offset = Number(button.dataset.scroll) * (screen.clientWidth / 488);
    screen.scrollTo({ top: offset, behavior: reduceMotion.matches ? 'instant' : 'smooth' });
    callouts.forEach(item => item.classList.toggle('is-active', item === button));
  });
});
screen.addEventListener('scroll', () => {
  const sourceY = screen.scrollTop * (488 / screen.clientWidth);
  let current = callouts[0];
  callouts.forEach(item => { if (sourceY >= Number(item.dataset.scroll) - 120) current = item; });
  callouts.forEach(item => item.classList.toggle('is-active', item === current));
}, { passive: true });

const dialog = document.querySelector('.image-dialog');
const viewerImage = document.querySelector('#viewer-image');
let trigger;
document.querySelectorAll('[data-image]').forEach(button => {
  button.addEventListener('click', () => {
    trigger = button;
    viewerImage.src = button.dataset.image;
    viewerImage.alt = button.dataset.caption;
    document.querySelector('#viewer-caption').textContent = button.dataset.caption;
    dialog.classList.toggle('is-long', button.dataset.image.includes('h5'));
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    document.querySelector('.viewer-body').scrollTop = 0;
  });
});
document.querySelector('.viewer-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
dialog.addEventListener('close', () => { document.body.style.overflow = ''; trigger?.focus({ preventScroll: true }); });

