//Constructor Pattern: 
//  -Create objects from functions by using 'new' keyword.
//  -the 'new' keyword:
//    -Creates a brand new object
//    -Links to an object prototype
//    -Binds 'this' to the new object scope
//    -Implicitly returns 'this'
//Drawback of Constructor pattern
//  -properties are duplicated for each new object,
//   that is not efficient.
//  -To fix this by using prototype, every new object's
//   property points back to the same one in prototype.

//constructor
var Task = function(name) {
  this.name = name;
  this.completed = false;
  
  //To avoid duplicate when each object is created 
  //  by the 'new' keyword, move these two functions 
  //  to Task.prototype.
  //this.complete = function() {
  //  console.log('completing task: '+this.name);
  //  this.completed = true;
  //}
  //this.save = function() {
  //  console.log('saving Task: ' + this.name);
  //}
}

//each newly created object is linked to prototype
//  properties but not copy properties.
Task.prototype.complete = function() {
  console.log('completing task: '+this.name);
  this.completed = true;
}
Task.prototype.save = function() {
  console.log('saving Task: ' + this.name);
}

module.exports = Task;