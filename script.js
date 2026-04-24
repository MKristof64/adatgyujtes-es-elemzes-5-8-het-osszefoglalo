const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const sectionIds = ["het5", "het6", "het7", "het8", "feladat1", "feladat4", "feladat5", "feladat6"];
const links = [...document.querySelectorAll(".main-nav a")];
const sections = sectionIds
  .map((id) => document.getElementById(id))
  .filter(Boolean);

if (sections.length && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;
      const currentId = visible.target.id;

      links.forEach((link) => {
        const href = link.getAttribute("href") || "";
        const isMatch = href === `#${currentId}`;
        link.classList.toggle("active", isMatch);
      });
    },
    {
      rootMargin: "-35% 0px -45% 0px",
      threshold: [0.15, 0.4, 0.7],
    }
  );

  sections.forEach((section) => observer.observe(section));
}
