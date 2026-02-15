const PROJECTS = [
  {
    title: "Основной проект",
    desc: "Является прямым мостом между ИИ и человеком",
    href: "https://galenite.ru",
    icon: "https://i.postimg.cc/nhWgt42R/Logo.png",
    tag: "Galenite"
  }
];

const FALLBACK_ICON = "https://dummyimage.com/100x100/e8eaed/5f6368&text=PR";

function safeUrl(input) {
  try {
    return new URL(input);
  } catch {
    return null;
  }
}

function setYear(){
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());
}

function render(){
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;
  grid.innerHTML = "";

  const frag = document.createDocumentFragment();

  PROJECTS.forEach((raw) => {
    const p = {
      title: raw?.title ?? "Без названия",
      desc: raw?.desc ?? "Описание скоро добавим.",
      href: raw?.href ?? "#",
      icon: raw?.icon ?? FALLBACK_ICON,
      tag: raw?.tag ?? "Project"
    };
    const parsedHref = safeUrl(p.href);
    const hostname = parsedHref?.hostname ?? "example.com";

    const a = document.createElement("a");
    a.className = "card reveal";
    a.href = parsedHref?.href ?? "#";
    a.target = "_blank";
    a.rel = "noopener noreferrer";

    a.innerHTML = `
      <div class="card-top">
        <div class="badge">
          <img class="logo" src="${escapeHtml(p.icon)}" alt="" loading="lazy" />
          <span class="pill">${escapeHtml(p.tag)}</span>
        </div>
        <span class="arrow" aria-hidden="true">→</span>
      </div>

      <div>
        <div class="card-title">${escapeHtml(p.title)}</div>
        <p class="card-desc">${escapeHtml(p.desc)}</p>
      </div>

      <div class="card-footer">
        <span class="p p-muted" style="margin:0;font-size:12px;font-weight:800;">Open</span>
        <span class="p p-muted" style="margin:0;font-size:12px;font-weight:800;">${escapeHtml(hostname)}</span>
      </div>
    `;

    const logo = a.querySelector(".logo");
    logo?.addEventListener("error", () => {
      logo.src = FALLBACK_ICON;
    }, { once: true });

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
