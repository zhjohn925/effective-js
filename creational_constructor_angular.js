//Copied from creational_constructor_obj.js 
// and adapted to angular environment

(function() {

  var app = angular.module('taskManager');
  
  app.factory('Task', function() {
    var Task = function(name) {
      this.name = name;
      this.completed = false;
    }
    Task.prototype.complete = function() {
      console.log('completing task: '+this.name);
      this.completed = true;
    }  
    Task.prototype.save = function() {
      console.log('saving Task: ' + this.name);
    }  
    return Task;
  });
  
}())

