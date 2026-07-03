document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("lf-nav-toggle");
  const navMenu = document.getElementById("lf-nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("is-open");
    });
  }

  const metricEl = document.querySelector(".lf-metric__value");
  if (metricEl) {
    const target = parseInt(metricEl.dataset.target || "0", 10);
    let current = 0;
    const duration = 1200;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      current = Math.floor(progress * target);
      metricEl.textContent = current.toString();
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }

  const testimonials = document.querySelectorAll(".lf-story");
  const dots = document.querySelectorAll("#lf-testimonial-dots button");

  if (testimonials.length && dots.length) {
    let activeIndex = 0;

    const setActive = (index) => {
      testimonials[activeIndex].classList.remove("is-active");
      dots[activeIndex].classList.remove("is-active");
      activeIndex = index;
      testimonials[activeIndex].classList.add("is-active");
      dots[activeIndex].classList.add("is-active");
    };

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => setActive(index));
    });

    setInterval(() => {
      const next = (activeIndex + 1) % testimonials.length;
      setActive(next);
    }, 7000);
  }

  const faqItems = document.querySelectorAll(".lf-faq__item");
  faqItems.forEach((item) => {
    const button = item.querySelector(".lf-faq__question");
    if (!button) return;

    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");
      faqItems.forEach((i) => i.classList.remove("is-open"));
      if (!isOpen) item.classList.add("is-open");
    });
  });
});
