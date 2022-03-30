/**
 * 数组去重--Set
 * @param {*} arr
 */
const uniqueArray1 = arr => {
  return [...new Set(arr)];
};

/**
 * 数组去重-indexOf
 * @param {*} arr
 */
const uniqueArray2 = arr => {
  let result = [];
  arr.forEach(item => {
    if (result.indexOf(item) <= -1) {
      result.push(item);
    }
  });
  return result;
};

/**
 * 数组去重-reduce, indexOf
 * @param {*} arr
 */
const uniqueArray3 = arr => {
  return arr.reduce((result, item) => {
    if (result.indexOf(item) <= -1) {
      result.push(item);
    }
    return result;
  }, []);
};

/**
 * 数组去重-Array.from, Set
 * @param {*} arr
 */
const uniqueArray4 = arr => {
  return Array.from(new Set(arr));
};

console.log(uniqueArray1([1, 2, 2, 3]));
console.log(uniqueArray2([1, 2, 2, 3]));
console.log(uniqueArray3([1, 2, 2, 3]));
console.log(uniqueArray4([1, 2, 2, 3]));
