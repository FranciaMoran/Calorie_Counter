/*const uuid = require('uuid');

function StorageException(message) {
   this.message = message;
   this.name = "StorageException";
}

const MOCK_LOGGED_FOOD = {
	create: function(name, amount1, amount2, amount3, amount4, amount5, amount6, amount7, amount8, amount9) {
	const food_items =
     {
     	id: uuid.v4(),
     	itemName: name,
     	Calories: amount1,
        Cholesterol: amount2,
        Dietary_Fiber: amount3,
        Protein: amount4,
        Saturated_Fat: amount5,
        Sodium: amount6,
        Sugars: amount7,
        Carbohydrates: amount8,
        Total_Fat: amount9
     };
	this.food_items[food_items.id] = food_items;
    return food_items;
},
  get: function() {
    return Object.keys(this.food_items).map(key => this.food_items[key]);
  }
};

function createLoggedFood() {
  const storage = Object.create(MOCK_LOGGED_FOOD);
  storage.food_items = {};
  return storage;
}

module.exports = {
  MOCK_LOGGED_FOOD: createLoggedFood()
}

/*
function getLoggedFood (callbackFn) {
    setTimeout(function(){ callbackFn(MOCK_STATUS_UPDATES)}, 100);
}

// this function stays the same when we connect
// to real API later
function displayLoggedFood(data) {
    for (index in data.food_items) {
       $('body').append(
        '<p>' + data.food_items[index].text + '</p>');
    }
}

// this function can stay the same even when we
// are connecting to real API
function getAndDisplayLoggedFood() {
    getLoggedFood(displayLoggedFood);
}

$(function() {
    getAndDisplayLoggedFood();
})
*/
let MOCK_LOGGED_FOOD = {
	create: function(id, itemName, Calories, Cholesterol, Dietary_Fiber, Protein, Saturated_Fat, Sodium, Sugars, Carbohydrates, Total_Fat) {
	"food_items": [
     {
     	"id": "111111",
     	"itemName": "apple",
     	"Calories": "100",
        "Cholesterol": "0",
        "Dietary_Fiber": "25",
        "Protein": "5",
        "Saturated_Fat": "5",
        "Sodium": "4",
        "Sugars": "4",
        "Carbohydrates": "25",
        "Total_Fat": "1"
     },
     {
     "id": "222222",
     	"itemName": "orange",
     	"Calories": "120",
        "Cholesterol": "3",
        "Dietary_Fiber": "20",
        "Protein": "4",
        "Saturated_Fat": "0",
        "Sodium": "3",
        "Sugars": "3",
        "Carbohydrates": "10",
        "Total_Fat": "1"
    },
    {
    	"id": "333333",
     	"itemName": "grapes",
     	"Calories": "80",
        "Cholesterol": "3",
        "Dietary_Fiber": "28",
        "Protein": "3",
        "Saturated_Fat": "8",
        "Sodium": "1",
        "Sugars": "1",
        "Carbohydrates": "8",
        "Total_Fat": "0"
    },
    {
      "id": "444444",
     	"itemName": "banana",
     	"Calories": "105",
        "Cholesterol": "2",
        "Dietary_Fiber": "30",
        "Protein": "55",
        "Saturated_Fat": "8",
        "Sodium": "2",
        "Sugars": "9",
        "Carbohydrates": "55",
        "Total_Fat": "8"
    },
    {
    	"id": "555555",
     	"itemName": "chicken",
     	"Calories": "125",
        "Cholesterol": "2",
        "Dietary_Fiber": "5",
        "Protein": "15",
        "Saturated_Fat": "5",
        "Sodium": "4",
        "Sugars": "4",
        "Carbohydrates": "25",
        "Total_Fat": "1"
    }
	]
	this.food_items[food_items.id] = food_items;
    return food_items;
},
  get: function() {
    return Object.keys(this.food_items).map(key => this.food_items[key]);
  },
};
*/