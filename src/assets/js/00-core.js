// 公共部分：页面数据、搜索索引、行渲染，以及主题 / 导航 / 复制三个小交互。
(function () {
  var data = JSON.parse(document.getElementById("site-data").textContent);
  var indexPromise = null;

  var escMap = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return escMap[c];
    });
  }

  function compact(n) {
    if (n >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
    if (n >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, "") + "k";
    return String(n);
  }

  var dateFmt = new Intl.DateTimeFormat(data.locale, { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });
  function date(iso) {
    return iso ? dateFmt.format(new Date(iso + "T00:00:00Z")) : "";
  }

  /** 索引只在第一次用到时请求。p / t 的字段顺序见 scripts/build.js。 */
  function loadIndex() {
    if (!indexPromise) {
      indexPromise = fetch(data.index)
        .then(function (r) {
          if (!r.ok) throw new Error(r.status);
          return r.json();
        })
        .catch(function (e) {
          indexPromise = null;
          throw e;
        });
    }
    return indexPromise;
  }

  /** 每个词都要出现在任意一个字段里。 */
  function matcher(q) {
    var words = q.toLowerCase().split(/\s+/).filter(Boolean);
    return function (fields) {
      var hay = fields.join(" ").toLowerCase();
      return words.every(function (w) {
        return hay.indexOf(w) !== -1;
      });
    };
  }

  var STAR = '<svg class="icon" viewBox="0 0 16 16" width="13" height="13" aria-hidden="true"><path d="M8 1.2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L8 12l-4.2 2.2.8-4.7L1.2 6.2l4.7-.7z" fill="currentColor"/></svg>';

  /** 和 src/templates/parts.js 的 pluginRow 输出同样的结构。 */
  function pluginRow(p) {
    var cat = data.cats[p[3]] || ["", ""];
    return (
      '<li class="prow" style="--jack:' + cat[1] + '" data-install="' + esc(p[7]) + '"><a href="' + data.prefix + "/plugins/" + esc(p[1]) + '">' +
      '<span class="jack" aria-hidden="true"></span><span class="prow-id"><span class="prow-name">' + esc(p[0]) + '</span><span class="prow-owner">' + esc(p[8]) + "</span></span>" +
      '<span class="prow-sum">' + esc(p[2]) + "</span>" +
      '<span class="prow-cat">' + esc(cat[0]) + "</span>" +
      '<span class="prow-stars">' + STAR + compact(p[4]) + "</span>" +
      '<time class="prow-date" datetime="' + esc(p[5]) + '">' + date(p[5]) + "</time>" +
      "</a></li>"
    );
  }

  /** 只显示前几条结果的地方，用它通往列表页上的完整结果。 */
  function allLink(q, n) {
    return '<a href="' + data.prefix + "/plugins?q=" + encodeURIComponent(q) + '">' + esc(data.t.viewAll.replace("{n}", n)) + "</a>";
  }

  function copy(text, btn) {
    var done = function () {
      var label = btn.querySelector("span") || btn;
      btn.classList.add("is-done");
      label.textContent = data.t.copied;
      clearTimeout(btn._t);
      btn._t = setTimeout(function () {
        btn.classList.remove("is-done");
        label.textContent = data.t.copy;
      }, 1600);
    };
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text).then(done);
    // 非 https 环境的退路
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.style.cssText = "position:fixed;opacity:0";
    document.body.appendChild(ta);
    ta.select();
    try {
      if (document.execCommand("copy")) done();
    } finally {
      ta.remove();
    }
  }

  // 配色：跟随系统 → 浅色 → 深色 循环。选择存在 localStorage，"跟随系统"时不存。
  var media = window.matchMedia ? matchMedia("(prefers-color-scheme: dark)") : null;
  function applyTheme() {
    var d = document.documentElement;
    var pref = d.dataset.themePref || "system";
    d.dataset.theme = pref === "system" ? (media && media.matches ? "dark" : "light") : pref;
    var btn = document.querySelector("[data-theme-toggle]");
    if (btn) {
      var label = btn.getAttribute("data-label-" + pref) || "";
      btn.setAttribute("aria-label", label);
      btn.setAttribute("title", label);
    }
  }
  function setTheme(pref, animate) {
    var d = document.documentElement;
    // 只在用户点击时做一次短过渡，首屏和跨标签同步不动画
    if (animate && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      d.classList.add("theme-anim");
      clearTimeout(setTheme.t);
      setTheme.t = setTimeout(function () { d.classList.remove("theme-anim"); }, 260);
    }
    d.dataset.themePref = pref;
    try {
      if (pref === "system") localStorage.removeItem("theme");
      else localStorage.setItem("theme", pref);
    } catch (err) {}
    applyTheme();
  }
  // 系统切换深浅色时，"跟随系统"立即跟上
  if (media) {
    var onSystem = function () { if ((document.documentElement.dataset.themePref || "system") === "system") applyTheme(); };
    if (media.addEventListener) media.addEventListener("change", onSystem);
    else if (media.addListener) media.addListener(onSystem);
  }
  // 其它标签页改了配色，这里同步
  window.addEventListener("storage", function (e) {
    if (e.key !== "theme") return;
    document.documentElement.dataset.themePref = e.newValue === "light" || e.newValue === "dark" ? e.newValue : "system";
    applyTheme();
  });
  // 浏览器前进后退从缓存恢复页面时，重新读一次选择
  window.addEventListener("pageshow", function (e) {
    if (!e.persisted) return;
    var p = null;
    try { p = localStorage.getItem("theme"); } catch (err) {}
    document.documentElement.dataset.themePref = p === "light" || p === "dark" ? p : "system";
    applyTheme();
  });
  applyTheme();

  window.PB = { data: data, esc: esc, loadIndex: loadIndex, matcher: matcher, pluginRow: pluginRow, allLink: allLink, copy: copy };

  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-copy],[data-theme-toggle],[data-nav-toggle]");
    if (!el) return;
    if (el.hasAttribute("data-copy")) {
      copy(el.getAttribute("data-copy"), el);
    } else if (el.hasAttribute("data-theme-toggle")) {
      var order = { system: "light", light: "dark", dark: "system" };
      setTheme(order[document.documentElement.dataset.themePref] || "light", true);
    } else {
      var open = document.getElementById("nav").classList.toggle("is-open");
      el.setAttribute("aria-expanded", String(open));
    }
  });
})();
