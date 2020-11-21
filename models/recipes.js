const mongoose = require('mongoose');
const Schema = mongoose.Schema;

    const recipeSchema = new Schema({
        title: {type: String, required: true},
        author: {type: Schema.Types.ObjectId, ref:'User'},
        imageUrl: {type: String, required: true},
        ingredients: {type: String, required:true},
        preparation: {type: String, required:true},
        prepTime: {type: String, required: true},
        difficulty: {type:String, required:true}
    });

  const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;