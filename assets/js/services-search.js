(function () {
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  function normalize(value) {
    return (value || "")
      .toString()
      .toLowerCase()
      .replace(/[._-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function expandQuery(value) {
    var q = normalize(value);

    if (!q) return "";

    var aliases = {
      "it": "it information technology healthcare information technology solutions digital systems software web portals mobile applications erp crm ecommerce booking dashboards bi cybersecurity cyber security",
      "i t": "it information technology healthcare information technology solutions digital systems software web portals mobile applications erp crm ecommerce booking dashboards bi cybersecurity cyber security",
      "i.t": "it information technology healthcare information technology solutions digital systems software web portals mobile applications erp crm ecommerce booking dashboards bi cybersecurity cyber security",
      "technology": "technology information technology it healthcare information technology solutions software digital systems portals dashboards cybersecurity",
      "software": "software it information technology web portals mobile applications erp crm healthcare systems",
      "portal": "portal portals web portals it information technology software",
      "portals": "portal portals web portals it information technology software",
      "mobile": "mobile applications apps it information technology software",
      "erp": "erp systems it information technology software",
      "crm": "crm platforms it information technology software",
      "dashboard": "dashboard dashboards bi reports analytics it information technology",
      "dashboards": "dashboard dashboards bi reports analytics it information technology",
      "cyber": "cyber cybersecurity cyber security adhics it information technology",
      "cybersecurity": "cyber cybersecurity cyber security adhics it information technology",
      "cyber security": "cyber cybersecurity cyber security adhics it information technology"
    };

    return aliases[q] || q;
  }

  function removeArabicButton() {
    document.querySelectorAll(".language-switch").forEach(function (el) {
      el.remove();
    });

    document.querySelectorAll("a").forEach(function (a) {
      if ((a.textContent || "").trim() === "عربي") {
        a.remove();
      }
    });
  }

  function bindHeaderSearch() {
    document.querySelectorAll("form.header-search").forEach(function (form) {
      form.setAttribute("action", "quick-request.html");
      form.setAttribute("method", "get");

      var input = form.querySelector("input");
      if (input) {
        input.setAttribute("name", "q");
        input.setAttribute("placeholder", "Search services");
      }

      form.addEventListener("submit", function (event) {
        var q = input ? input.value.trim() : "";
        if (!q) {
          event.preventDefault();
          window.location.href = "quick-request.html";
        }
      });
    });
  }

  function matchesQuery(haystack, query) {
    var q = normalize(query);
    if (!q) return true;

    var expanded = expandQuery(q);
    var terms = expanded.split(" ").filter(Boolean);

    if (haystack.indexOf(q) !== -1) return true;

    for (var i = 0; i < terms.length; i++) {
      if (terms[i].length >= 2 && haystack.indexOf(terms[i]) !== -1) {
        return true;
      }
    }

    return false;
  }

  function filterServices(value) {
    var q = normalize(value);
    var cards = Array.prototype.slice.call(document.querySelectorAll(".dmmt-service-card"));
    var visible = 0;

    cards.forEach(function (card) {
      var href = card.getAttribute("href") || "";
      var haystack = normalize(
        href + " " +
        (card.getAttribute("data-service-title") || "") + " " +
        (card.getAttribute("data-service-keywords") || "") + " " +
        (card.textContent || "")
      );

      // Strong direct rule: searching IT must show the IT service card.
      var isItQuery = q === "it" || q === "i t" || q === "i.t";
      var isItCard = href.indexOf("it-services.html") !== -1;

      var match = !q || matchesQuery(haystack, q) || (isItQuery && isItCard);

      card.hidden = !match;
      if (match) visible++;
    });

    var noResults = document.getElementById("dmmtNoResults");
    if (noResults) noResults.hidden = visible !== 0;
  }

  function bindServiceFilter() {
    var input = document.getElementById("dmmtServiceFilter");
    var button = document.getElementById("dmmtServiceSearchButton");

    if (!input) return;

    var params = new URLSearchParams(window.location.search);
    var q = params.get("q") || params.get("search") || "";

    if (q) {
      input.value = q;
      filterServices(q);
      setTimeout(function () {
        input.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 150);
    } else {
      filterServices("");
    }

    input.addEventListener("input", function () {
      filterServices(input.value);
    });

    if (button) {
      button.addEventListener("click", function () {
        filterServices(input.value);
      });
    }
  }

  ready(function () {
    removeArabicButton();
    bindHeaderSearch();
    bindServiceFilter();
  });
})();
