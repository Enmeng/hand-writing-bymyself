/**
 * 使用setTimeout实现setInterval
 * @param {*} func
 * @param {*} timeout
 */
const simulateSetInterval = (func, timeout) => {
  let timer = null;
  const interval = () => {
    timer = setTimeout(() => {
      func();
      interval();
    }, timeout);
  };

  interval();

  return () => clearTimeout(timer);
};

const cancel = simulateSetInterval(() => {
  console.log('a');
}, 2000);

setTimeout(() => {
  cancel();
}, 6000);
