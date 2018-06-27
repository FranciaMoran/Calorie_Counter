'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const foodItemSchema = mongoose.Schema({
  foodItem: {type: String , required: true }, 
  calories: { type: Number, required: true },
  cholesterol: { type: Number },
  dietaryFiber: { type: Number }, 
  protein: { type: Number },
  saturatedFat: { type: Number },
  sodium: { type: Number },       
  sugars: { type: Number },
  carbohydrates: { type: Number },
  totalFat: { type: Number }
});

foodItemSchema.methods.serialize = function() {
  return {
    id: this._id,
    foodItem: this.foodItem,
    calories: this.calories,
    cholesterol: this.cholesterol,
    dietaryFiber: this.dietaryFiber,
    protein: this.protein,
    saturatedFat: this.saturatedfat,
    sodium: this.sodium,
    sugars: this.sugars,
    carbohydrates: this.carbohydrates,
    totalFat: this.totalFat
  };
};

const loggedItem = mongoose.model('loggedItem', foodItemSchema);

module.exports = { loggedItem };