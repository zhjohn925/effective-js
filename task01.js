var task = {
  title: 'my title', description: 'my description'
};

Object.defineProperty(task, 'toString', {
  value: function() {
    return this.title + ' ' + this.description;
  },
  writable: false,
  enumerable: false,
  configurable: false
});

//when configurable: false, this will cause
//   TypeError: Cannot redefine property: toString
//Object.defineProperty(task, 'toString', {
//  enumerable: true
//});

//when writable: true, the below will cause
//  TypeError: task.toString is not a function
task.toString = 'hi';
console.log(task.toString());
//output:
//  my title my description

console.log(Object.keys(task));
//output:
//[ 'title', 'description', 'toString' ]   when enumerable: true
//[ 'title', 'description' ]   when enumerable: false

//urgentTask is inherited from task by using Object.create()
var urgentTask = Object.create(task);

Object.defineProperty(urgentTask, 'toString', {
  //even though task.configurable: false, we are able to change value 
  //   property here since urgentTask is a new object 
  value: function() {
    return this.title + ' is urgent';
  },
  writable: false,
  enumerable: true,
  configurable: false
});

console.log(urgentTask.toString());
//output: 
//  my title is urgent

console.log(Object.keys(urgentTask));
//output:  -- !surprise: 'title', 'description' is not in keys
//[ 'toString' ]   when enumerable: true
