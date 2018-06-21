

let MOCK_LOGGED_FOOD = {
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
};
 
function getLoggedFood(callbackFn) {
	setTimeout(function(){ callbackFn(MOCK_LOGGED_FOOD)}, 1);
}

function displayLoggedFood(data) {
    for (index in data.food_items) {
       $('body').append(
        '<p>' + data.food_items[index].itemName + '</p>' +
        '<p>' + data.food_items[index].Calories + '</p>');
    }
}

function getAndDisplayLoggedFood() {
    getLoggedFood(displayLoggedFood);
}

function getStartedButton() {
	$('#get-started').click(event =>{
		event.preventDefault();
	 $('#search-page').html(searchPage());
	 getAndDisplayLoggedFood();
	})
}

$(getStartedButton)

function searchPage () {
	return `<p>search food items here for nutritional information to add to your daily calories</p><label id="labels" for="js-query"><b>Food Item Here:</b></label>
            <input type="text" id="js-query" class="controls" name="search" aria-label="search-here" placeholder="enter food here">
              <button id="search-button" type="submit">Search</button>
              <span id="error"></span><br><p>Logged Food:</p>`
              ;
}