const mongoose = require('mongoose');
const Schema = mongoose.Schema;

    const recipeSchema = new Schema({
        title: {type: String, required: true},
        author: {type: Schema.Types.ObjectId, ref:'User'},
        imageUrl: {type: String, required: true},
        ingredients: {type: Array, required:true},
        steps: {type: Array, required:true},
        prepTime: {type: String, required: true},
        difficulty: {type:String, required:true,enum:['easy','medium','hard']},
        portions: {type: String, required: true},
        popularity:{type:Number,default:0},
        category:{type:String,required:true,enum:['breakfast','brunch','lunch','snack','dinner']},
        liked:[{type:Schema.Types.ObjectId, ref:'User'}]
    });

  const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;