// 修复 ResizeObserver loop completed with undelivered notifications 错误
// 这是一个已知的浏览器问题，通常不会影响功能

// 使用 requestAnimationFrame 来延迟 ResizeObserver 回调
export const debounceResizeObserver = (callback: () => void) => {
  let timeoutId: number;
  return () => {
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(callback, 0);
  };
};

// 创建一个安全的 ResizeObserver 包装器
export const createSafeResizeObserver = (callback: ResizeObserverCallback) => {
  const debouncedCallback = debounceResizeObserver(() => {
    try {
      callback([], new ResizeObserver(() => {}));
    } catch (error) {
      // 静默处理 ResizeObserver 错误
      if (error instanceof Error && !error.message.includes('ResizeObserver loop completed')) {
        console.error(error);
      }
    }
  });

  return new ResizeObserver(debouncedCallback);
};

// 清理函数
export const cleanupResizeObserver = () => {
  // 清理逻辑（如果需要）
};
