/**
 * 实现函数的call方法，不能使用箭头函数，因为箭头函数里的this为undefined
 * @param {*} ctx 上下文对象
 * @param  {...any} args 参数
 * return fn执行后的结果
 */
Function.prototype.myCall = function (ctx, ...args) {
  if (!ctx) {
    //最顶级的上下文为global，在浏览器中为window
    ctx = window === undefined ? window : global;
  }

  ctx = Object(ctx); // 避免传入的ctx为非对象，即基本数据类型

  const fnName = Symbol('key');

  ctx[fnName] = this; //this指向调用myCall的函数

  const result = ctx[fnName](...args);

  delete ctx[fnName];

  return result;
};

function fn(name) {
  console.log(this, this.name);
  console.log(name);
}

fn.myCall({ name: 'Enmeng' }, 'name');
