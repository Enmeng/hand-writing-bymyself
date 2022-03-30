//https://juejin.cn/post/6899273470623318023

//使用Symbol 定义三种状态，防止外部改变状态

const PENDING = Symbol('Pending'), //进行中
      FULFILLED = Symbol('Fulfilled'),//完成
      REJECTED = Symbol('Rejected'); //已失败


/**
 * 
 * @param {Promise} promise 执行then之后返回的promise 
 * @param {*} x then方法中第一个参数执行后的值
 * @param {Function} resolve 
 * @param {Function} reject 
 */
const handleValue = (promise, x, resolve, reject) => {
    //循环引用，自己等待自己完成，会出错，用reject传递出错误原因
    if(promise === x) {
        return reject(new TypeError('检测到Promise的链式循环引用'));
    }

    //确保递归解析中只传递出去一次值then().then()
    let once = false;
    if((x !== null && typeof x === 'object') || typeof x === 'function') {
        //当x === null时，typeof x === 'object
        try {
            //防止重复去读取x.then
            let then = x.then;
            //判断x是不是Promise或者是包含then方法的对象
            if(typeof then === 'function') {
                //调用then实例方法处理Promise执行结果
                then.call(x, y => {
                    if(once) return;
                    once = true;
                    //防止Promise中Promise执行成功后又传递一个Promise过来，要做递归解析
                    handleValue(promise, y, resolve, reject);
                }, r => {
                    if(once) return;
                    once = true;
                    reject(r);
                })
            } else {
                //如果x是个普通对象，then只是普通对象中的一个普通属性
                resolve(x);
            }
        } catch (err) {
            if(once) return;
            once = true;
            reject(err);
        }
    } else {
        //如果x是个原始值，直接调用resolve(x)
        resolve(x);
    }
}

class Promise {
    constructor(executor) {
        this.status = PENDING; //存储Promise的状态
        this.value = undefined; //存储executor函数中业务代码执行成功的结果
        this.reason = undefined; //存储executor函数中业务代码执行失败的原因
        this.onFulfilled = []; //executorr函数中业务代码执行成功回调函数的集合，可能执行到了then，但status还是Pending的情况
        this.onRejected = []; //executor函数中业务代码执行失败回调函数的几个

        const resolve = value => {
            //只有当状态为Pending才会改变，来保证一旦状态改变就不会改变
            if(this.status === PENDING) {
                this.status = FULFILLED;
                this.value = value;

                //依次调用then中成功的回调函数
                this.onFulfilled.forEach(fn => fn());
            }
        };

        const reject = value => {
            //只有当状态为Pending才会改变，来保证一旦状态改变就不会再变
            if(this.status === PENDING) {
                this.status = REJECTED;
                this.reason = value;

                //依次调用then中失败的回调函数
                this.onRejected.forEach(fn => fn());
            }
        };

        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
        onRejected = typeof onRejected === 'function' ? onRejected : err => {
            throw err;
        };

        let promise = new Promise((resolve, reject) => {
            if(this.status === FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        handleValue(promise, x, resolve, reject);
                    } catch (err) {
                        reject(err);
                    }
                }, 0);
            }

            if(this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        handleValue(promise, x, resolve, reject);
                    } catch (err) {
                        reject(err);
                    }
                }, 0);
            }
            
            if(this.status === PENDING) {
                this.onFulfilled.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            handleValue(promise, x, resolve, reject);
                        } catch (err) {
                            reject(err);
                        }
                    }, 0);
                })

                this.onRejected.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            handleValue(promise, x, resolve, reject);
                        } catch (err) {
                            reject(err);
                        }
                    }, 0);
                })
            }
        })
        return promise;
    }

    static resolve(param) {
        if(param instanceof Promise) {
            return param;
        }

        return new Promise((resolve, reject) => {
            if(param && Object.prototype.toString.call(param) === '[object Object]' && typeof param.then === 'function') {
                setTimeout(() => {
                    param.then(resolve, reject);
                }, 0);
            } else {
                resolve(param);
            }
        })
    }

    static reject(param) {
        return new Promise((resolve, reject) => {
            reject(param);
        })
    }

    static all(promises) {
        //将参数promises转为一个真正的数组
        promises = Array.from(promises);
        return new Promise((resolve, reject) => {
            const length = promises.length;
            let value = [];
            if(length) {
                value = Array.apply(null, {
                    length: length
                });
                for(let i = 0; i < length; i ++) {
                    Promise.resolve(promises[i]).then(
                        res => {
                            value[i] = res;
                            if(i === length) {
                                resolve(value);
                            }
                        },
                        err => {
                            reject(eerr);
                            return;
                        }
                    )
                }
            } else {
                resolve(value);
            }
        })
    }

    static race(promises) {
        //将参数promises转为一个真正的数组
        promises = Array.from(promises);
        return new Promise((resolve, reject) => {
            const length = promises.length;
            if(length) {
                for(let i = 0; i < length; i ++) {
                    Promise.resolve(promises[i]).then(
                        res => {
                            resolve(res);
                            return;
                        },
                        err => {
                            reject(err);
                            return;
                        }
                    )
                } 
            } else {
                return;
            }
        })
    }

}