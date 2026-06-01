/**
 * 等待 DOM 树稳定（即连续一段时间内没有新的节点添加）
 * @param {HTMLElement} dom - 要监听的 DOM 元素
 * * @param {number} idleTime - 稳定等待时间（毫秒），推荐 500-1000
 * @param {number} timeout - 最大等待时间（毫秒），防止无限等待
 * @returns {Promise<void>}
 */
export const waitDomStable = (
  dom: HTMLElement,
  idleTime: number = 500,
  timeout: number = 10000
): Promise<void> => {
  return new Promise((resolve, reject) => {
    let timer!: NodeJS.Timeout;
    let observer: MutationObserver | null = null;

    // 设置一个总超时，避免因为页面持续高频更新而永远等待
    const timeoutId = setTimeout(() => {
      if (observer) observer.disconnect();
      if (timer) clearTimeout(timer);
      // 超时后也 resolve，避免插件卡死
      reject();
    }, timeout);

    // 当 DOM 变化时，重置计时器
    const resetTimer = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        // 稳定期到达，结束监听
        if (observer) observer.disconnect();
        if (timeoutId) clearTimeout(timeoutId);
        resolve();
      }, idleTime);
    };
    // 初始启动计时器
    resetTimer();
    // 监听整个文档的变动
    observer = new MutationObserver(() => {
      resetTimer(); // 一有变化，就重置计时器
    });
    observer.observe(dom, {
      // 监听子节点的添加或删除
      childList: true,
      // 监听所有后代节点
      subtree: true,
      // 监听文本节点的变化（可选）
      characterData: true,
      // 属性变化通常不影响结构，设为 false 提升性能
      attributes: false
    });
  });
};
