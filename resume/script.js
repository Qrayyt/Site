const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 55, 220)}ms`;
  observer.observe(item);
});

document.querySelector('[data-print]')?.addEventListener('click', () => {
  window.print();
});

const tiltCard = document.querySelector('[data-tilt]');
if (tiltCard && !window.matchMedia('(pointer: coarse)').matches) {
  tiltCard.addEventListener('pointermove', (event) => {
    const rect = tiltCard.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    tiltCard.style.transform = `perspective(900px) rotateX(${y * -4}deg) rotateY(${x * 5}deg) translateY(-2px)`;
  });

  tiltCard.addEventListener('pointerleave', () => {
    tiltCard.style.transform = '';
  });
}
