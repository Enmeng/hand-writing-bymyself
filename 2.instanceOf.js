/**
 *
 * @param {*} obj 实例对象
 * @param {*} func 构造函数
 * return true, false
 */
const instanceOf1 = (obj, func) => {
  //基本类型就返回false
  if (!(obj && ['object', 'function'].includes(typeof obj))) return false;

  let proto = Object.getPrototypeOf(obj);
  if (proto === func.prototype) {
    return true;
  } else if (proto === null) {
    return false;
  } else {
    return instanceOf1(proto, func);
  }
};

/**
 *
 * @param {*} obj 实例对象
 * @param {*} func 构造函数
 * return true, false
 */
const instanceOf2 = (obj, func) => {
  //基本类型没有原型对象
  if (!(obj && ['object', 'function'].includes(typeof obj))) return false;

  let proto = obj;

  while ((proto = Object.getPrototypeOf(proto))) {
    if (proto === func.prototype) {
      return true;
    } else if (proto === null) {
      return false;
    }
  }
  return false;
};

let Fn = function () {};
let p1 = new Fn();

console.log(instanceOf1(11, Object));
console.log(instanceOf1(p1, Fn));
