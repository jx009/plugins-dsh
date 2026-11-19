// 后台任务：改写、添加这类要等模型或 GitHub 的操作用它跑。
// 接口立刻返回，任务在服务器上继续跑；页面通过 /api/state 里的 jobs 看进度，不再让一个长请求挂在那里被代理掐断。
// 不排队、不限并发：每条各跑各的，快慢互不影响。任务状态只在内存里，服务重启后正在跑的会丢，重新点一次即可。

const jobs = new Map(); // id → { id, kind, label, step, startedAt, error }

const list = () => [...jobs.values()].map((j) => ({ ...j }));
const has = (id) => jobs.has(id);

/**
 * 启动一个后台任务；同一个 id 已经在跑时返回 false。
 * fn 里抛的错会记录在任务上，并在结束时通过 onError 交给调用方（比如写到对应的候选上）。
 */
function start({ id, kind, label }, fn, onError) {
  if (jobs.has(id)) return false;
  const job = { id, kind, label, step: "准备中", startedAt: new Date().toISOString(), error: "" };
  jobs.set(id, job);
  const setStep = (step) => {
    const cur = jobs.get(id);
    if (cur) cur.step = step;
  };
  Promise.resolve()
    .then(() => fn(setStep))
    .catch((e) => {
      const cur = jobs.get(id);
      if (cur) cur.error = e.message;
      if (onError) {
        try {
          onError(e);
        } catch {
          // 记录错误时再出错也不能影响其它任务
        }
      }
    })
    .finally(() => jobs.delete(id));
  return true;
}

module.exports = { start, list, has };
