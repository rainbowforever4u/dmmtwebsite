
const menuToggle=document.getElementById("menuToggle"), mainNav=document.getElementById("mainNav");
if(menuToggle&&mainNav){menuToggle.addEventListener("click",()=>mainNav.classList.toggle("open"))}
document.querySelectorAll(".js-form").forEach(form=>form.addEventListener("submit",e=>{e.preventDefault();document.getElementById("globalPopup")?.classList.add("show");form.reset()}));
document.querySelectorAll(".request-popup-close").forEach(btn=>btn.addEventListener("click",()=>document.getElementById("globalPopup")?.classList.remove("show")));
document.getElementById("globalPopup")?.addEventListener("click",e=>{if(e.target.id==="globalPopup")e.currentTarget.classList.remove("show")});
document.querySelectorAll(".js-read-more").forEach(btn=>btn.addEventListener("click",()=>{const t=btn.parentElement.querySelector(".more-text"); if(t){t.hidden=!t.hidden; btn.textContent=t.hidden?"Read More":"Show Less"}}));
document.querySelectorAll("[data-tab]").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll("[data-tab]").forEach(b=>b.classList.remove("active"));document.querySelectorAll(".tab-panel").forEach(p=>p.classList.remove("active"));btn.classList.add("active");document.getElementById(btn.dataset.tab)?.classList.add("active")}));
document.querySelectorAll("[data-filter]").forEach(btn=>btn.addEventListener("click",()=>{const f=btn.dataset.filter;document.querySelectorAll("[data-filter]").forEach(b=>b.classList.remove("active"));btn.classList.add("active");document.querySelectorAll(".resource-card").forEach(c=>{c.style.display=(f==="all"||c.dataset.cat===f)?"block":"none"})}));
document.querySelectorAll("[data-service-filter]").forEach(btn=>btn.addEventListener("click",()=>{const f=btn.dataset.serviceFilter;document.querySelectorAll("[data-service-filter]").forEach(b=>b.classList.remove("active"));btn.classList.add("active");document.querySelectorAll(".service-card-filter").forEach(c=>{c.style.display=(f==="all"||c.dataset.type===f)?"block":"none"})}));

document.querySelectorAll(".faq-q").forEach(btn=>btn.addEventListener("click",()=>btn.closest(".faq-item")?.classList.toggle("open")));

// V5.1 DMMT chat option session
(function(){
  function ready(fn){
    if(document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }
  ready(function(){
    const panel = document.getElementById("dmmtChatPanel");
    const fab = document.getElementById("dmmtChatFab");
    if(!panel || !fab) return;

    const closeBtn = panel.querySelector(".dmmt-chat-close");
    const backBtn = panel.querySelector(".dmmt-chat-back");
    const selectedBox = panel.querySelector(".dmmt-selected-service");
    const options = panel.querySelectorAll("[data-chat-option]");

    function openPanel(){
      panel.classList.add("show");
    }
    function closePanel(){
      panel.classList.remove("show");
      panel.classList.remove("session-open");
      const session = panel.querySelector(".dmmt-chat-session");
      if(session) session.hidden = true;
    }
    function openSession(title){
      if(selectedBox) selectedBox.textContent = title;
      const session = panel.querySelector(".dmmt-chat-session");
      if(session) session.hidden = false;
      panel.classList.add("show");
      panel.classList.add("session-open");
    }
    function backToOptions(){
      panel.classList.remove("session-open");
      const session = panel.querySelector(".dmmt-chat-session");
      if(session) session.hidden = true;
    }

    fab.addEventListener("click", function(){
      panel.classList.toggle("show");
    });
    if(closeBtn) closeBtn.addEventListener("click", closePanel);
    if(backBtn) backBtn.addEventListener("click", backToOptions);

    options.forEach(function(option){
      option.addEventListener("click", function(e){
        e.preventDefault();
        const title = option.getAttribute("data-chat-option") || option.textContent.trim() || "Dream Maker Support";
        openSession(title);
      });
    });

    document.addEventListener("keydown", function(e){
      if(e.key === "Escape") closePanel();
    });
  });
})();

// V5.3 DMMT Digital Access demo login/register behavior
(function(){
  function ready(fn){
    if(document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }
  ready(function(){
    document.querySelectorAll(".demo-login-form").forEach(function(form){
      form.addEventListener("submit", function(e){
        e.preventDefault();
        const msg = form.querySelector(".demo-login-error");
        if(msg) msg.textContent = "Invalid credentials. Please check your username and password.";
      });
    });
    document.querySelectorAll(".dmmt-register-form").forEach(function(form){
      form.addEventListener("submit", function(e){
        e.preventDefault();
        const msg = form.querySelector(".register-demo-error");
        if(msg) msg.textContent = "SQL Data Not connected";
      });
    });
  });
})();



// DMMT V8 clean navigation and WhatsApp support panel
document.addEventListener('DOMContentLoaded', function(){
  var toggle=document.getElementById('menuToggle');
  var nav=document.getElementById('mainNav');
  if(toggle && nav){toggle.addEventListener('click',function(){nav.classList.toggle('is-open');document.body.classList.toggle('dmmt-menu-open');});}
  var open=document.getElementById('dmmtWaOpen');
  var panel=document.getElementById('dmmtWaPanel');
  var close=document.getElementById('dmmtWaClose');
  if(open && panel){open.addEventListener('click',function(){panel.hidden=false;});}
  if(close && panel){close.addEventListener('click',function(){panel.hidden=true;});}
});



// DMMT V13 nav toggle only
document.addEventListener("DOMContentLoaded", function(){
  var toggle = document.getElementById("menuToggle");
  var nav = document.getElementById("mainNav");
  if(toggle && nav){
    toggle.addEventListener("click", function(){
      nav.classList.toggle("is-open");
      document.body.classList.toggle("dmmt-menu-open");
    });
  }
});
