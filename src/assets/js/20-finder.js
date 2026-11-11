// 首页 Finder：输入即过滤，方向键或悬停选中一行，底部命令条跟着换成那一行的安装命令。
(function () {
  var PB = window.PB;
  var root = document.querySelector("[data-finder]");
  if (!root) return;
  var input = document.getElementById("finder-q");
  var label = root.querySelector("[data-finder-label]");
  var list = root.querySelector("[data-finder-list]");
  var text = root.querySelector("[data-finder-text]");
  var copyBtn = root.querySelector("[data-finder-copy]");
  var initial = list.innerHTML; // 清空输入时恢复服务端渲染的那 6 行
  var sel = -1;

  function rows() {
    return list.querySelectorAll(".prow");
  }

  function showCommand(install) {
    text.textContent = install || PB.data.t.noPackage;
    copyBtn.hidden = !install;
  }

  function select(i) {
    var items = rows();
    if (!items.length) {
      sel = -1;
      showCommand("");
      return;
    }
    sel = (i + items.length) % items.length;
    items.forEach(function (li, n) {
      li.classList.toggle("is-sel", n === sel);
    });
    showCommand(items[sel].getAttribute("data-install"));
  }

  function render(idx) {
    var q = input.value.trim();
    if (!q) {
      list.innerHTML = initial;
      label.textContent = label.getAttribute("data-popular");
      select(0);
      return;
    }
    var hit = PB.matcher(q);
    var all = idx.p.filter(function (p) {
      return hit([p[0], p[8], p[2], (PB.data.cats[p[3]] || [""])[0]]);
    });
    var ps = all.slice(0, 6);
    label.textContent = label.getAttribute("data-results");
    list.innerHTML = ps.length ? ps.map(PB.pluginRow).join("") : '<li class="finder-none">' + PB.esc(PB.data.t.noResults.replace("{q}", q)) + "</li>";
    if (all.length > ps.length) list.insertAdjacentHTML("beforeend", '<li class="finder-more">' + PB.allLink(q, all.length) + "</li>");
    select(0);
  }

  input.addEventListener("input", function () {
    if (!input.value.trim()) return render(null);
    PB.loadIndex().then(render, function () {
      list.innerHTML = '<li class="finder-none">' + PB.esc(PB.data.t.loadFailed) + "</li>";
      select(0);
    });
  });

  input.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      select(sel + (e.key === "ArrowDown" ? 1 : -1));
    } else if (e.key === "Enter") {
      var row = rows()[sel];
      if (row) location.href = row.querySelector("a").href;
    }
  });

  // 鼠标悬停和键盘聚焦与方向键共用同一个选中状态
  function follow(e) {
    var row = e.target.closest && e.target.closest(".prow");
    if (!row) return;
    var i = Array.prototype.indexOf.call(rows(), row);
    if (i !== -1 && i !== sel) select(i);
  }
  list.addEventListener("mouseover", follow);
  list.addEventListener("focusin", follow);

  copyBtn.addEventListener("click", function () {
    PB.copy(text.textContent, copyBtn);
  });

  select(0);
})();
