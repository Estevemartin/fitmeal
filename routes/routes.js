const express = require("express");
const router = express.Router();
const Recipes = require("../models/recipes");

// router.post("/createRecipe", uploader.single("imageUrl"), async (req, res, next) => {
//     try {
//         console.log('inside create recipe')
//         const { title, prepTime, difficulty, ingredients, preparation } = req.body.recipe;
//         console.log(req.body)
//         const newRecipe = await Recipes.create(
//             { title, imageUrl:req.file.secure_url, prepTime, difficulty, ingredients, preparation, author:req.body._id}
//         )
//         if (!req.file) {
//             next(new Error("No file uploaded!"));
//             return;
//           }
//         res.status(200).json(newRecipe)
//         // console.log(newRecipe)
//     } catch (error) {
//         console.log('/createRecipe ERROR: ', error)
//     }
// })

router.get('/recipes', async (req, res, next) => {
    try {
        const getRecipes = await Recipes.find()
        res.status(200).json(getRecipes)
    } catch (error) {
        console.log('/recipes ERROR: ', error)
    }
})

router.post('/createRecipe', async (req, res, next) => {
    try {
        const newRecipe = await Recipes.create(req.body)
        res.status(200).json(newRecipe);
    } catch(error) { 
        console.log('/createRecipe ERROR: ', error)
    }
})

module.exports = router;