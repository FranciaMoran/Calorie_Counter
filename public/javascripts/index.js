const NUTRITION_URL = 

`https://api.nutritionix.com/v1_1/search/`;



$(getAddedItems)
$(changeItems)
$(deleteItems)
$(addCustomItem)

function searchItemsButton() {
    $('#search-button').click(event =>{
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

$(searchItemsButton)

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
       addingToDataBase();
      }
    };
  let result = $.ajax(settings);
}

function displayNutritionAPIData (eachItem) {
  return `<div>
  <button class="add">add</button>
    <p id="name">${eachItem.fields.item_name}</p>
    <p>Calories: <span id="calories">${eachItem.fields.nf_calories}</span></p>
    <p>Cholesterol: <span id="cholesterol">${eachItem.fields.nf_cholesterol}</span>mg</p>
    <p>Dietary Fiber: <span id="dietary-fiber">${eachItem.fields.nf_dietary_fiber}</span>g</p>
    <p>Protein: <span id="protein">${eachItem.fields.nf_protein}</span>g</p>
    <p>Saturated Fat: <span id="saturated-fat">${eachItem.fields.nf_saturated_fat}</span>g</p>
    <p>Sodium: <span id="sodium">${eachItem.fields.nf_sodium}</span>mg</p>
    <p>Sugar: <span id="sugar">${eachItem.fields.nf_sugars}</span>g</p>
    <p>Carbohydrates: <span id="carbohydrates">${eachItem.fields.nf_total_carbohydrate}</span>g</p>
    <p>Total Fat: <span id="total-fat">${eachItem.fields.nf_total_fat}</span>g</p>
  </div>`
  ;
}

function addingToDataBase () {
  $('.add').on('click', function(event){
    let foodData = {
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
    posting(foodData);
  })
}

function posting(foodData) {
  alert("testing2");
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

function displayFoodData (eachFoodItem) {
   return `
    <button id="change">edit</button>
    <button id="delete">delete</button>
    <p id="name">${eachFoodItem.name}</p>
    <p>Calories: <span id="calories">${eachFoodItem.calories}</span></p>
    <p>Cholesterol: <span id="cholesterol">${eachFoodItem.cholesterol}</span>mg</p>
    <p>Dietary Fiber: <span id="dietary-fiber">${eachFoodItem.dietaryFiber}</span>g</p>
    <p>Protein: <span id="protein">${eachFoodItem.protein}</span>g</p>
    <p>Saturated Fat: <span id="saturated-fat">${eachFoodItem.saturatedFat}</span>g</p>
    <p>Sodium: <span id="sodium">${eachFoodItem.sodium}</span>mg</p>
    <p>Sugar: <span id="sugar">${eachFoodItem.sugars}</span>g</p>
    <p>Carbohydrates: <span id="carbohydrates">${eachFoodItem.carbohydrate}</span>g</p>
    <p>Total Fat: <span id="total-fat">${eachFoodItem.totalFat}</span>g</p>`;
}

function getAddedItems () {
  $('#show-logged').on('click', function(event){
  let settings = {
       url: "/logged", 
       type: 'GET', 
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
});
}

function changeItems () {
  $('#added-items').on('click', '#change', function(event){
    alert("testing");
  let settings = {
       url: "/logged", 
       type: 'GET', 
       dataType: 'json', 
       contentType: 'application/json; charset= utf-8', 
       success: function(data) {
          let resultsHTML = ""
          for (let i=0; i < data.length; i++){
            let eachFoodItem = data[i];
            let eachFoodItemHTML = editDisplayedFoodData(eachFoodItem);
            resultsHTML += eachFoodItemHTML;
          }
          $('#added-items').html(resultsHTML)
       }   
  }
  $.ajax(settings); 
});
}

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

function deleteItems () {
  $('#added-items').on('click', '#delete', function(event){
    alert("testingdelete");
      let settings = {
       url: "/logged/_id", 
       type: 'DELETE', 
       success: function(data) {
          alert("testingsuccessdelete");
       }   
  }
  $.ajax(settings); 
});
}

function addCustomItem () {
  $('#add-own').on('click', function(event) {
    alert("testing add own button");
  })
}
