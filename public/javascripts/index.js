const NUTRITION_URL = 

`https://api.nutritionix.com/v1_1/search/`;

///////*contains function to return html for the second page*/////////////

$(getStartedButton)

function getStartedButton () {
  $('#get-started').on('click', function(event) {
    $('#second-page').html(secondPage());
  })
}

function secondPage () {
  return `
          <header id="header-two" role="banner">
            <div id="black-header-two">
              <h1 id="name-of-app-two">Calorie Counter!</h1>
            </div>
          </header>
          <div role="main">
          <button id="add-own">Add Own Item</button>
          <button id="show-logged">Show Logged Food Items</button>
            <form autocomplete="on" aria-live="assertive">
              <p id="search-sentence">Search food items here for nutritional information to add to your daily calories</p>
              <label id="labels" for="js-query">Search Food Item Here:
              </label>
              <input type="text" id="js-query" name="search" aria-label="search-here" placeholder="enter food here">
              <button id="search-button" type="submit">Search</button>
              <span id="error"></span><br>
            </form>
            <div id="all-info">
            <div id="sums"></div>
            <div id="titles"></div>
            <div id="items">
            </div>
            </div>
          </div>`;
}

////////*api will get nutritional info and display the data*/////////////

$(searchItemsButton)

function searchItemsButton() {
  $('#second-page').on('click', '#search-button', function(event){
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('#js-query');
    const queryT = $('#js-query').val()
      if (queryT){
      $('#error').text("")
      getNutritionAPI(queryT);
      }
      else {
      $('#error').text("Please enter an item")
      }
  });
}


function getNutritionAPI (queryT) {
  let settings = {
      url: NUTRITION_URL + queryT,
      data: {
      results: `0:10`,
      cal_min:0,
      cal_max:50000,
      fields:'item_name,item_id,nf_water_grams,nf_calories,nf_calories_from_fat,nf_total_fat,nf_saturated_fat,nf_trans_fatty_acid,nf_polyunsaturated_fat,nf_monounsaturated_fat,nf_cholesterol,nf_sodium,nf_total_carbohydrate,nf_dietary_fiber,nf_sugars,nf_protein',
      appId:'f1d9b3b4',
      appKey:'d617582ba93c896d32c6b93eb8443a64'
      },
      error(xhr,status,error)   {
      console.log( status);
      console.log( error );
      },
      dataType: `json`,
      type:`GET`,
      success: function (data){
        var resultsHTML = "";
          for (var i=0; i < data.hits.length; i++){
          var eachItem = data.hits[i];
          var eachItemHTML = displayNutritionAPIData(eachItem);
          resultsHTML += eachItemHTML;
          }
        $('#items').html(resultsHTML);
        $('#titles').html(displayNutritionAPIDataTitle)
      }
  };
  let result = $.ajax(settings);
}

function displayNutritionAPIData (eachItem) {
  return `<div id="nutrition-data">
            <button class="add">add</button>
            <b>
            <p id="name">${eachItem.fields.item_name}</p>
            <p>Calories : <span class="calories">${eachItem.fields.nf_calories}</span></p>
            <p>Cholesterol : <span id="cholesterol">${eachItem.fields.nf_cholesterol}</span>mg</p>
            <p>Dietary Fiber : <span id="dietary-fiber">${eachItem.fields.nf_dietary_fiber}</span>g</p>
            <p>Protein : <span id="protein">${eachItem.fields.nf_protein}</span>g</p>
            <p>Saturated Fat : <span id="saturated-fat">${eachItem.fields.nf_saturated_fat}</span>g</p>
            <p>Sodium : <span id="sodium">${eachItem.fields.nf_sodium}</span>mg</p>
            <p>Sugar : <span id="sugar">${eachItem.fields.nf_sugars}</span>g</p>
            <p>Carbohydrates : <span id="carbohydrates">${eachItem.fields.nf_total_carbohydrate}</span>g</p>
            <p>Total Fat : <span id="total-fat">${eachItem.fields.nf_total_fat}</span>g</p>
            </b>
            <hr>
          </div>`;
}


function displayNutritionAPIDataTitle () {
  return `<h2>Nutritional Information:</h2>`; 
}
///////////*adds selected api info to logged food*/////////////////////////

$(addingApiItemToDataBase)

