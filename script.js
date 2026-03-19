const sections = Array.from(document.querySelectorAll("main .section"));
const navLinks = Array.from(document.querySelectorAll(".topnav a"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const id = entry.target.getAttribute("id");
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    });
  },
  {
    threshold: 0.25,
    rootMargin: "-10% 0px -55% 0px",
  },
);

sections.forEach((section) => observer.observe(section));
