/* =====================================================================
   7th Sense Solutions — script.js
   No dependencies. Pure ES. Progressive enhancement throughout.
   ===================================================================== */
(function () {
  "use strict";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* -------------------- SCROLL PROGRESS + STICKY NAV -------------------- */
  var bar = $("#scrollBar");
  var nav = $("#nav");
  var ticking = false;

  function onScroll() {
    var st = window.pageYOffset || document.documentElement.scrollTop;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.width = (h > 0 ? (st / h) * 100 : 0) + "%";
    if (nav) nav.classList.toggle("is-stuck", st > 8);
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* -------------------- MOBILE MENU -------------------- */
  var burger = $("#burger");
  var menu = $("#mobileMenu");
  if (burger && menu) {
    burger.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      menu.hidden = !open;
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    $$("a", menu).forEach(function (a) {
      a.addEventListener("click", function () {
        menu.classList.remove("is-open"); menu.hidden = true;
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* -------------------- COUNT-UP STATS -------------------- */
  function countUp(el) {
    var target = parseFloat(el.getAttribute("data-count")) || 0;
    var prefix = el.getAttribute("data-prefix") || "";
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduceMotion) { el.textContent = prefix + target + suffix; return; }
    var start = null, dur = 1400;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = prefix + Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* -------------------- INTERSECTION OBSERVER (reveal + counters) -------------------- */
  // Tag major blocks for reveal.
  var revealSel = ".sec-head, .svc-card, .stat, .why__lead, .why__list, .fw, " +
                  ".sys-card, .resources__lead, .signup, .about__portrait, .about__copy, " +
                  ".quote, .contact__lead, .contact__form, .hero__copy, .hero__art";
  $$(revealSel).forEach(function (el, i) {
    el.classList.add("reveal");
    el.style.transitionDelay = Math.min((i % 4) * 60, 180) + "ms";
  });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("is-in");
        $$(".stat__num", en.target).forEach(countUp);
        if (en.target.classList && en.target.classList.contains("stat")) {
          $$(".stat__num", en.target).forEach(countUp);
        }
        io.unobserve(en.target);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

    $$(".reveal").forEach(function (el) { io.observe(el); });
    // Observe stat numbers directly too (in case parent already revealed)
    $$(".stat").forEach(function (el) { io.observe(el); });
  } else {
    $$(".reveal").forEach(function (el) { el.classList.add("is-in"); });
    $$(".stat__num").forEach(countUp);
  }

  /* -------------------- REVENUE CLARITY FRAMEWORK -------------------- */
  var FW = [
    { n: "01", t: "Strategy",
      d: "Before anything gets built, we get honest about the model: who you serve, what they pay for, and the shortest path to more of it. Every later pillar answers to this one.",
      k: "You leave with a positioning, offer, and growth thesis in writing." },
    { n: "02", t: "Systems",
      d: "We design the machine — the workflows, tools, and documentation that turn strategy into work that ships. This is where a plan stops being a document and becomes something a team can run.",
      k: "A documented operating system your team can actually follow." },
    { n: "03", t: "Automation",
      d: "The repeatable parts get handed to software: routing, follow-up, enrichment, reminders. People keep the judgment calls; the busywork disappears into the background.",
      k: "Hours back each week and zero steps quietly dropped." },
    { n: "04", t: "Measurement",
      d: "You can't improve what you can't see. We wire up honest reporting so the numbers on the dashboard match what's really happening in the business.",
      k: "One source of truth for pipeline, spend, and return." },
    { n: "05", t: "Optimization",
      d: "With a system running and data flowing, improvement becomes a habit instead of a scramble. We find the constraint, fix it, and move to the next one.",
      k: "Compounding gains from a loop that never stops turning." }
  ];

  var pills = $$(".fw-pill");
  var big = $("#fwBig"), title = $("#fwTitle"), desc = $("#fwDesc"),
      deliver = $("#fwDeliver"), panel = $("#fw-panel");

  function setPillar(i) {
    var f = FW[i]; if (!f) return;
    if (big) big.textContent = f.n;
    if (title) title.textContent = f.t;
    if (desc) desc.textContent = f.d;
    if (deliver) deliver.textContent = f.k;
    pills.forEach(function (p, idx) {
      var on = idx === i;
      p.classList.toggle("is-active", on);
      p.setAttribute("aria-selected", String(on));
    });
    if (panel && !reduceMotion) {
      panel.classList.remove("fw-fade");
      void panel.offsetWidth; // reflow to restart animation
      panel.classList.add("fw-fade");
    }
    if (panel) panel.setAttribute("aria-labelledby", "pill-" + i);
  }

  pills.forEach(function (p) {
    var i = parseInt(p.getAttribute("data-i"), 10);
    p.addEventListener("click", function () { setPillar(i); });
    // Keyboard arrow navigation across tabs
    p.addEventListener("keydown", function (e) {
      var idx = i;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") { idx = (i + 1) % FW.length; }
      else if (e.key === "ArrowUp" || e.key === "ArrowLeft") { idx = (i - 1 + FW.length) % FW.length; }
      else return;
      e.preventDefault();
      setPillar(idx);
      pills[idx].focus();
    });
  });

  /* -------------------- FORMS (graceful placeholders) -------------------- */
  // Newsletter — wire the action to Kit/Mailchimp in production.
  var nlForm = $("#newsletterForm"), nlMsg = $("#newsletterMsg");
  if (nlForm) {
    nlForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = $("#nl-email").value.trim();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        nlMsg.style.color = "var(--registration)";
        nlMsg.textContent = "That email doesn't look right — mind checking it?";
        return;
      }
      nlMsg.style.color = "var(--emerald)";
      nlMsg.textContent = "You're on the list. The toolkit is on its way.";
      nlForm.reset();
    });
  }

  // Contact — Netlify handles this on deploy; JS gives instant feedback locally.
  var cForm = $("#contactForm"), cMsg = $("#contactMsg");
  if (cForm) {
    cForm.addEventListener("submit", function (e) {
      // Only intercept when Netlify isn't present (local/dev). On Netlify the
      // native POST proceeds. Here we validate and show a friendly message.
      if (!cForm.checkValidity()) {
        e.preventDefault();
        cMsg.style.color = "var(--registration)";
        cMsg.textContent = "Please fill in your name, a valid email, and a short note.";
        return;
      }
      // Comment the next 3 lines out to let Netlify submit natively.
      e.preventDefault();
      cMsg.style.color = "var(--emerald)";
      cMsg.textContent = "Thanks — your message is queued. I'll reply within two business days.";
      cForm.reset();
    });
  }

  /* -------------------- FOOTER YEAR -------------------- */
  var yr = $("#year"); if (yr) yr.textContent = new Date().getFullYear();

  /* -------------------- SMOOTH ANCHOR OFFSET (sticky nav) -------------------- */
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var navH = nav ? nav.offsetHeight : 0;
      var y = target.getBoundingClientRect().top + window.pageYOffset - navH - 12;
      window.scrollTo({ top: y, behavior: reduceMotion ? "auto" : "smooth" });
    });
  });
})();
