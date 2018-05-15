//TO-DO LIST
// - Add Event handler  (CONTROLLER Module)
// - Get input values   (UI Module)
// - Add the new item to our data structure (DATA Module)
// - Add the new item to the UI  (UI Module)
// - Calculate budget  (DATA Module)
// - Update UI  (UI Module)

//IIFE: Immediately Invoked Function Expression

//MODULES:  Created by IIFE and Closure
// 1. Important aspect of any robust application's architecture;
// 2. Keep the units of code for a project both cleanly separated and organized;
// 3. Encapsulate some data into privacy and expose other data publicly.

//Events
// https://developer.mozilla.org/en-US/docs/Web/Events
// https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML


//module pattern created by IIFE, and Closure
var budgetController = (function () {
  
  //function constructor (the first letter as Capital for naming convention)
  //use "new" keyword to create objects
  var Expanse = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  
  //function constructor (the first letter as Capital for naming convention)
   //use "new" keyword to create objects
  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  }
  
  var calculateTotal = function(type) {
    var sum = 0;
    //loop thru each element in the array;
    //callback function takes current element, index, and entire array;
    //only need current element for this
    data.allItems[type].forEach(function(current){
      sum += current.value;
    });
    //store to global data structure
    data.totals[type] = sum;
  }

  var allExpenses = [];
  var allIncomes = [];
  var totalExpenses = 0;
  
  var data = {
    allItems: { exp: [], inc: [] },
    totals: { exp: 0, inc: 0 },
    budget: 0,
    percentage: -1
  };
  
  return {
    addItem: function(type, des, val) {
      var newItem, ID;
      ID = 0;
      if (type==='exp') {
        newItem = new Expanse(ID, des, val);
      } else if (type==='inc') {
        newItem = new Income(ID, des, val);
      }
      data.allItems[type].push(newItem);
      return newItem;
    },
    calculateBudget: function() {
      //calculate total income and expenses
      //results are stored in data structure
      calculateTotal('inc');
      calculateTotal('exp');
      //calculate the budget: income-expenses
      data.budget = data.totals.inc - data.totals.exp;
      //calculate the percentage of income that we spent
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100); 
      } else {
        data.percentage = -1;
      }
    },
    getBudget: function() {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage 
      };
    }
  };
  
}) ();


//IIFE is executed, return an object with getInput() property
//to UIController. ie. UIController.getInput().type
var UIController = (function() {
  
  //private variable (an object) in closure
  var DOMstrings = { 
     inputType: '.add__type', 
     inputDescription: '.add__description',
     inputValue: '.add__value',
     inputBtn: '.add__btn',
     incomeContainer: '.income__list',
     expensesContainer: '.expenses__list',
     budgetLabel: '.budget__value',
     incomeLabel: '.budget__income-value',
     expensesLabel: '.budget__expenses-value',
     percentageLabel: '.budget__expenses-percentage'
  };
  
  //public by return
  //{} indicates object, return 'getInput' object
  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      };
    },
    addListItem: function(obj, type) {
      var html, newHtml, element;
      if (type === 'inc') {
        element = DOMstrings.incomeContainer;
        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete-btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'; 
      } else if (type === 'exp') {
        element = DOMstrings.expensesContainer;
        html ='<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete-btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      //replace the placeholder text with the actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },
    //clear the fields after adding a new item
    clearFields: function() {
      var fields, fieldArray;
      fields = document.querySelectorAll(DOMstrings.inputDescription+','+DOMstrings.inputValue);      
      fields.forEach (function(current, index, array) {
        //current = current html element
        //index=0, current='.add__description'
        //index=1, current='.add__value'
        //
        //console.log('current '+current.value);
        //console.log('index '+index);
        //console.log('array '+array);
        //
        current.value = '';
      });
      //focus at the first html element (.add__description)
      fields[0].focus();
      //
      //fieldArray = Array.prototype.slice.call(fields);
      //fieldArray[0].focus();    
    },
    displayBudget: function(obj) {
      document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
      document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
      document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;
      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage+'%';
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = '---';
      }
    },
    getDOMstrings: function() {
      return DOMstrings;
    }
  };
})();


//Global App Controller
//Connect both controllers: budgetController and UIController
var controller = (function(budgetCtrl, UICtrl) {
 
  //private 
  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMstrings();
    //add event listener to the element with "add__btn" class
    //ctrlAddItem() is a callback function defined above
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    //browser passes event as argument when keypress
    document.addEventListener('keypress', function(event){
      //ENTER key was pressed; the old browser uses 'which' property 
      if (event.keyCode === 13 || event.which === 13) {
        //enter key was pressed
        ctrlAddItem();
      }
    });
  };
  
  var updateBudget = function() {
    // 1. calculate the budget
    budgetCtrl.calculateBudget();
    // 2. return the budget
    var budget = budgetCtrl.getBudget();
    // 3. display the budget on the UI
    UICtrl.displayBudget(budget);
    
    //console.log(budget);
  };

  //private
  var ctrlAddItem = function() {
    // 1. Get the field input data
    var input = UICtrl.getInput();

    if (input.description !== "" && !isNaN(input.value) && input.value>0) {  
      // 2. Add the item to the budget controller
      var newItem = budgetCtrl.addItem(input.type, input.description, input.value);
      
      // 3. Add the item to the UI
      UICtrl.addListItem(newItem, input.type);
      //clear the fields after adding a new item
      UICtrl.clearFields();

      updateBudget(); 
    }

    console.log(input);
  }
  
  return {
    init: function() {
      console.log("Controller was started.");
      setupEventListeners();
      //initialize top UP to be all zero
      UICtrl.displayBudget({
        budget: 0, totalInc: 0, totalExp: 0, percentage: -1
      });
    }
  };  

})(budgetController, UIController);


controller.init();

