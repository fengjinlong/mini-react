let teskId = 1;

function workLoop(deadline) {
  teskId++;
  let shouldYield = false;
  while (!shouldYield) {
    // 执行任务
    shouldYield = deadline.timeRemaining() < 1;
  }
}
requestIdleCallback(workLoop);
