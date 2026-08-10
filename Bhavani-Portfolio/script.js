const nav = document.querySelector(".nav");
const menuBtn = document.querySelector(".menu-btn");
const progress = document.querySelector(".progress");
const topBtn = document.querySelector(".top-btn");

menuBtn?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
  menuBtn.textContent = open ? "×" : "☰";
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  topBtn.style.display = window.scrollY > 500 ? "block" : "none";
});

topBtn.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));

const sections = [...document.querySelectorAll("main section[id]")];
const links = [...document.querySelectorAll(".nav-links a")];

const activeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`));
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach(section => activeObserver.observe(section));
