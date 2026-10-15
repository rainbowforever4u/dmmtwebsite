(function () {
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    /* Keep dropdown accessible on click without disturbing existing hover behavior */
    document.querySelectorAll(".dmmt-header .has-menu > a").forEach(function (link) {
      link.addEventListener("click", function (event) {
        var parent = link.closest(".has-menu");
        var dropdown = parent ? parent.querySelector(".services-two-col") : null;

        if (!dropdown) return;

        if (window.innerWidth <= 1100) {
          event.preventDefault();

          document.querySelectorAll(".dmmt-header .has-menu.is-open").forEach(function (item) {
            if (item !== parent) item.classList.remove("is-open");
          });

          parent.classList.toggle("is-open");
        }
      });
    });

    document.addEventListener("click", function (event) {
      if (!event.target.closest(".dmmt-header .has-menu")) {
        document.querySelectorAll(".dmmt-header .has-menu.is-open").forEach(function (item) {
          item.classList.remove("is-open");
        });
      }
    });
  });
})();
