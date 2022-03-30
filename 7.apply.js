/**
 * 实现函数的apply方法，不能使用箭头函数，在箭头函数里this为undefined
 * @param {*} ctx 执行上下文
 * @param  {...any} args 实参
 * return fn的执行结果
 */
Function.prototype.myApply = function (ctx, ...args) {
  if (!ctx) {
    ctx = window === undefined ? window : global;
  }

  ctx = Object(ctx);

  const fnName = Symbol('key');

  ctx[fnName] = this;
  const result = ctx[fnName](args);

  delete ctx[fnName];
  return result;
};

function fn(name) {
  console.log(this, name);
}

fn.myApply({ name: 'Enmeng' }, ['name']);
