const async = require('async');

// interesting that-this trick
class demoClass {
  constructor(con) {
    this.constantVariable = con;
    const that = this;
    this.q = async.queue((input, cb) => {
      that.processFunc(input, cb);
    }, 1);
  }

  feedfunc(inputArray) {
    for (const input of inputArray) {
      this.q.push(input);
    }
  }

  processFunc(input, cb) {
    console.log(input);
    console.log(this.constantVariable);
    cb();
  } 
}

const demo = new demoClass('inputtext');
demo.feedfunc([
  'a',
  'b',
  'c'
]);