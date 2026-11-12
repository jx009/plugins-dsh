// 管理界面：单个 HTML，前端无构建、无框架。所有数据来自 /api/state。
const CSS = `
:root{--bg:#f4f4ee;--face:#fbfbf7;--ink:#16171a;--dim:#5c6066;--rule:#d2d2c8;--ok:#2c7a45;--warn:#a35f00;--bad:#a8322a;--r:10px}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.55 "Segoe UI","PingFang SC","Microsoft YaHei",system-ui,sans-serif}
code,pre,.mono{font-family:"Cascadia Mono",Consolas,monospace;font-size:12.5px}
header{position:sticky;top:0;z-index:5;display:flex;align-items:center;gap:12px;padding:0 24px;height:56px;background:var(--face);border-bottom:1px solid var(--rule)}
header h1{font-size:16px;margin:0;font-weight:700;white-space:nowrap}
header>.mono{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
header .act{flex-shrink:0}
header .sp{flex:1}
.dot{width:8px;height:8px;border-radius:50%;background:var(--dim);display:inline-block;margin-right:6px}
.dot.on{background:var(--ok)}
.dot.busy{background:var(--warn);animation:p 1s infinite alternate}
@keyframes p{to{opacity:.25}}
main{display:grid;grid-template-columns:250px minmax(0,1fr);min-height:calc(100vh - 56px)}
nav{border-right:1px solid var(--rule);padding:18px 12px;position:sticky;top:56px;align-self:start;height:calc(100vh - 56px);overflow-y:auto}
nav button{display:block;width:100%;text-align:left;padding:9px 12px;border:0;border-radius:8px;background:none;font:inherit;color:var(--ink);cursor:pointer}
nav button:hover{background:#e8e8e0}
nav button.on{background:var(--ink);color:var(--face);font-weight:600}
nav .count{float:right;font-size:12px;opacity:.75}
section{padding:24px 32px 80px;max-width:1120px}
h2{font-size:20px;margin:0 0 4px}
h3{font-size:14px;margin:0 0 6px;color:var(--dim);font-weight:600}
p.sub{margin:0 0 20px;color:var(--dim)}
.card{border:1px solid var(--rule);border-radius:var(--r);background:var(--face);padding:18px 20px;margin-bottom:14px}
.row{display:grid;grid-template-columns:170px minmax(0,1fr);gap:4px 16px;align-items:start;margin-bottom:12px}
.row > label{padding-top:8px;color:var(--dim);font-size:14px}
.row .hint{grid-column:2;color:var(--dim);font-size:12.5px;margin:2px 0 0}
input,textarea,select{width:100%;padding:8px 10px;border:1px solid var(--rule);border-radius:7px;background:#fff;font:inherit}
input:focus,textarea:focus,select:focus{outline:2px solid var(--ink);border-color:var(--ink)}
textarea{resize:vertical;min-height:64px}
textarea.big{min-height:240px;font:13px/1.5 "Cascadia Mono",Consolas,monospace}
.act{padding:8px 16px;border:1px solid var(--ink);border-radius:8px;background:transparent;font:inherit;font-weight:600;cursor:pointer;color:var(--ink);text-decoration:none;display:inline-flex;align-items:center;white-space:nowrap}
.act:hover{background:var(--ink);color:var(--face)}
.act.ink{background:var(--ink);color:var(--face)}
.act.ink:hover{background:transparent;color:var(--ink)}
.act.ok{border-color:var(--ok);color:var(--ok)}
.act.ok:hover{background:var(--ok);color:#fff}
.act.bad{border-color:var(--bad);color:var(--bad)}
.act.bad:hover{background:var(--bad);color:#fff}
.act:disabled{opacity:.45;cursor:default;background:transparent;color:var(--dim);border-color:var(--rule)}
.act:focus-visible,nav button:focus-visible{outline:2px solid var(--ink);outline-offset:2px}
input:disabled,textarea:disabled,select:disabled{background:#efefe8;color:var(--dim)}
.bar{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:16px}
.bar .sp{flex:1}
.tag{display:inline-block;padding:1px 8px;border:1px solid var(--rule);border-radius:99px;font-size:12px;color:var(--dim);white-space:nowrap}
.tag.pending{border-color:#c9a227;color:#8a6d00}
.tag.approved{border-color:var(--ok);color:var(--ok)}
.tag.published{border-color:var(--rule);color:var(--dim)}
.tag.warn{border-color:var(--warn);color:var(--warn)}
.item{border:1px solid var(--rule);border-radius:var(--r);background:var(--face);margin-bottom:14px;overflow:hidden}
.item > .hd{display:flex;gap:12px;align-items:baseline;padding:12px 16px;cursor:pointer}
.item > .hd:hover{background:#f0f0e9}
.item .name{font-weight:650}
.item .who{color:var(--dim);font-size:13px}
.item .meta{margin-left:auto;display:flex;gap:10px;align-items:center;color:var(--dim);font-size:12.5px}
.item .bd{padding:14px 16px 16px;border-top:1px solid var(--rule);display:none}
.item.open .bd{display:block}
.item .bd h3{margin:16px 0 8px}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:0 16px}
.log{background:#111;color:#ddd;border-radius:8px;padding:12px;max-height:320px;overflow:auto;white-space:pre-wrap}
.note{padding:10px 14px;border-left:3px solid var(--ink);background:#ecece4;border-radius:0 8px 8px 0;margin-bottom:14px;white-space:pre-wrap}
.note.ok{border-color:var(--ok);background:#e6f1e8}
.note.bad{border-color:var(--bad);background:#f7e7e5}
.empty{color:var(--dim);padding:32px;border:1px dashed var(--rule);border-radius:var(--r);text-align:center}
.split{display:flex;gap:10px;align-items:center}
.split > .grow{flex:1;min-width:0}
.prog{height:4px;background:var(--rule);border-radius:99px;overflow:hidden;margin-bottom:14px}
.prog span{display:block;height:100%;background:var(--warn);transition:width .6s}
@media(max-width:900px){main{display:block}nav{border-right:0;border-bottom:1px solid var(--rule);display:flex;gap:6px;overflow-x:auto;padding:10px 12px;height:auto;background:var(--bg);z-index:4}nav button{width:auto;white-space:nowrap;flex-shrink:0}nav .count{float:none;margin-left:6px}header{padding:0 14px}.row{grid-template-columns:1fr}.row .hint{grid-column:1}section{padding:18px}.grid2{grid-template-columns:1fr}}`;

