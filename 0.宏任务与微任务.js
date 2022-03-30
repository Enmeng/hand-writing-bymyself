/**
 * 宏任务与微任务（事件循环）
 * 1.setTimeout、setInterval、script为宏任务，遇到宏任务就放到事件队列里，每次执行完当前微任务队列的所有微任务
 * 就去事件队列拿一个宏任务出来执行
 * 2.Promise.then, nextTick为微任务，遇到微任务就开辟一个任务队列，放所有的微任务，如果为两个连续then（在同一批处理微任务时一起处理），
 * 但只有执行完第一个then时下一个then才入队列，每次执行都是按照先进先出的原则执行
 */

console.log(1);

setTimeout(() => {
  console.log(2);
  setTimeout(() => {
    console.log(14);
    new Promise((resolve, reject) => {
      console.log(15);
      resolve();
    }).then(res => {
      console.log(16);
    });
  });
  new Promise((resolve, reject) => {
    console.log(3);
    resolve();
  }).then(res => {
    console.log(4);
  });
});

new Promise((resolve, reject) => {
  resolve();
})
  .then(res => {
    console.log(5);
  })
  .then(res => {
    console.log(6);
  });

new Promise((resolve, reject) => {
  console.log(7);
  resolve();
})
  .then(res => {
    console.log(8);
  })
  .then(res => {
    console.log(9);
  });

setTimeout(() => {
  console.log(10);
  new Promise((resolve, reject) => {
    console.log(11);
    resolve();
  }).then(res => {
    console.log(12);
  });
});

console.log(13);