function addingApiItemToDataBase () {
  $('#second-page').on('click', '.add', function(event){
    let foodData = {
        name: ($(this).parent().find('#name').text()),
        calories: ($(this).parent().find('.calories').text()),
        cholesterol: ($(this).parent().find('#cholesterol').text()),
        dietaryFiber: ($(this).parent().find('#dietary-fiber').text()),
        protein: ($(this).parent().find('#protein').text()),
        saturatedFat: ($(this).parent().find('#saturated-fat').text()),
        sodium: ($(this).parent().find('#sodium').text()),
        sugars: ($(this).parent().find('#sugar').text()),
        carbohydrates: ($(this).parent().find('#carbohydrates').text()),
        totalFat: ($(this).parent().find('#total-fat').text())
        }
    event.preventDefault();
    postingApi(foodData);
  })
}

function postingApi(foodData) {
  settings = {
    url: "/logged", 
    type: 'POST', 
    data: JSON.stringify(foodData), 
    dataType: 'json', 
    contentType: 'application/json; charset= utf-8', 
    success: function(data) {
      let resultsHTML = ""
        for (let i=0; i < data.length; i++){
        let eachFoodItem = data[i];
        let eachFoodItemHTML = displayFoodData(eachFoodItem);
        resultsHTML += eachFoodItemHTML;
        }
        getLoggedItems();
    }   
  }
  $.ajax(settings); 
}


//////////////*displays logged food*///////////////////////////

$(showLoggedItems)

function showLoggedItems () {
  $('#second-page').on('click', '#show-logged', function(event){
    getLoggedItems()
  });
}

function getLoggedItems () {
  let settings = {
       url: "/logged", 
       type: 'GET', 
       dataType: 'json', 
       contentType: 'application/json; charset= utf-8', 
       success: function(data, foodItems) {
          let resultsHTML = ""
          for (let i=0; i < data.length; i++){
            let eachFoodItem = data[i];
            let eachFoodItemHTML = displayLoggedFoodData(eachFoodItem);
            resultsHTML += eachFoodItemHTML;
            edit(eachFoodItem, `edit-${eachFoodItem.id}`)
          }
          totals(data);
          $('#items').html(resultsHTML)
          $('#titles').html(displayLoggedFoodDataTitle) 
       }  
  }
  $.ajax(settings);
}

function displayLoggedFoodData (eachFoodItem) {
   return `
          <button class="delete" id="${eachFoodItem.id}">delete</button>
          <button class="edit-${eachFoodItem.id}" id="edit">edit</button>
          <p id="name">${eachFoodItem.name}</p>
          <p>Calories: <span class="calories">${eachFoodItem.calories}</span></p>
          <p>Cholesterol: <span id="cholesterol">${eachFoodItem.cholesterol}</span>mg</p>
          <p>Dietary Fiber: <span id="dietary-fiber">${eachFoodItem.dietaryFiber}</span>g</p>
          <p>Protein: <span id="protein">${eachFoodItem.protein}</span>g</p>
          <p>Saturated Fat: <span id="saturated-fat">${eachFoodItem.saturatedFat}</span>g</p>
          <p>Sodium: <span id="sodium">${eachFoodItem.sodium}</span>mg</p>
          <p>Sugar: <span id="sugar">${eachFoodItem.sugars}</span>g</p>
          <p>Carbohydrates: <span id="carbohydrates">${eachFoodItem.carbohydrates}</span>g</p>
          <p>Total Fat: <span id="total-fat">${eachFoodItem.totalFat}</span>g</p>
          <hr>
          `;
}

function displayLoggedFoodDataTitle () {
  return `<h2>Logged Food Items:</h2>`;
} 
function displaySums (calorieSum, cholesterolSum, dietaryFiberSum, proteinSum, saturatedFatSum, sodiumSum, sugarsSum, carbohydratesSum, totalFatSum){
  var d = new Date(); 
  d.setMonth(7);      
  x = d.getMonth();
    return `
            <div id="totals">Totals
              <p>${x}/${new Date().getDate()}/${new Date().getFullYear()}</p>
              <p>Total Calories: ${calorieSum}</p>
              <p>Total Cholesterol: ${cholesterolSum}</p>
              <p>Total Dietary Fiber: ${dietaryFiberSum}</p>
              <p>Total Protein: ${proteinSum}</p>
              <p>Total Saturated Fat: ${saturatedFatSum}</p>
              <p>Total Sodium: ${sodiumSum}</p>
              <p>Total Carbohydrates: ${carbohydratesSum}</p>
              <p>Total Fat: ${totalFatSum}</p>
            </div>`;
}


