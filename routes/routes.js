const express = require("express");
const router = express.Router();
const Recipes = require("../models/recipes");
const User = require("../models/user");



router.get('/recipes', async (req, res, next) => {
    try {
        const getRecipes = await Recipes.find().populate('author')
        res.status(200).json(getRecipes)
    } catch (error) {
        console.log('/recipes (GET) ERROR: ', error)
    }
})

router.post('/recipes/create', async (req, res, next) => {
    try {
        const newRecipe = await Recipes.create(req.body)
        res.status(200).json(newRecipe);
    } catch(error) { 
        console.log('/recipes/create(POST) ERROR: ', error)
        res.status(400).json(error)
    }
})

router.get('/recipes/:id', async (req,res,next)=>{
    try {
        // console.log("EN SERVER, Req.params.id:",req.params.id)
        const recipeId =req.params.id
        const getRecipe = await Recipes.findOne({_id:recipeId}).populate('author')
        // console.log("RECIPIE RESPONSE:",getRecipe)
        res.status(200).json(getRecipe)
    } catch (error) {
        console.log('/recipes (GET) ERROR: ', error)
    }
})


router.get('/recipes/:id', async (req, res, next)=>{
    try {
        let response = await Recipes.findOne({_id:req.params.id}).populate('author')
        res.status(200).json(response);  
    } catch (error) {
      res.json(error);
    }
})

module.exports = router;