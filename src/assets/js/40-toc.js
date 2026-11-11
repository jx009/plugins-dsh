// 教程目录：高亮正在阅读的那一节。
(function () {
  var toc = document.querySelector("[data-toc]");
  if (!toc || !("IntersectionObserver" in window)) return;
  var links = {};
  var heads = [];
  toc.querySelectorAll("a").forEach(function (a) {
    var id = decodeURIComponent(a.getAttribute("href").slice(1));
    var h = document.getElementById(id);
    if (h) {
      links[id] = a;
      heads.push(h);
    }
  });
  if (!heads.length) return;

  function mark(id) {
    for (var k in links) links[k].classList.toggle("is-on", k === id);
  }

  // 视口上方 30% 作为"正在读"的判定带；标题进入这条带时切换
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) mark(e.target.id);
      });
    },
    { rootMargin: "0px 0px -70% 0px" }
  );
  heads.forEach(function (h) {
    io.observe(h);
  });
})();
