(function(){
  const root = document.documentElement;
  const THEME_KEY = "portfolio_theme";
  const saved = localStorage.getItem(THEME_KEY);
  if(saved){ root.setAttribute("data-theme", saved); }

  const themeBtn = document.querySelector("[data-action='theme']");
  if(themeBtn){
    themeBtn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem(THEME_KEY, next);
    });
  }

  const menuBtn = document.querySelector("[data-action='menu']");
  const nav = document.querySelector(".navlinks");
  if(menuBtn && nav){
    menuBtn.addEventListener("click", () => {
      nav.style.display = (nav.style.display === "flex") ? "none" : "flex";
    });
    window.addEventListener("resize", () => {
      if(window.innerWidth > 760){ nav.style.display = "flex"; }
      if(window.innerWidth <= 760){ nav.style.display = "none"; }
    });
  }

  // Modal (Projects quick preview)
  const backdrop = document.querySelector(".modalbackdrop");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalBody = document.querySelector("[data-modal-body]");
  const openBtns = document.querySelectorAll("[data-open-modal]");
  const closeBtns = document.querySelectorAll("[data-close-modal]");

  function openModal(title, body){
    if(!backdrop) return;
    modalTitle.textContent = title;
    modalBody.textContent = body;
    backdrop.style.display = "flex";
  }
  function closeModal(){
    if(!backdrop) return;
    backdrop.style.display = "none";
  }
  openBtns.forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const title = btn.getAttribute("data-title") || "Project";
      const body = btn.getAttribute("data-body") || "Add your project description here.";
      openModal(title, body);
    });
  });
  closeBtns.forEach(btn=>btn.addEventListener("click", closeModal));
  if(backdrop){
    backdrop.addEventListener("click", (e)=>{ if(e.target === backdrop) closeModal(); });
    document.addEventListener("keydown", (e)=>{ if(e.key === "Escape") closeModal(); });
  }

  // Copy email
  const copyBtn = document.querySelector("[data-action='copy-email']");
  if(copyBtn){
    copyBtn.addEventListener("click", async ()=>{
      const email = copyBtn.getAttribute("data-email") || "";
      try{
        await navigator.clipboard.writeText(email);
        copyBtn.textContent = "Copied!";
        setTimeout(()=> copyBtn.textContent = "Copy Email", 1200);
      }catch(err){
        alert("Copy failed. Email: " + email);
      }
    });
  }
})();

// Back to top button
(function(){
  const btn = document.getElementById("backToTop");
  if(!btn) return;

  function toggle(){
    btn.style.display = (window.scrollY > 250) ? "inline-flex" : "none";
  }

  window.addEventListener("scroll", toggle);
  toggle();

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
