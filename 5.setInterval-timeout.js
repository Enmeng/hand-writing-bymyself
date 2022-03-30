/**
 * 使用setInterval实现setTimeout
 * @param {*} func 执行函数
 * @param {*} timeout 延时
 */
const simulateSetTimeout = (func, timeout) => {
  let timer = null;
  timer = setInterval(() => {
    clearInterval(timer);
    func();
  }, timeout);

  return () => clearInterval(timer);
};

const cancel = simulateSetTimeout(() => {
  console.log('1');
}, 2000);

cancel();
