// 列表页：搜索、排序和翻页。状态记在网址里（?q= &sort= &page=），刷新、后退、把链接发给别人都能还原。
// 没有搜索词且保持默认排序时，页面就是服务端渲染的原样（含分页）。
(function () {
  var PB = window.PB;

  // 窄屏下分类栏是一条横向滚动的带子，先把当前分类滚进视野
  var on = document.querySelector(".bay-rail .is-on");
  if (on) on.closest("ul").scrollLeft = on.offsetLeft - 16;

  var form = document.querySelector("[data-list-tools]");
  var list = document.querySelector("[data-list]");
  if (!form || !list) return; // 空分类没有列表，控件保持隐藏

  var count = document.querySelector("[data-list-count]");
  var pager = document.querySelector("[data-list-pager]");
  var q = form.elements.q;
  var sort = form.elements.sort;
  var cat = form.getAttribute("data-cat");
  var base = form.getAttribute("data-base");
  var per = Number(form.getAttribute("data-per"));
  var defaultSort = sort.options[0].value; // 不读 sort.value：刷新时浏览器可能把上次的选择填回来
  var page = 1;

  var bay = Array.prototype.map.call(document.querySelectorAll(".bay-rail [data-cat]"), function (a) {
    var n = a.querySelector(".bay-count");
    return { a: a, n: n, cat: a.getAttribute("data-cat"), href: a.getAttribute("href"), count: n.textContent };
  });
  var server = { list: list.innerHTML, count: count.textContent, pager: pager.innerHTML, url: location.pathname };

  var sorters = {
    stars: function (a, b) { return b[4] - a[4]; },
    updated: function (a, b) { return a[5] < b[5] ? 1 : a[5] > b[5] ? -1 : 0; },
    listed: function (a, b) { return a[6] < b[6] ? 1 : a[6] > b[6] ? -1 : 0; },
    name: function (a, b) { return a[0].localeCompare(b[0]); },
  };

  /** 当前搜索词和排序拼成的查询串，n 是页码。默认值不写进去。 */
  function qs(n) {
    var s = new URLSearchParams();
    if (q.value.trim()) s.set("q", q.value.trim());
    if (sort.value !== defaultSort) s.set("sort", sort.value);
    if (n > 1) s.set("page", n);
    s = s.toString();
    return s ? "?" + s : "";
  }

  function readUrl() {
    var s = new URLSearchParams(location.search);
    q.value = s.get("q") || "";
    sort.value = sorters[s.get("sort")] ? s.get("sort") : defaultSort;
    page = Math.max(1, parseInt(s.get("page"), 10) || 1);
  }

  function countLabel(n) {
    var forms = PB.data.t.count.split("|");
    return (n === 1 ? forms[0] : forms[forms.length - 1]).replace("{n}", n);
  }

  /** 和 src/templates/parts.js 的 pagination 输出同样的结构，链接带 data-page 供点击时就地翻页。 */
  function pagerHtml(pages) {
    if (pages <= 1) return "";
    var t = PB.data.t;
    var link = function (n, label, rel) {
      return '<a href="' + PB.esc(base + qs(n)) + '" data-page="' + n + '"' + (rel ? ' rel="' + rel + '"' : "") + ">" + label + "</a>";
    };
    var off = function (label) {
      return '<span class="pager-off">' + label + "</span>";
    };
    var items = "";
    var gap = false;
    for (var n = 1; n <= pages; n++) {
      if (n === 1 || n === pages || Math.abs(n - page) <= 2) {
        items += "<li>" + (n === page ? '<span aria-current="page">' + n + "</span>" : link(n, n)) + "</li>";
        gap = false;
      } else if (!gap) {
        items += "<li>…</li>";
        gap = true;
      }
    }
    return (
      '<nav class="pager" aria-label="' + PB.esc(t.pagination) + '">' +
      (page > 1 ? link(page - 1, PB.esc(t.prev), "prev") : off(PB.esc(t.prev))) +
      "<ol>" + items + "</ol>" +
      (page < pages ? link(page + 1, PB.esc(t.next), "next") : off(PB.esc(t.next))) +
      "</nav>"
    );
  }

  /** 分类栏：数量换成各分类的命中数，链接带上当前搜索词和排序，换分类时不用重新输入。 */
  function paintBay(hits) {
    var query = qs(1);
    bay.forEach(function (b) {
      var n = hits ? (b.cat ? hits[b.cat] || 0 : hits.all) : b.count;
      b.n.textContent = n;
      b.a.classList.toggle("is-none", !!hits && n === 0);
      b.a.setAttribute("href", b.href + query);
    });
  }

  function restore() {
    list.removeAttribute("aria-busy");
    list.innerHTML = server.list;
    count.textContent = server.count;
    pager.innerHTML = server.pager;
    paintBay(null);
  }

  function render(idx) {
    var query = q.value.trim();
    var hit = PB.matcher(query);
    var all = query
      ? idx.p.filter(function (p) {
          return hit([p[0], p[8], p[2], (PB.data.cats[p[3]] || [""])[0]]);
        })
      : idx.p;
    var hits = { all: all.length };
    all.forEach(function (p) {
      hits[p[3]] = (hits[p[3]] || 0) + 1;
    });
    var ps = all.filter(function (p) {
      return !cat || p[3] === cat;
    });
    ps.sort(sorters[sort.value]);
    var pages = Math.max(1, Math.ceil(ps.length / per));
    page = Math.min(page, pages);

    if (ps.length) {
      list.innerHTML = ps.slice((page - 1) * per, page * per).map(PB.pluginRow).join("");
    } else {
      // 当前分类里没有，但别的分类里有：给一条直达全部结果的出路
      list.innerHTML = '<li class="empty">' + PB.esc(PB.data.t.noResults.replace("{q}", query)) + (all.length ? " " + PB.allLink(query, all.length) : "") + "</li>";
    }
    list.removeAttribute("aria-busy");
    count.textContent = countLabel(ps.length);
    pager.innerHTML = pagerHtml(pages);
    paintBay(query ? hits : null);
  }

  /** 按控件的当前值重画列表。mode 是 "replace" 或 "push" 时同步网址，不传表示网址已经是对的。 */
  function update(mode) {
    var idle = !q.value.trim() && sort.value === defaultSort;
    if (mode) history[mode + "State"](null, "", idle ? server.url : base + qs(page));
    if (idle) {
      restore();
      return Promise.resolve();
    }
    list.setAttribute("aria-busy", "true");
    return PB.loadIndex().then(render, function () {
      list.removeAttribute("aria-busy");
      count.textContent = PB.data.t.loadFailed;
    });
  }

  function retype() {
    page = 1;
    update("replace");
  }

  form.hidden = false;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
  });
  q.addEventListener("input", retype);
  sort.addEventListener("change", retype);

  pager.addEventListener("click", function (e) {
    var a = e.target.closest("a[data-page]");
    if (!a || e.button || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    page = Number(a.getAttribute("data-page"));
    update("push").then(function () {
      // 翻页后回到列表顶部，键盘焦点落在新一页的第一行
      if (form.getBoundingClientRect().top < document.querySelector(".hd").offsetHeight) form.scrollIntoView(); // 停在常驻页眉下方，位置由 scroll-padding-top 决定
      var first = list.querySelector("a");
      if (first) first.focus({ preventScroll: true });
    });
  });

  window.addEventListener("popstate", function () {
    readUrl();
    update();
  });

  // 带着状态进来：站内搜索的"查看全部"、WebSite SearchAction 的落点、别人发来的链接
  readUrl();
  if (location.search) update();
})();