const JS = String.raw`
// edits：各候选未保存的修改；cfg：设置表单未保存的修改。重绘时从这里回填，不会被轮询冲掉
var S={tab:"pending",open:{},edits:{},cfg:{},adding:false,addText:"",busy:false,timer:null,raw:"",composing:false,dirty:false};
var $=function(id){return document.getElementById(id)};
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function get(p){var o=S.state||{},ks=p.split(".");for(var i=0;i<ks.length;i++){if(o==null)return undefined;o=o[ks[i]]}return o}
function api(method,url,body){
  var h={"X-Admin-Token":(window.__NONCE__||"")};
  if(body)h["Content-Type"]="application/json";
  return fetch(url,{method:method,headers:h,body:body?JSON.stringify(body):undefined}).then(function(r){
    // 登录过期（7 天）或换了口令：刷新回到口令页
    if(r.status===401){location.reload();return new Promise(function(){})}
    return r.json().catch(function(){return {}}).then(function(j){if(!r.ok)throw new Error(j.error||("HTTP "+r.status));return j});
  });
}
var notice=null;
function notify(kind,text,keep){
  notice={kind:kind,text:text};render();
  if(!keep&&kind!=="load")setTimeout(function(){if(notice&&notice.text===text){notice=null;render()}},kind==="bad"?10000:4000);
}
// 状态没变就不重绘，减少打断正在编辑的输入框
function accept(j){var raw=JSON.stringify(j);if(raw===S.raw)return;S.raw=raw;S.state=j;render()}
function load(){return api("GET","/api/state").then(function(j){accept(j);if(get("job.running"))poll()}).catch(function(e){notify("bad",e.message)})}
function poll(){
  if(S.timer)return;
  S.timer=setTimeout(function(){
    S.timer=null;
    api("GET","/api/state").then(function(j){
      var wasRunning=get("job.running");
      accept(j);
      if(get("job.running"))poll();
      else if(wasRunning)scanDone();
    }).catch(function(e){notify("bad",e.message)});
  },1800);
}
function scanDone(){
  var jb=get("job")||{},ls=get("lastScan")||{},n=(ls.added||[]).length,errs=(ls.errors||[]).length;
  if(jb.error)return notify("bad","扫描失败："+jb.error,true);
  var tail=(ls.skipped||[]).length?"，自动跳过 "+ls.skipped.length+" 个":"";
  if(errs)tail+="，"+errs+" 个出错（详情在运行日志）";
  notify(n?"ok":"load",(ls.cancelled?"扫描已停止":"扫描结束")+"：新增 "+n+" 个候选"+tail+(n?"。去「待审批」逐条看。":"。没有找到新的，可以到设置里换搜索语句。"),true);
}
function count(st){return (get("queue")||[]).filter(function(q){return q.status===st}).length}
function header(){
  var c=get("config")||{},jb=get("job")||{};
  var ready=c.tokenSet&&c.repo;
  var status=jb.running?'<span class="mono"><span class="dot busy"></span>'+esc(jb.step||"扫描中")+(jb.want?" "+jb.added+"/"+jb.want:"")+'</span>'
    :'<span class="mono"><span class="dot '+(ready?"on":"")+'"></span>'+(ready?esc(c.repo)+"@"+esc(c.branch):"未填写令牌或目标仓库")+'</span>';
  var btn=jb.running?'<button class="act bad" id="stop">停止扫描</button>':'<button class="act ink" id="scan" '+(c.tokenSet?"":"disabled title=\"先到设置里填 GitHub 令牌\"")+'>立即扫描</button>';
  return '<header><h1>Plugin DSH 采集审批台</h1><span class="sp"></span>'+status+btn+'<button class="act" id="logout" title="退出登录">退出</button></header>';
}
function navBar(){
  var tabs=[["pending","待审批",count("pending")],["approved","已通过",count("approved")],["published","已发布",count("published")],["rejected","拒绝名单",(get("rejected")||[]).length],["settings","设置",0],["log","运行日志",0]];
  return '<nav>'+tabs.map(function(t){
    var h='<button data-tab="'+t[0]+'" class="'+(S.tab===t[0]?"on":"")+'">'+t[1];
    if(t[2])h+='<span class="count">'+t[2]+'</span>';
    return h+'</button>';
  }).join("")+'</nav>';
}
function banner(){
  var jb=get("job")||{},out="";
  if(notice)out+='<div class="note '+esc(notice.kind)+'"'+(notice.kind==="load"?"":' data-dismiss title="点一下关闭" style="cursor:pointer"')+'>'+esc(notice.text)+'</div>';
  if(jb.running)out+='<div class="prog"><span style="width:'+(jb.want?Math.min(100,Math.round(jb.added/jb.want*100)):8)+'%"></span></div>';
  return out;
}
function reload(){S.raw="";return load()}
function cv(name,fallback){return Object.prototype.hasOwnProperty.call(S.cfg,name)?S.cfg[name]:(fallback==null?"":fallback)}
function settings(){
  var c=get("config")||{},m=c.model||{},sch=c.schedule||{};
  return '<h2>设置</h2><p class="sub">令牌只写在本机 .admin/config.json，不会提交到仓库，也不会显示在页面上。点「保存设置」后立即生效。</p>'+
  '<form id="cfg" class="card" autocomplete="off">'+
  '<div class="row"><label>GitHub 令牌</label><input type="password" name="token" autocomplete="new-password" value="'+esc(cv("token"))+'" placeholder="'+(c.tokenSet?"已设置（"+esc(c.tokenMask)+"），留空保持不变":"github_pat_… 或 ghp_…")+'"><p class="hint">目标仓库是私有的，必须填。fine-grained 令牌：Repository access 选该仓库，Contents 给 Read and write；经典令牌勾 repo。</p></div>'+
  '<div class="row"><label>目标仓库</label><input name="repo" value="'+esc(cv("repo",c.repo))+'" placeholder="owner/repo"><p class="hint">推送的落点，例如 jx009/plugins-dsh，也可以直接贴仓库链接。Cloudflare Pages 连上这个仓库后，每次推送都会自动重建。</p></div>'+
  '<div class="row"><label>分支</label><input name="branch" value="'+esc(cv("branch",c.branch))+'"></div>'+
  '<div class="row"><label>搜索语句</label><textarea name="queries" rows="5">'+esc(cv("queries",(c.queries||[]).join("\n")))+'</textarea><p class="hint">每行一条 GitHub 搜索语法，可以用 topic: user: org: repo: 限定范围。例如只扫某个账号：<span class="mono">user:jx009 dsh in:name,description</span>。</p></div>'+
  '<div class="row"><label>每次扫描数量</label><input type="number" name="perScan" min="1" max="50" value="'+esc(cv("perScan",c.perScan))+'"><p class="hint">每次最多收这么多个新候选（1–50）。站点已有、队列里、拒绝过的都会自动跳过，不占名额。</p></div>'+
  '<div class="row"><label>星标下限</label><input type="number" name="minStars" min="0" value="'+esc(cv("minStars",c.minStars))+'"><p class="hint">0 表示不过滤。</p></div>'+
  '<div class="row"><label>定时扫描</label><div class="split"><label style="padding:0;white-space:nowrap"><input type="checkbox" name="schOn" '+(cv("schOn",!!sch.enabled)?"checked":"")+' style="width:auto"> 每天</label><input type="time" name="schTime" value="'+esc(cv("schTime",sch.time||"03:00"))+'" style="width:130px"> 扫描</div><p class="hint">按本机时间。服务要一直开着（npm run admin），到点自动跑；过了点才启动服务会当天补跑一次。扫描只进待审批，不会推送。</p></div>'+
  '<div class="row"><label>改写模型</label><input name="modelUrl" value="'+esc(cv("modelUrl",m.baseUrl))+'" placeholder="https://api.deepseek.com/v1"><p class="hint">OpenAI 兼容接口，地址写到 /v1 为止。</p></div>'+
  '<div class="row"><label>模型名</label><input name="modelName" value="'+esc(cv("modelName",m.model))+'" placeholder="deepseek-chat"></div>'+
  '<div class="row"><label>模型密钥</label><input type="password" name="modelKey" autocomplete="new-password" value="'+esc(cv("modelKey"))+'" placeholder="'+(c.modelKeySet?"已设置（"+esc(c.modelKeyMask)+"），留空保持不变":"sk-…")+'"><p class="hint">不填的话扫描照样进行，但候选只有占位骨架，要你手动补文案。</p></div>'+
  '<div class="bar" style="margin:0"><button class="act ink" type="submit">保存设置</button><button class="act" type="button" id="test">测试连接</button></div></form>';
}
// 未保存的修改记在 S.edits 里：页面重绘（轮询、提示消失）时不会丢
function val(id,path,fallback){var e=S.edits[id];return e&&Object.prototype.hasOwnProperty.call(e,path)?e[path]:(fallback==null?"":fallback)}
function faqText(list){return (list||[]).map(function(f){return "Q: "+f.q+"\nA: "+f.a}).join("\n\n")}
function parseFaq(text){
  return String(text||"").split(/\n\s*\n/).map(function(b){
    var lines=b.trim().split("\n");if(lines.length<2)return null;
    var q=lines[0].replace(/^Q\s*[:：]\s*/i,"").trim(),a=lines.slice(1).join(" ").replace(/^A\s*[:：]\s*/i,"").trim();
    return q&&a?{q:q,a:a}:null;
  }).filter(Boolean);
}
function field(id,label,path,value,kind,ph){
  var v=val(id,path,value);
  return '<div class="row" style="grid-template-columns:1fr"><label>'+label+'</label>'+
    (kind?'<textarea class="'+(kind==="big"?"big":"")+'" data-f="'+path+'" rows="'+(kind==="big"?12:4)+'" placeholder="'+esc(ph||"")+'">'+esc(v)+'</textarea>':'<input data-f="'+path+'" value="'+esc(v)+'" placeholder="'+esc(ph||"")+'">')+'</div>';
}
function langFields(id,lang,doc,zh){
  doc=doc||{};
  return field(id,zh?"标题":"title",lang+".title",doc.title)+
    field(id,"description（搜索结果摘要）",lang+".description",doc.description,"small")+
    field(id,"summary（列表里的简介）",lang+".summary",doc.summary,"small")+
    field(id,"亮点，每行一条",lang+".highlights",(doc.highlights||[]).join("\n"),"small")+
    field(id,"常见问题，Q: / A: 各一行，问题之间空一行",lang+".faq",faqText(doc.faq),"small","Q: …\nA: …")+
    field(id,"正文（Markdown）",lang+".body",doc.body,"big");
}
function item(q){
  var d=q.draft||{},g=d.github||{},id=q.id;
  var cat=val(id,"category",d.category);
  var known=false;
  var cats=(get("categories")||[]).map(function(c){if(cat===c.slug)known=true;return '<option value="'+esc(c.slug)+'" '+(cat===c.slug?"selected":"")+'>'+esc(c.name)+" / "+esc(c.nameEn)+'</option>'}).join("");
  if(!known)cats='<option value="" selected>请选择分类</option>'+cats;
  var open=!!S.open[id],pub=q.status==="published";
  var todo=!pub&&d.en&&(!d.en.title||/TODO/.test(d.en.body||""));
  var body='<div class="bd">'+
  (q.error?'<div class="note bad">'+esc(q.error)+'</div>':"")+
  '<p class="sub" style="margin-bottom:12px">仓库原始描述：'+esc(g.description||"（无）")+(d.package?"　npm 包："+esc(d.package):"")+(g.version?"　版本："+esc(g.version):"")+'</p>'+
  '<div class="grid2">'+
  '<div class="row" style="grid-template-columns:1fr"><label>显示名</label><input data-f="name" value="'+esc(val(id,"name",d.name))+'"></div>'+
  '<div class="row" style="grid-template-columns:1fr"><label>分类</label><select data-f="category">'+cats+'</select></div>'+
  '</div>'+
  field(id,"安装命令（留空则按 npm 包名自动生成）","install",d.install||"",null,get("installCommand")||"")+
  '<h3>English</h3>'+langFields(id,"en",d.en,false)+
  '<h3>中文</h3>'+langFields(id,"zh",d.zh,true)+
  '<div class="bar" style="margin:16px 0 0"><a class="act" href="https://github.com/'+esc(q.owner+"/"+q.repo)+'" target="_blank" rel="noopener">打开仓库</a>'+
  (pub?'<span class="mono" style="color:var(--dim)">'+(q.commit?"提交 "+esc(String(q.commit).slice(0,7)):"已发布")+'</span>':
    '<button class="act" data-save="'+esc(id)+'">保存修改</button>'+
    '<button class="act" data-regen="'+esc(id)+'">重新改写</button>'+
    (q.status==="pending"?'<button class="act ok" data-approve="'+esc(id)+'">保存并通过</button>':'<button class="act" data-back="'+esc(id)+'">退回待审</button>')+
    '<button class="act bad" data-reject="'+esc(id)+'">拒绝</button>')+
  '</div></div>';
  // 已发布的只读：内容已经在仓库里，要改去仓库改
  if(pub)body=body.replace(/ data-f="/g,' disabled data-f="');
  return '<div class="item '+(open?"open":"")+'" data-id="'+esc(id)+'">'+
  '<div class="hd" data-toggle="'+esc(id)+'"><span class="name">'+esc(d.name||q.repo)+'</span><span class="who mono">'+esc(q.owner+"/"+q.repo)+'</span>'+
  '<span class="meta">'+(S.edits[id]?'<span class="tag warn">有未保存的修改</span>':"")+(todo?'<span class="tag warn">待补文案</span>':"")+'<span class="tag '+esc(q.status)+'">'+esc({pending:"待审",approved:"已通过",published:"已发布"}[q.status]||q.status)+'</span><span>★ '+esc(g.stars||0)+'</span><span>'+esc(g.pushedAt||"")+'</span></span></div>'+
  (open?body:"")+'</div>';
}
function queueView(st){
  var list=(get("queue")||[]).filter(function(q){return q.status===st});
  var head={pending:["待审批","扫描回来的候选都停在这里，不会自动上线。点开一条检查文案，改好后通过；不要的拒绝。"],approved:["已通过","这些已经过了你的审批，还没上线。点推送后一次提交到目标仓库。"],published:["已发布","已经推送到目标仓库的插件。内容以仓库里的为准，这里只留记录。"]}[st];
  var bar="";
  if(st==="pending")bar='<div class="bar"><button class="act" id="addBtn">'+(S.adding?"收起":"手动添加仓库")+'</button><span class="sp"></span>'+(list.length?'<button class="act ok" id="approveAll">全部通过（'+list.length+'）</button>':"")+'</div>'+
    (S.adding?'<div class="card"><div class="split"><input class="grow" id="addInput" value="'+esc(S.addText)+'" placeholder="owner/repo 或 https://github.com/owner/repo"><button class="act ink" id="addGo">添加</button></div><p class="sub" style="font-size:12.5px;margin:6px 0 0">添加后同样会去重、拉取、改写，然后进待审批。</p></div>':"");
  if(st==="approved"&&list.length)bar='<div class="bar"><button class="act ink" id="publishAll" '+(S.busy?"disabled":"")+'>推送 '+list.length+' 个到仓库</button><span class="sp"></span><span style="color:var(--dim);font-size:13px">先逐条校验，再合成一次提交</span></div>';
  var empty={pending:"没有待审批的候选。点右上角「立即扫描」去 GitHub 找新的，或者手动添加一个仓库。",approved:"没有等待推送的候选。在待审批里点「保存并通过」，就会出现在这里。",published:"还没有推送过插件。"}[st];
  return '<h2>'+head[0]+'</h2><p class="sub">'+head[1]+'</p>'+bar+(list.length?list.map(item).join(""):'<div class="empty">'+empty+'</div>');
}
function rejectedView(){
  var list=get("rejected")||[];
  var top='<h2>拒绝名单</h2><p class="sub">这里列出的仓库以后扫描会自动跳过。「自动」是改写时判断与 DSH 无关，或者仓库没有可读的说明。</p>';
  if(!list.length)return top+'<div class="empty">拒绝名单是空的。</div>';
  return top+'<div class="card">'+
  list.map(function(r,i){return '<div class="split" style="padding:8px 0;border-bottom:1px solid var(--rule)"><span class="mono" style="min-width:220px">'+esc(r.owner+"/"+r.repo)+'</span><span class="tag">'+(r.auto?"自动":"人工")+'</span><span class="grow" style="color:var(--dim);font-size:13px">'+esc(r.reason||"")+'</span><button class="act" data-restore="'+i+'">恢复</button></div>'}).join("")+'</div>';
}
function logView(){
  var s=get("lastScan"),jb=get("job")||{};
  return '<h2>运行日志</h2><p class="sub">扫描、推送和接口错误都记在这里，最近 120 行。</p>'+
  (jb.running?'<div class="note">正在跑：'+esc(jb.step||"扫描中")+(jb.want?"（已入队 "+jb.added+" / 目标 "+jb.want+"）":"")+'</div>':"")+
  '<div class="log">'+esc(get("log")||"（空）")+'</div>'+
  (s?'<h3 style="margin-top:18px">上一次扫描</h3><div class="log">'+esc(JSON.stringify(s,null,2))+'</div>':"")+
  '<div class="bar" style="margin-top:12px"><button class="act" id="refreshLog">刷新</button></div>';
}
// 重绘时把焦点和光标放回原处，输入到一半不会被打断
function focusKey(el){
  if(!el||!el.getAttribute||!$("root").contains(el))return null;
  var f=el.getAttribute("data-f"),sel="";
  if(f){var box=el.closest("[data-id]");if(box)sel='[data-id="'+box.getAttribute("data-id")+'"] [data-f="'+f+'"]'}
  else if(el.form&&el.form.id==="cfg"&&el.name)sel='#cfg [name="'+el.name+'"]';
  else if(el.id)sel="#"+el.id;
  if(!sel)return null;
  var k={sel:sel,top:el.scrollTop};
  try{k.s=el.selectionStart;k.e=el.selectionEnd}catch(_){}
  return k;
}
function restoreFocus(k){
  if(!k)return;
  var el=document.querySelector(k.sel);
  if(!el)return;
  try{el.focus({preventScroll:true})}catch(_){el.focus()}
  if(k.top)el.scrollTop=k.top;
  try{if(k.s!=null)el.setSelectionRange(k.s,k.e)}catch(_){}
}
function render(){
  if(!S.state)return;
  // 输入法正在组字时不重绘，否则中文输入会被打断；组字结束后补一次
  if(S.composing){S.dirty=true;return}
  S.dirty=false;
  var focused=focusKey(document.activeElement);
  var html='';
  if(S.tab==="settings")html=settings();
  else if(S.tab==="rejected")html=rejectedView();
  else if(S.tab==="log")html=logView();
  else html=queueView(S.tab);
  var y=window.scrollY;
  $("root").innerHTML=header()+'<main>'+navBar()+'<section>'+banner()+html+'</section></main>';
  window.scrollTo(0,y);
  restoreFocus(focused);
}
function readCfg(f){
  return {
    token:f.token.value.trim(),repo:f.repo.value.trim(),branch:f.branch.value.trim()||"main",
    queries:f.queries.value.split("\n").map(function(s){return s.trim()}).filter(Boolean),
    perScan:Number(f.perScan.value)||10,minStars:Number(f.minStars.value)||0,
    schedule:{enabled:f.schOn.checked,time:f.schTime.value||"03:00"},
    model:{baseUrl:f.modelUrl.value.trim(),model:f.modelName.value.trim(),apiKey:f.modelKey.value},
  };
}
function scanErr(e){
  if(/已经有扫描在跑/.test(e.message)){poll();notify("load","已有扫描在跑，等它结束。",true);return}
  notify("bad",e.message);
}
function unsaved(){
  var n=Object.keys(S.edits).length;
  if(n)notify("bad","有 "+n+" 条候选的修改还没保存。先逐条点「保存修改」，再批量操作。");
  return n>0;
}
function addRepo(){
  var v=S.addText.trim();
  if(!v||S.busy)return;
  S.busy=true;notify("load","正在拉取 "+v+" 并改写，大约十几秒…",true);
  api("POST","/api/add",{target:v}).then(function(){S.busy=false;S.addText="";S.adding=false;S.tab="pending";notify("ok","已加入待审批");reload()}).catch(function(err){S.busy=false;notify("bad",err.message)});
}
// 保存一条候选的修改；status 传 "approved" / "pending" 时同时改状态。一次请求完成，服务端先存修改再校验
function saveItem(id,status){
  if(S.busy)return;
  var patch=patchFrom(id),body={};
  if(Object.keys(patch).length)body.patch=patch;
  if(status)body.status=status;
  if(!body.patch&&!status)return notify("ok","没有改动要保存");
  S.busy=true;
  api("POST","/api/item/"+encodeURIComponent(id),body).then(function(){
    S.busy=false;delete S.edits[id];
    if(status)S.open[id]=false;
    notify("ok",status==="approved"?"已通过，去「已通过」里推送":status==="pending"?"已退回待审批":"已保存");
    reload();
  }).catch(function(e){
    S.busy=false;
    // 校验没过时服务端照样存了修改，本地的未保存标记可以清掉
    if(/^修改已保存/.test(e.message)){delete S.edits[id];reload()}
    notify("bad",e.message);
  });
}
function patchFrom(id){
  var ed=S.edits[id]||{},p={},keys=Object.keys(ed);
  for(var i=0;i<keys.length;i++){
    var k=keys[i],v=ed[k],dot=k.indexOf(".");
    if(dot<0){p[k]=v;continue}
    var lang=k.slice(0,dot),f=k.slice(dot+1);
    if(f==="faq")v=parseFaq(v);
    else if(f==="highlights")v=String(v||"").split("\n").map(function(s){return s.trim()}).filter(Boolean);
    p[lang]=p[lang]||{};
    p[lang][f]=v;
  }
  return p;
}
// 有未保存的修改时在标题行挂一个提示，不整体重绘
function markDirty(id){
  var it=document.querySelector('.item[data-id="'+CSS.escape(id)+'"]'),m=it&&it.querySelector(".hd .meta");
  if(!m||m.querySelector(".dirtytag"))return;
  var s=document.createElement("span");
  s.className="tag warn dirtytag";
  s.textContent="有未保存的修改";
  m.insertBefore(s,m.firstChild);
}
document.addEventListener("click",function(e){
  if(e.target.closest("[data-dismiss]")){notice=null;render();return}
  var el=e.target.closest("[data-tab],[data-toggle],button,a");
  if(!el)return;
  var tab=el.getAttribute&&el.getAttribute("data-tab");
  if(tab){S.tab=tab;render();return}
  var tg=el.getAttribute&&el.getAttribute("data-toggle");
  if(tg){S.open[tg]=!S.open[tg];render();return}
  if(!el.tagName||el.tagName.toLowerCase()!=="button")return;
  var id=el.getAttribute("data-save")||el.getAttribute("data-approve")||el.getAttribute("data-back");
  if(id){saveItem(id,el.hasAttribute("data-approve")?"approved":el.hasAttribute("data-back")?"pending":null);return}
  if(el.hasAttribute("data-regen")){
    var rid=el.getAttribute("data-regen");
    if(S.busy||!confirm("重新拉取仓库数据并改写？这一条现有的文案（包括你改过的）会被覆盖。"))return;
    S.busy=true;notify("load","重新改写中，大约十几秒…",true);
    api("POST","/api/regenerate",{id:rid}).then(function(){S.busy=false;delete S.edits[rid];notify("ok","已重新改写，回到待审批");reload()}).catch(function(err){S.busy=false;notify("bad",err.message)});
    return;
  }
  if(el.hasAttribute("data-reject")){
    var jid=el.getAttribute("data-reject");
    if(!confirm("拒绝这个仓库？以后扫描不会再出现，可以在拒绝名单里恢复。"))return;
    api("POST","/api/reject/"+encodeURIComponent(jid),{}).then(function(){delete S.edits[jid];notify("ok","已拒绝，记入拒绝名单");reload()}).catch(function(err){notify("bad",err.message)});
    return;
  }
  if(el.hasAttribute("data-restore")){
    var r=(get("rejected")||[])[Number(el.getAttribute("data-restore"))];
    if(!r)return;
    api("POST","/api/rejected/restore",{owner:r.owner,repo:r.repo}).then(function(){notify("ok","已恢复，下次扫描可以重新发现");reload()}).catch(function(err){notify("bad",err.message)});
    return;
  }
  if(el.id==="logout"){
    if(unsaved()&&!confirm("还有没保存的修改，退出后会丢失。确定退出？"))return;
    S.raw="";Object.keys(S.edits).forEach(function(k){delete S.edits[k]});S.cfg={};
    api("POST","/api/logout",{}).then(function(){location.reload()}).catch(function(err){notify("bad",err.message)});
    return;
  }
  if(el.id==="scan"){
    notify("load","扫描中：搜索 GitHub、逐个拉取改写，可能要几分钟。可以先去做别的，结果会进待审批。",true);
    api("POST","/api/scan",{}).then(function(){return reload()}).then(function(){if(!get("job.running"))scanDone()}).catch(scanErr);
    return;
  }
  if(el.id==="stop"){
    api("POST","/api/scan/stop",{}).then(function(){notify("load","正在停止，等当前这个仓库处理完。",true);poll()}).catch(function(err){notify("bad",err.message)});
    return;
  }
  if(el.id==="test"){
    if(Object.keys(S.cfg).length){notify("bad","设置有未保存的修改。先点「保存设置」，再测试连接。");return}
    notify("load","测试中…",true);
    api("POST","/api/test",{}).then(function(r){notify("ok",r.lines.join("\n"),true)}).catch(function(err){notify("bad",err.message)});
    return;
  }
  if(el.id==="refreshLog"){reload();return}
  if(el.id==="addBtn"){S.adding=!S.adding;render();var i=$("addInput");if(i)i.focus();return}
  if(el.id==="addGo"){addRepo();return}
  if(el.id==="approveAll"){
    if(unsaved()||!confirm("把 "+count("pending")+" 个待审批全部标为通过？只要有一条没写完，就整批不通过。"))return;
    api("POST","/api/approve-all",{}).then(function(r){notify("ok","已通过 "+r.count+" 个，去「已通过」里推送");reload()}).catch(function(err){notify("bad",err.message)});
    return;
  }
  if(el.id==="publishAll"){
    if(S.busy||unsaved()||!confirm("把已通过的 "+count("approved")+" 个推送到 "+(get("config.repo")||"目标仓库")+"？推送后网站会自动重建。"))return;
    S.busy=true;notify("load","校验并推送中…",true);
    api("POST","/api/publish",{}).then(function(r){
      S.busy=false;
      notify("ok","已推送 "+(r.written||[]).length+" 个插件"+(r.commit?"，提交 "+String(r.commit).slice(0,7):"")+(r.skipped&&r.skipped.length?"，另有 "+r.skipped.length+" 个仓库里已经有了，没有重复推":"")+"。本地仓库记得 git pull。",true);
      reload();
    }).catch(function(err){S.busy=false;notify("bad",err.message);reload()});
  }
});
document.addEventListener("submit",function(e){
  if(e.target.id!=="cfg")return;
  e.preventDefault();
  api("POST","/api/config",{config:readCfg(e.target)}).then(function(){S.cfg={};notify("ok","设置已保存");reload()}).catch(function(err){notify("bad",err.message)});
});
// 输入即记到 S.edits / S.cfg，重绘和轮询都不会丢
document.addEventListener("input",function(e){
  var el=e.target,f=el.getAttribute&&el.getAttribute("data-f");
  if(f){
    var box=el.closest("[data-id]");
    if(!box)return;
    var id=box.getAttribute("data-id");
    (S.edits[id]=S.edits[id]||{})[f]=el.value;
    markDirty(id);
    return;
  }
  if(el.form&&el.form.id==="cfg"&&el.name){S.cfg[el.name]=el.type==="checkbox"?el.checked:el.value;return}
  if(el.id==="addInput")S.addText=el.value;
});
document.addEventListener("keydown",function(e){if(e.key==="Enter"&&e.target.id==="addInput"&&!e.isComposing){e.preventDefault();addRepo()}});
document.addEventListener("compositionstart",function(){S.composing=true});
document.addEventListener("compositionend",function(){S.composing=false;if(S.dirty)render()});
window.addEventListener("beforeunload",function(e){if(Object.keys(S.edits).length||Object.keys(S.cfg).length){e.preventDefault();e.returnValue=""}});
load();`;