function totals (foodItems) {
 let calorieSum = 0;
  for (let i = 0; i < foodItems.length; i++) {
   calorieSum += +foodItems[i].calories;
  }
  let cholesterolSum = 0;
  for (let i = 0; i < foodItems.length; i++) {
   cholesterolSum += +foodItems[i].cholesterol;
  }
  let dietaryFiberSum = 0;
  for (let i = 0; i < foodItems.length; i++) {
   dietaryFiberSum += +foodItems[i].dietaryFiber;
  }
  let proteinSum = 0;
  for (let i = 0; i < foodItems.length; i++) {
   proteinSum += +foodItems[i].protein;
  }
  let saturatedFatSum = 0;
  for (let i = 0; i < foodItems.length; i++) {
   saturatedFatSum += +foodItems[i].saturatedFat;
  }
  let sodiumSum = 0;
  for (let i = 0; i < foodItems.length; i++) {
   sodiumSum += +foodItems[i].sodium;
  }
  let sugarsSum = 0;
  for (let i = 0; i < foodItems.length; i++) {
   sugarsSum += +foodItems[i].sugars;
  }
  let carbohydratesSum = 0;
  for (let i = 0; i < foodItems.length; i++) {
   carbohydratesSum += +foodItems[i].carbohydrates;
  }
   let totalFatSum = 0;
  for (let i = 0; i < foodItems.length; i++) {
   totalFatSum += +foodItems[i].totalFat;
  }
  $('#sums').html(displaySums(calorieSum, cholesterolSum, dietaryFiberSum, proteinSum, saturatedFatSum, sodiumSum, sugarsSum, carbohydratesSum, totalFatSum))
} 



////////////////////*deletes logged items*/////////////////////////////////////////

$(deleteItems)

function deleteItems () {
  $('#second-page').on('click', '.delete', function(event){
    let settings = {
        url: "/logged/" + this.id,
        type: 'DELETE',
        success: function(data) {
          let resultsHTML = ""
          for (let i=0; i < data.length; i++){
            let eachFoodItem = data[i];
            let eachFoodItemHTML = displayLoggedFoodData(eachFoodItem);
            resultsHTML += eachFoodItemHTML;
          }
          totals(data);
          $('#items').html(resultsHTML)
        }   
    }
    $.ajax(settings); 
});
}

//////////////////*adds custom item*////////////////

$(addCustomItem)

function addCustomItem () {
  $('#second-page').on('click', '#add-own', function(event) {
    $('#all-info').html(customAddPage());
  })
}

function customAddPage () {
  return `<form id="add-custom">
          <p>Item: <input class="inputs" type="text" id="name"></input></p>
          <p>Calories: <input class="inputs" type="text" id="calories"></input></p>
          <p>Cholesterol: <input class="inputs" type="text" id="cholesterol"></input>mg</p>
          <p>Dietary Fiber: <input class="inputs" type="text" id="dietary-fiber"></input>g</p>
          <p>Protein: <input class="inputs" type="text" id="protein"></input>g</p>
          <p>Saturated Fat: <input class="inputs" type="text" id="saturated-fat"></input>g</p>
          <p>Sodium: <input class="inputs" type="text" id="sodium"></input>mg</p>
          <p>Sugar: <input class="inputs" type="text" id="sugar"></input>g</p>
          <p>Carbohydrates: <input class="inputs" type="text" id="carbohydrates"></input>g</p>
          <p>Total Fat: <input class="inputs" type="text" id="total-fat"></input>g</p>
          <button class="confirm-adding-personal-item">confirm</button>
          </form>`;
}

$(confirmAddingCustomItem)

