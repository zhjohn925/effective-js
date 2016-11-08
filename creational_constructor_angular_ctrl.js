(function(){
  var app = angular.module('taskManager', []);
  
  var taskController = function(Task) {
    var ctrl = this;
    ctrl.tasks = [
        new Task({name: 'task 1'}),
        new Task({name: 'task 2', completed: false})  
    ];
  };
  
  app.controller('taskCtrl', taskController)
}());