const NUTRITION_URL = 

`https://api.nutritionix.com/v1_1/search/`;

function getLoggedFood(callbackFn) {
    setTimeout(function(){ callbackFn(MOCK_LOGGED_FOOD)}, 1);
}

function displayLoggedFood(data) {
    for (index in data.food_items) {
       $('body').append(
        '<p>' + data.food_items[index].itemName + '</p>' +
        '<p>' + data.food_items[index].calories + '</p>');
    }
}

function getAndDisplayLoggedFood() {
    getLoggedFood(displayLoggedFood);
}

function searchItemsButton() {
    $('#search-button').click(event =>{
      event.preventDefault();
     //getAndDisplayLoggedFood();
      const queryTarget = $(event.currentTarget).find('#js-query');
      const queryT = $('#js-query').val()
        if (queryT){
        $('#error').text("")
      //alert(queryT);
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
      //alert(data.hits[0].fields.item_name);
        var resultsHTML = "";
        for (var i=0; i < data.hits.length; i++){
          var eachItem = data.hits[i];
          var eachItemHTML = displayNutritionData(eachItem);
          resultsHTML += eachItemHTML;
        }
       $('#nutrition-data').html(resultsHTML);
       addingToDataBase();
      }
    };
  let result = $.ajax(settings);
}

function displayNutritionData (eachItem) {
  return `
  <div>
    <p id="name">${eachItem.fields.item_name}</p>
    <button class="add">add</button>
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
  console.log("testing2")
    settings = {
       url: "/logged", 
       type: 'POST', 
       data: JSON.stringify(foodData), 
       dataType: 'json', 
       contentType: 'application/json; charset= utf-8', 
       success: function(data) {
        console.log("test");
        console.log(data);
       }}; 
    $.ajax(settings);
    $('#added-items').html();
  }

