// Меняешь только этот массив: title/desc/href/icon/tag
const PROJECTS = [
  {
    title: "Project name",
    desc: "Short description placeholder",
    href: "https://galenite.ru",
    icon: "https://i.pravatar.cc/100?img=12",
    tag: "Placeholder"
  },
  {
    title: "Project name",
    desc: "Short description placeholder",
    href: "https://galenite.ru",
    icon: "https://i.pravatar.cc/100?img=22",
    tag: "Placeholder"
  },
  {
    title: "Project name",
    desc: "Short description placeholder",
    href: "https://galenite.ru",
    icon: "https://i.pravatar.cc/100?img=32",
    tag: "Placeholder"
  },
  {
    title: "Project name",
    desc: "Short description placeholder",
    href: "https://galenite.ru",
    icon: "https://i.pravatar.cc/100?img=42",
    tag: "Placeholder"
  },
  {
    title: "Project name",
    desc: "Short description placeholder",
    href: "https://galenite.ru",
    icon: "https://i.pravatar.cc/100?img=52",
    tag: "Placeholder"
  },
  {
    title: "Project name",
    desc: "Short description placeholder",
    href: "https://galenite.ru",
    icon: "https://i.pravatar.cc/100?img=62",
    tag: "Placeholder"
  }
];

function setYear(){
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());
}

function render(){
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  const frag = document.createDocumentFragment();

  PROJECTS.forEach((p) => {
    const a = document.createElement("a");
    a.className = "card reveal";
    a.href = p.href;
    a.target = "_blank";
    a.rel = "noopener noreferrer";

    a.innerHTML = `
      <div class="card-top">
        <div class="badge">
          <img class="logo" src="${p.icon}" alt="" loading="lazy" />
          <span class="pill">${p.tag ?? "Project"}</span>
        </div>
        <span class="arrow" aria-hidden="true">→</span>
      </div>

      <div>
        <div class="card-title">${escapeHtml(p.title)}</div>
        <p class="card-desc">${escapeHtml(p.desc)}</p>
      </div>

      <div class="card-footer">
        <span class="p p-muted" style="margin:0;font-size:12px;font-weight:800;">Open</span>
        <span class="p p-muted" style="margin:0;font-size:12px;font-weight:800;">${new URL(p.href).hostname}</span>
      </div>
    `;

    frag.appendChild(a);
  });

  grid.appendChild(frag);
}

function escapeHtml(str){
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function setupReveal(){
  const els = [...document.querySelectorAll(".reveal")];
  if (!els.length) return;

  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (reduced || !("IntersectionObserver" in window)){
    els.forEach(el => el.classList.add("in"));
    return;
  }

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add("in");
    });
  }, { threshold: 0.12, rootMargin: "90px 0px" });

  els.forEach(el => io.observe(el));
}

function focusFallback(){
  const root = document.documentElement;
  const onKey = (e) => { if (e.key === "Tab") root.dataset.input = "keyboard"; };
  const onPointer = () => { delete root.dataset.input; };

  window.addEventListener("keydown", onKey, { passive:true });
  window.addEventListener("mousedown", onPointer, { passive:true });
  window.addEventListener("touchstart", onPointer, { passive:true });
}

setYear();
render();
setupReveal();
focusFallback();
