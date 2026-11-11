// 全站搜索对话框：Ctrl/⌘ K 或页眉按钮打开，方向键选择，回车跳转。
(function () {
  var PB = window.PB;
  var dialog = document.getElementById("search");
  if (!dialog || !dialog.showModal) return;
  var input = document.getElementById("search-input");
  var list = document.getElementById("search-results");
  var sel = -1;

  var isMac = /Mac|iPhone|iPad/.test(navigator.platform);
  if (isMac) {
    document.querySelectorAll(".hd-search kbd").forEach(function (k) {
      k.textContent = "⌘K";
    });
  }

  function links() {
    return list.querySelectorAll("a");
  }

  function select(i) {
    var items = links();
    if (!items.length) return;
    sel = (i + items.length) % items.length;
    items.forEach(function (a, n) {
      a.classList.toggle("is-sel", n === sel);
    });
    items[sel].scrollIntoView({ block: "nearest" });
  }

  function row(href, name, sum, color) {
    return '<li><a href="' + href + '"' + (color ? ' style="--jack:' + color + '"' : "") + '><span class="jack" aria-hidden="true"></span><span class="sd-name">' + PB.esc(name) + '</span><span class="sd-sum">' + PB.esc(sum) + "</span></a></li>";
  }

  function render(idx) {
    var q = input.value.trim();
    var hit = PB.matcher(q);
    var all = q ? idx.p.filter(function (p) { return hit([p[0], p[8], p[2], (PB.data.cats[p[3]] || [""])[0]]); }) : idx.p;
    var ps = all.slice(0, 8);
    var ts = (q ? idx.t.filter(function (t) { return hit([t[0], t[3], PB.data.tcats[t[2]] || ""]); }) : idx.t).slice(0, 5);
    var html = "";
    if (ps.length) {
      html += '<li class="sd-group">' + PB.esc(PB.data.t.groupPlugins) + "</li>";
      html += ps.map(function (p) { return row(PB.data.prefix + "/plugins/" + PB.esc(p[1]), p[0], p[2], (PB.data.cats[p[3]] || [])[1]); }).join("");
      if (q && all.length > ps.length) html += '<li class="sd-more">' + PB.allLink(q, all.length) + "</li>";
    }
    if (ts.length) {
      html += '<li class="sd-group">' + PB.esc(PB.data.t.groupTutorials) + "</li>";
      html += ts.map(function (t) { return row(PB.data.prefix + "/tutorials/" + PB.esc(t[1]), t[0], t[3]); }).join("");
    }
    if (!html) html = '<li class="sd-none">' + PB.esc(PB.data.t.noResults.replace("{q}", q)) + "</li>";
    list.innerHTML = html;
    sel = -1;
    if (q) select(0);
  }

  function update() {
    PB.loadIndex().then(render, function () {
      list.innerHTML = '<li class="sd-none">' + PB.esc(PB.data.t.loadFailed) + "</li>";
    });
  }

  function open() {
    if (dialog.open) return;
    dialog.showModal();
    input.select();
    update();
  }

  document.addEventListener("click", function (e) {
    if (e.target.closest("[data-open-search]")) open();
    else if (e.target === dialog) dialog.close(); // 点在遮罩上
  });

  document.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      open();
    }
  });

  input.addEventListener("input", update);
  input.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      select(sel + (e.key === "ArrowDown" ? 1 : -1));
    } else if (e.key === "Enter") {
      var a = links()[sel];
      if (a) location.href = a.href;
    }
  });
})();
