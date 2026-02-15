// projects.js — здесь меняешь проекты (названия/описания/ссылки/аватары)

const PROJECTS = [
  {
    title: "Project name",
    description: "Short description placeholder",
    href: "https://galenite.ru",
    avatar: "https://i.pravatar.cc/88?img=12"
  },
  {
    title: "Project name",
    description: "Short description placeholder",
    href: "https://galenite.ru",
    avatar: "https://i.pravatar.cc/88?img=22"
  },
  {
    title: "Project name",
    description: "Short description placeholder",
    href: "https://galenite.ru",
    avatar: "https://i.pravatar.cc/88?img=32"
  },
  {
    title: "Project name",
    description: "Short description placeholder",
    href: "https://galenite.ru",
    avatar: "https://i.pravatar.cc/88?img=42"
  },
  {
    title: "Project name",
    description: "Short description placeholder",
    href: "https://galenite.ru",
    avatar: "https://i.pravatar.cc/88?img=52"
  },
  {
    title: "Project name",
    description: "Short description placeholder",
    href: "https://galenite.ru",
    avatar: "https://i.pravatar.cc/88?img=62"
  }
];

function setYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = String(new Date().getFullYear());
}

function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  const frag = document.createDocumentFragment();

  PROJECTS.forEach((p) => {
    const a = document.createElement("a");
    a.className = "project-card reveal";
    a.href = p.href;
    a.target = "_blank";
    a.rel = "noopener noreferrer";

    const img = document.createElement("img");
    img.className = "project-ava";
    img.src = p.avatar;
    img.alt = `Логотип проекта: ${p.title}`;
    img.loading = "lazy";

    const text = document.createElement("div");
    text.className = "project-text";

    const title = document.createElement("div");
    title.className = "project-title";
    title.textContent = p.title;

    const desc = document.createElement("div");
    desc.className = "project-desc";
    desc.textContent = p.description;

    const arrow = document.createElement("div");
    arrow.className = "project-arrow";
    arrow.textContent = "→";
    arrow.setAttribute("aria-hidden", "true");

    text.appendChild(title);
    text.appendChild(desc);

    a.appendChild(img);
    a.appendChild(text);
    a.appendChild(arrow);

    frag.appendChild(a);
  });

  grid.appendChild(frag);
}

function setupReveal() {
  const els = Array.from(document.querySelectorAll(".reveal"));
  if (!els.length) return;

  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (reduced || !("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-in"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("is-in");
      });
    },
    { threshold: 0.12, rootMargin: "80px 0px" }
  );

  els.forEach((el) => io.observe(el));
}

function setupFocusFallback() {
  // Фолбэк: если браузер странно себя ведёт с focus-visible, показываем фокус,
  // когда человек реально начинает табать клавиатурой.
  const root = document.documentElement;

  function onKeydown(e) {
    if (e.key === "Tab") root.dataset.input = "keyboard";
  }
  function onPointer() {
    delete root.dataset.input;
  }

  window.addEventListener("keydown", onKeydown, { passive: true });
  window.addEventListener("mousedown", onPointer, { passive: true });
  window.addEventListener("touchstart", onPointer, { passive: true });
}

setYear();
renderProjects();
setupReveal();
setupFocusFallback();
