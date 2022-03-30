/**
 * 扁平化
 * @param {*} arr 深层数组
 */
const flat1 = arr => {
  return arr.reduce((result, item) => {
    return result.concat(Array.isArray(item) ? flat1(item) : [item]);
  }, []);
};

console.log(flat1([1, [2, 3]]));

/**
 *
 * @param {*} arr 深层嵌套数组
 */
const flat2 = arr => {
  let stack = [...arr];
  let result = [];

  while (stack.length !== 0) {
    let val = stack.pop();
    if (Array.isArray(val)) {
      stack.push(...val);
    } else {
      result.unshift(val);
    }
  }
  return result;
};

console.log(flat2([1, 2, [3, [4, 5]]]));
