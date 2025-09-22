import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './utils/resizeObserver';

// 全局错误处理 - 修复 ResizeObserver 错误
const originalConsoleError = console.error;
console.error = (...args) => {
  if (args[0]?.toString().includes('ResizeObserver loop completed with undelivered notifications')) {
    return;
  }
  originalConsoleError.apply(console, args);
};

window.addEventListener('error', (e) => {
  if (e.message?.includes('ResizeObserver loop completed with undelivered notifications')) {
    e.preventDefault();
    e.stopImmediatePropagation();
    return false;
  }
});

window.addEventListener('unhandledrejection', (e) => {
  if (e.reason?.message?.includes('ResizeObserver loop completed with undelivered notifications')) {
    e.preventDefault();
    return false;
  }
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