function page(nonce) {
  return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<meta name="referrer" content="no-referrer">
<title>Plugin DSH 采集审批台</title>
<style>${CSS}</style>
</head>
<body>
<div id="root"><p class="empty" style="margin:40px">加载中…</p></div>
<script>window.__NONCE__=${JSON.stringify(nonce || "")};</script>
<script>${JS}</script>
</body>
</html>`;
}

/** 口令页：只有一个输入框，输对就进 */
function loginPage() {
  return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<meta name="referrer" content="no-referrer">
<title>Plugin DSH 采集审批台</title>
<style>${CSS}
.login{max-width:360px;margin:16vh auto 0;padding:0 20px}
.login h1{font-size:20px;margin:0 0 6px}
.login p{color:var(--dim);margin:0 0 20px;font-size:14px}
.login input{width:100%;padding:11px 12px;border:1px solid var(--rule);border-radius:var(--r);background:var(--face);font:inherit}
.login input:focus{outline:2px solid var(--ink);outline-offset:1px}
.login .act{width:100%;margin-top:12px;padding:11px;justify-content:center}
.login .err{color:var(--bad);min-height:1.5em;margin:10px 0 0;font-size:14px}
</style>
</head>
<body>
<form class="login" id="login" autocomplete="off">
<h1>Plugin DSH 采集审批台</h1>
<p>输入口令进入。登录后这台浏览器 7 天内不用再输。</p>
<input type="password" id="pw" aria-label="口令" placeholder="口令" autofocus required>
<button class="act ink" type="submit" id="go">进入</button>
<p class="err" id="err" role="alert"></p>
</form>
<script>
document.getElementById("login").addEventListener("submit",function(e){
  e.preventDefault();
  var go=document.getElementById("go"),err=document.getElementById("err"),pw=document.getElementById("pw");
  go.disabled=true;go.textContent="验证中…";err.textContent="";
  fetch("/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:pw.value})})
    .then(function(r){return r.json().catch(function(){return {}}).then(function(j){
      if(r.ok){location.reload();return}
      err.textContent=j.error||("登录失败（HTTP "+r.status+"）");pw.select();
    })})
    .catch(function(){err.textContent="连不上服务，检查网络后重试"})
    .then(function(){go.disabled=false;go.textContent="进入"});
});
</script>
</body>
</html>`;
}

module.exports = { page, loginPage };
