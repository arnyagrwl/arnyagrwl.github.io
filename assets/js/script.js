/* ================================================================
   PROJECT PAGE SCRIPT
   Used only on project detail pages (/projects/*.html).

   1. IMAGE SLIDER — each <div class="slider" data-slider"> shows one
      image at a time. Clicking a dot or an arrow switches the active
      slide, and the mono heading above the frame updates to that
      slide's caption text.
   2. LIGHTBOX — clicking the current slide's image opens it larger;
      click the overlay, the × button, or press Escape to close it.

   No edits needed here unless you're changing this behavior.
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-slider]').forEach(slider => {
    const slides = Array.from(slider.querySelectorAll('.slide'));
    const dots = Array.from(slider.querySelectorAll('.dot'));
    const heading = slider.querySelector('[data-slider-heading]');
    const prevBtn = slider.querySelector('[data-slider-prev]');
    const nextBtn = slider.querySelector('[data-slider-next]');
    if (!slides.length) return;

    let index = slides.findIndex(s => s.classList.contains('is-active'));
    if (index < 0) index = 0;

    function captionOf(slide){
      const cap = slide.querySelector('.cap');
      return cap ? cap.textContent : '';
    }

    function show(next){
      index = (next + slides.length) % slides.length;
      slides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));
      dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
      if (heading) heading.textContent = captionOf(slides[index]);
    }

    dots.forEach((dot, i) => dot.addEventListener('click', () => show(i)));
    if (prevBtn) prevBtn.addEventListener('click', () => show(index - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => show(index + 1));

    show(index);
  });

  const overlay = document.getElementById('lightbox-overlay');
  if (!overlay) return;

  const overlayImg = overlay.querySelector('.img-ph');
  const closeBtn = document.getElementById('lightbox-close');

  document.querySelectorAll('.slider-track .img-ph').forEach(thumb => {
    thumb.addEventListener('click', () => {
      overlayImg.innerHTML = thumb.innerHTML;
      overlay.classList.add('open');
    });
  });

  function close(){ overlay.classList.remove('open'); }
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
});