function confirmAddingCustomItem () {
  $('#second-page').on('click', '.confirm-adding-personal-item', function(event) {
    let customFoodData = {
        name: $(this).parent().find('#name').val(),
        calories: $(this).parent().find('#calories').val(),
        cholesterol: $(this).parent().find('#cholesterol').val(),
        dietaryFiber: $(this).parent().find('#dietary-fiber').val(),
        protein: $(this).parent().find('#protein').val(),
        saturatedFat: $(this).parent().find('#saturated-fat').val(),
        sodium: $(this).parent().find('#sodium').val(),
        sugars: $(this).parent().find('#sugar').val(),
        carbohydrates: $(this).parent().find('#carbohydrates').val(),
        totalFat: $(this).parent().find('#total-fat').val()
    }
    customPosting(customFoodData); 
    $('#second-page').html(secondPage());
  })
}

function customPosting (customFoodData) {
  let settings = {
      url: "/logged", 
      type: 'POST', 
      data: JSON.stringify(customFoodData), 
      dataType: 'json', 
      contentType: 'application/json; charset= utf-8', 
      success: function(data) {
        let resultsHTML = ""
        for (let i=0; i < data.length; i++){
          let eachFoodItem = data[i];
          let eachFoodItemHTML = displayLoggedFoodData(eachFoodItem);
          resultsHTML += eachFoodItemHTML;
          }
          $('#custom-added-items').html(resultsHTML)
      }   
  }
  $.ajax(settings); 
}



function edit (eachFoodItem, editId) {
  $('#second-page').on('click', `.${editId}`, function(event){
    $('#items').html(editAddedItems(eachFoodItem))
  })
}

function editAddedItems (eachFoodItem) {

  return `
          <button class="confirm-changing-personal-item" id="${eachFoodItem.id}">ok</button>
          <p>Item: <input class="inputs" type="text" id="name" value="${eachFoodItem.name}"></input></p>
          <p>Calories: <input class="inputs" type="text" id="calories" value="${eachFoodItem.calories}"></input></p>
          <p>Cholesterol: <input class="inputs" type="text" id="cholesterol" value="${eachFoodItem.cholesterol}"></input>mg</p>
          <p>Dietary Fiber: <input class="inputs" type="text" id="dietary-fiber" value="${eachFoodItem.dietaryFiber}"></input>g</p>
          <p>Protein: <input class="inputs" type="text" id="protein" value=${eachFoodItem.protein}></input>g</p>
          <p>Saturated Fat: <input class="inputs" type="text" id="saturated-fat" value="${eachFoodItem.protein}"></input>g</p>
          <p>Sodium: <input class="inputs" type="text" id="sodium" value="${eachFoodItem.sodium}"></input>mg</p>
          <p>Sugar: <input class="inputs" type="text" id="sugar" value="${eachFoodItem.sugars}"></input>g</p>
          <p>Carbohydrates: <input class="inputs" type="text" id="carbohydrates" value="${eachFoodItem.carbohydrates}"></input>g</p>
          <p>Total Fat: <input class="inputs" type="text" id="total-fat" value="${eachFoodItem.totalFat}"></input>g</p>`;
}

$(confirmChangingItem)

function confirmChangingItem () {
  $('#second-page').on('click', '.confirm-changing-personal-item', function(event) {
    let customFoodData = {
        name: $(this).parent().find('#name').val(),
        calories: $(this).parent().find('#calories').val(),
        cholesterol: $(this).parent().find('#cholesterol').val(),
        dietaryFiber: $(this).parent().find('#dietary-fiber').val(),
        protein: $(this).parent().find('#protein').val(),
        saturatedFat: $(this).parent().find('#saturated-fat').val(),
        sodium: $(this).parent().find('#sodium').val(),
        sugars: $(this).parent().find('#sugar').val(),
        carbohydrates: $(this).parent().find('#carbohydrates').val(),
        totalFat: $(this).parent().find('#total-fat').val()
    }
    event.preventDefault();
    putRequest(customFoodData, this.id); 
  })
}

function putRequest (customFoodData, foodId) {
   let settings = {
       url: "/logged/" + foodId,
       data: JSON.stringify(customFoodData),
       type: 'PUT', 
       dataType: 'json', 
       contentType: 'application/json; charset= utf-8',
       success: function(data) {
          let resultsHTML = ""
          for (let i=0; i < data.length; i++){
            let eachFoodItem = data[i];
            let eachFoodItemHTML = displayLoggedFoodData(eachFoodItem);
            resultsHTML += eachFoodItemHTML;
          }
          totals(data);
          $('#items').html(resultsHTML)
        }   
    }
    $.ajax(settings); 
}
