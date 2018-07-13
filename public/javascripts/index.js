const NUTRITION_URL = 

`https://api.nutritionix.com/v1_1/search/`;

//////////////////////////////////////////////////

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
        <button id="add-own">Add Own Item</button>
        <button id="show-logged">Show Logged Food Items</button>
          <form>
          <p>search food items here for nutritional information to add to your daily calories</p>
          <label id="labels" for="js-query">Food Item Here:</label>
          <input type="text" id="js-query" name="search" aria-label="search-here" placeholder="enter food here">
          <button id="search-button" type="submit">Search</button>
          <span id="error"></span><br>
          </form>
         <div id="add-custom"></div>
         <div id="added-items"></div>
         <div id="nutrition-data">`;
}


///////////////////////////////////////////////////////////////////

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
      results: `0:05`,
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
        console.log(data);
        var resultsHTML = "";
          for (var i=0; i < data.hits.length; i++){
          var eachItem = data.hits[i];
          var eachItemHTML = displayNutritionAPIData(eachItem);
          resultsHTML += eachItemHTML;
          }
        $('#nutrition-data').html(resultsHTML);
      }
  };
  let result = $.ajax(settings);
}

function displayNutritionAPIData (eachItem) {
  return `<div>
            <button class="add">add</button>
            <p id="name">${eachItem.fields.item_name}</p>
            <p>Calories: <span class="calories">${eachItem.fields.nf_calories}</span></p>
            <p>Cholesterol: <span id="cholesterol">${eachItem.fields.nf_cholesterol}</span>mg</p>
            <p>Dietary Fiber: <span id="dietary-fiber">${eachItem.fields.nf_dietary_fiber}</span>g</p>
            <p>Protein: <span id="protein">${eachItem.fields.nf_protein}</span>g</p>
            <p>Saturated Fat: <span id="saturated-fat">${eachItem.fields.nf_saturated_fat}</span>g</p>
            <p>Sodium: <span id="sodium">${eachItem.fields.nf_sodium}</span>mg</p>
            <p>Sugar: <span id="sugar">${eachItem.fields.nf_sugars}</span>g</p>
            <p>Carbohydrates: <span id="carbohydrates">${eachItem.fields.nf_total_carbohydrate}</span>g</p>
            <p>Total Fat: <span id="total-fat">${eachItem.fields.nf_total_fat}</span>g</p>
          </div>`;
}


/////////////////////////////////////////////////////////////////////////

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
    $('#added-items').html(resultsHTML)
    }   
  }
  $.ajax(settings); 
}


///////////////////////////////////////////////////////////////////

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
       success: function(data) {
          let resultsHTML = ""
          for (let i=0; i < data.length; i++){
            let eachFoodItem = data[i];
            let eachFoodItemHTML = displayLoggedFoodData(eachFoodItem);
            resultsHTML += eachFoodItemHTML;
            edit(eachFoodItem)
          }
          totalCalories(data);
          $('#added-items').html(resultsHTML)
       }   
  }
  $.ajax(settings); 
}

function displayLoggedFoodData (eachFoodItem) {
   return `
    <button class="delete" id="${eachFoodItem.id}">delete</button>
    <button class="edit" id="${eachFoodItem.id}">edit</button>
    <p id="name">${eachFoodItem.name}</p>
    <p>Calories: <span class="calories">${eachFoodItem.calories}</span></p>
    <p>Cholesterol: <span id="cholesterol">${eachFoodItem.cholesterol}</span>mg</p>
    <p>Dietary Fiber: <span id="dietary-fiber">${eachFoodItem.dietaryFiber}</span>g</p>
    <p>Protein: <span id="protein">${eachFoodItem.protein}</span>g</p>
    <p>Saturated Fat: <span id="saturated-fat">${eachFoodItem.saturatedFat}</span>g</p>
    <p>Sodium: <span id="sodium">${eachFoodItem.sodium}</span>mg</p>
    <p>Sugar: <span id="sugar">${eachFoodItem.sugars}</span>g</p>
    <p>Carbohydrates: <span id="carbohydrates">${eachFoodItem.carbohydrate}</span>g</p>
    <p>Total Fat: <span id="total-fat">${eachFoodItem.totalFat}</span>g</p>`;
}





function totalCalories (foodItems) {
 let sum = 0;
  for (let i = 0; i < foodItems.length; i++) {
   sum += +foodItems[i].calories;
  }
  alert(sum);
}



///////////////////////////////////////////////////////////////////////////////////////////////

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
          $('#added-items').html(resultsHTML)
       }   
  }
  $.ajax(settings); 
});
}

////////////////////////////////////////////////////////////////////////////////////////////////////////


















///////////////////////////////////////////////////////////////

$(addCustomItem)

function addCustomItem () {
  $('#second-page').on('click', '#add-own', function(event) {
    $('#add-custom').html(customAddPage());
  })
}

function customAddPage () {
  return `<p>Item: <input id="name"placeholder="test"></input></p>
    <button class="confirm-adding-personal-item">ok</button>
    <p>Calories: <input type="text" id="calories" placeholder="test"></input></p>
    <p>Cholesterol: <input type="text" id="cholesterol" placeholder="test"></input>mg</p>
    <p>Dietary Fiber: <input type="text" id="dietary-fiber" placeholder="test"></input>g</p>
    <p>Protein: <input type="text" id="protein" placeholder="test"></input>g</p>
    <p>Saturated Fat: <input type="text" id="saturated-fat" placeholder="test"></input>g</p>
    <p>Sodium: <input type="text" id="sodium" placeholder="test"></input>mg</p>
    <p>Sugar: <input type="text" id="sugar" placeholder="test"></input>g</p>
    <p>Carbohydrates: <input type="text" id="carbohydrates" placeholder="test"></input>g</p>
    <p>Total Fat: <input type="text" id="total-fat" placeholder="test"></input>g</p>`;
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
    event.preventDefault();
    console.log(customFoodData);
    customPosting(customFoodData); 
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

$(edit)

function edit (eachFoodItem) {
  $('#second-page').on('click', '.edit', function(event){
    $('#added-items').html(editAddedItems(eachFoodItem))
  })
}

function editAddedItems (eachFoodItem) {

  return `


  <p>Item: <input id="name"placeholder="${eachFoodItem.name}"></input></p>
    <button class="confirm-changing-personal-item" id="${eachFoodItem.id}">ok</button>
    <p>Calories: <input type="text" id="calories" placeholder="${eachFoodItem.calories}">${eachFoodItem.calories}</input></p>
    <p>Cholesterol: <input type="text" id="cholesterol" placeholder="${eachFoodItem.cholesterol}"></input>mg</p>
    <p>Dietary Fiber: <input type="text" id="dietary-fiber" placeholder="${eachFoodItem.dietaryFiber}"></input>g</p>
    <p>Protein: <input type="text" id="protein" placeholder="${eachFoodItem.protein}"></input>g</p>
    <p>Saturated Fat: <input type="text" id="saturated-fat" placeholder="${eachFoodItem.saturatedFat}"></input>g</p>
    <p>Sodium: <input type="text" id="sodium" placeholder="${eachFoodItem.sodium}"></input>mg</p>
    <p>Sugar: <input type="text" id="sugar" placeholder="${eachFoodItem.sugars}"></input>g</p>
    <p>Carbohydrates: <input type="text" id="carbohydrates" placeholder="${eachFoodItem.carbohydrate}"></input>g</p>
    <p>Total Fat: <input type="text" id="total-fat" placeholder="${eachFoodItem.totalFat}"></input>g</p>`;
}

$(confirmChangingItem)

function confirmChangingItem () {
  $('#second-page').on('click', '.confirm-changing-personal-item', function(event) {
    alert("testing put");
    console.log(this.id);
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
    console.log(customFoodData);
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
       success: getLoggedItems
  }
  $.ajax(settings); 
}

/*
function displayCustomLoggedFoodData (eachFoodItem) {
  return `
    <button class="delete" id="${eachFoodItem.id}">delete</button>
    <button class="edit" id="${eachFoodItem.id}">edit</button>
    <p id="name">${eachFoodItem.name}</p>
    <p>Calories: <span class="calories">${eachFoodItem.calories}</span></p>
    <p>Cholesterol: <span id="cholesterol">${eachFoodItem.cholesterol}</span>mg</p>
    <p>Dietary Fiber: <span id="dietary-fiber">${eachFoodItem.dietaryFiber}</span>g</p>
    <p>Protein: <span id="protein">${eachFoodItem.protein}</span>g</p>
    <p>Saturated Fat: <span id="saturated-fat">${eachFoodItem.saturatedFat}</span>g</p>
    <p>Sodium: <span id="sodium">${eachFoodItem.sodium}</span>mg</p>
    <p>Sugar: <span id="sugar">${eachFoodItem.sugars}</span>g</p>
    <p>Carbohydrates: <span id="carbohydrates">${eachFoodItem.carbohydrate}</span>g</p>
    <p>Total Fat: <span id="total-fat">${eachFoodItem.totalFat}</span>g</p>`;
}
*/























































/*
function editDisplayedFoodData (eachFoodItem) {
  return `<p id="name">${eachFoodItem.name}</p>
  <button id="confirm-change">ok</button>
    <p>Calories: <input type="text" id="calories" placeholder="${eachFoodItem.calories}"></input></p>
    <p>Cholesterol: <input type="text" id="cholesterol" placeholder="${eachFoodItem.cholesterol}"></input>mg</p>
    <p>Dietary Fiber: <input type="text" id="dietary-fiber" placeholder="${eachFoodItem.dietaryFiber}"></input>g</p>
    <p>Protein: <input type="text" id="protein" placeholder="${eachFoodItem.protein}"></input>g</p>
    <p>Saturated Fat: <input type="text" id="saturated-fat" placeholder="${eachFoodItem.saturatedFat}"></input>g</p>
    <p>Sodium: <input type="text" id="sodium" placeholder="${eachFoodItem.sodium}"></input>mg</p>
    <p>Sugar: <input type="text" id="sugar" placeholder="${eachFoodItem.sugars}"></input>g</p>
    <p>Carbohydrates: <input type="text" id="carbohydrates" placeholder="${eachFoodItem.carbohydrates}"></input>g</p>
    <p>Total Fat: <input type="text" id="total-fat" placeholder="${eachFoodItem.totalFat}"></input>g</p>`;
}



/*

function addCustomItem () {
  $('#add-own').on('click', function(event) {
    $('#add-custom').html(`<p id="name">test</p>
    <button class="confirm-change">ok</button>
    <p>Calories: <input type="text" id="calories" placeholder="test"></input></p>
    <p>Cholesterol: <input type="text" id="cholesterol" placeholder="test"></input>mg</p>
    <p>Dietary Fiber: <input type="text" id="dietary-fiber" placeholder="test"></input>g</p>
    <p>Protein: <input type="text" id="protein" placeholder="test"></input>g</p>
    <p>Saturated Fat: <input type="text" id="saturated-fat" placeholder="test"></input>g</p>
    <p>Sodium: <input type="text" id="sodium" placeholder="test"></input>mg</p>
    <p>Sugar: <input type="text" id="sugar" placeholder="test"></input>g</p>
    <p>Carbohydrates: <input type="text" id="carbohydrates" placeholder="test"></input>g</p>
    <p>Total Fat: <input type="text" id="total-fat" placeholder="test"></input>g</p>`)
  })
}

function customPosting () {
    let settings = {
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
          $('#added-items').html(resultsHTML)
          customAddingToDataBase()
       }   
  }
  $.ajax(settings); 
}


function customAddingToDataBase () {
  $('#add-custom').on('click', '.confirm-change', function(event){
    alert("custom add");
    let customFoodData = {
      name: ($(this).parent().find('#name').text()),
      calories: ($(this).parent().find('#calories').text()),
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
    customPosting(customFoodData); 
  })
}

*/