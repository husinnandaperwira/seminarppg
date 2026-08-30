(function () {
  "use strict";

  /* ---------- Typewriter role line ---------- */
  var roles = [
    "\"Frontend & Mobile Developer\"",
    "\"Guru Produktif SMK PPLG\"",
    "\"Lifelong Learner\""
  ];
  var twEl = document.getElementById("typewriter");
  if (twEl) {
    var ri = 0, ci = 0, deleting = false;
    var typeSpeed = 55, deleteSpeed = 30, hold = 1400, gap = 350;

    function tick() {
      var word = roles[ri];
      if (!deleting) {
        ci++;
        twEl.textContent = word.slice(0, ci);
        if (ci === word.length) {
          deleting = true;
          setTimeout(tick, hold);
          return;
        }
        setTimeout(tick, typeSpeed);
      } else {
        ci--;
        twEl.textContent = word.slice(0, ci);
        if (ci === 0) {
          deleting = false;
          ri = (ri + 1) % roles.length;
          setTimeout(tick, gap);
          return;
        }
        setTimeout(tick, deleteSpeed);
      }
    }
    setTimeout(tick, 500);
  }

  /* ---------- Mobile tab menu toggle ---------- */
  var menuToggle = document.getElementById("menuToggle");
  var tabbar = document.getElementById("tabbar");
  if (menuToggle && tabbar) {
    menuToggle.addEventListener("click", function () {
      tabbar.classList.toggle("is-open");
    });
    tabbar.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        tabbar.classList.remove("is-open");
      });
    });
  }

  /* ---------- Active tab highlight on scroll ---------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".tab"));
  var activeFileLabel = document.getElementById("active-file");
  var sections = tabs
    .map(function (t) {
      var id = t.getAttribute("data-target");
      return document.getElementById(id);
    })
    .filter(Boolean);

  var fileNames = {};
  tabs.forEach(function (t) {
    fileNames[t.getAttribute("data-target")] = t.textContent.trim();
  });

  function setActive(id) {
    tabs.forEach(function (t) {
      t.classList.toggle("is-active", t.getAttribute("data-target") === id);
    });
    if (activeFileLabel && fileNames[id]) {
      activeFileLabel.textContent = fileNames[id];
    }
  }

  if ("IntersectionObserver" in window && sections.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (s) {
      io.observe(s);
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealEls.length) {
    var revealIO = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) {
      revealIO.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------- Steps accordion (LK1) ---------- */
  document.querySelectorAll(".step").forEach(function (step) {
    step.addEventListener("click", function () {
      var body = step.querySelector(".step-body");
      var isOpen = step.classList.contains("is-open");
      if (isOpen) {
        step.classList.remove("is-open");
        body.style.maxHeight = null;
      } else {
        step.classList.add("is-open");
        body.style.maxHeight = body.scrollHeight + 40 + "px";
      }
    });
  });

  /* ---------- Commit timeline accordion (LK2) ---------- */
  document.querySelectorAll(".commit-head").forEach(function (head) {
    head.addEventListener("click", function () {
      var commit = head.closest(".commit");
      var body = commit.querySelector(".commit-body");
      var isOpen = commit.classList.contains("is-open");
      if (isOpen) {
        commit.classList.remove("is-open");
        body.style.maxHeight = null;
      } else {
        commit.classList.add("is-open");
        body.style.maxHeight = body.scrollHeight + 60 + "px";
      }
    });
  });

  /* Open the first course of each timeline by default so visitors see the content shape */
  document.querySelectorAll(".commit-timeline").forEach(function (timeline) {
    var firstHead = timeline.querySelector(".commit-head");
    if (firstHead) {
      firstHead.click();
    }
  });

  /* ---------- Back to top ---------- */
  var toTop = document.getElementById("toTop");
  if (toTop) {
    window.addEventListener(
      "scroll",
      function () {
        toTop.classList.toggle("is-visible", window.scrollY > 700);
      },
      { passive: true }
    );
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
