const express = require("express");
const router = express.Router();
const Recipes = require("../models/recipes");
const User = require("../models/user");


// RECIPES
router.get('/recipes', async (req, res, next) => {
    try {
        const getRecipes = await Recipes.find().populate('author')
        res.status(200).json(getRecipes)
    } catch (error) {
        console.log('/recipes (GET) ERROR: ', error)
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
        console.log('/recipes/:id (GET) ERROR: ', error)
        res.status(400).json(error)
    }
})
router.post('/recipes/create', async (req, res, next) => {
    try {
        const newRecipe = await Recipes.create(req.body)
        res.status(200).json(newRecipe);
    } catch(error) { 
        console.log('/recipes/create (POST) ERROR: ', error)
        res.status(400).json(error)
    }
})
router.post('/recipes/update', async (req, res, next) => {
    // console.log("INSIDE RECIPES/UPDATE")
    try {
        // console.log("Req.Body._id en Server: ",req.body._id)
        // const newRecipe = await Recipes.create(req.body)
        const updatedRecipe = await Recipes.findByIdAndUpdate({_id:req.body._id},req.body)
        res.status(200).json(updatedRecipe);
    } catch(error) { 
        console.log('/recipes/update (POST) ERROR: ', error)
        res.status(400).json(error)
    }
})
router.post('/recipes/saved', async (req,res,next)=>{
    try {
        const userId =req.body.userId
        // console.log(req.params)
        // console.log(difficulty)
        const getRecipe = await User.find({_id:userId},'saved').populate('saved')
        // console.log(getRecipe)
        res.status(200).json(getRecipe)
    } catch (error) {
        console.log('/recipes/saved (POST) ERROR: ', error)
        res.status(400).json(error)
    }
})
router.post('/recipes/delete', async (req,res,next)=>{
    try {
        const recipeId=req.body.recipeId
        console.log(recipeId)
        // console.log(difficulty)
        const getRecipe = await Recipes.findOneAndDelete({_id:recipeId})
        // console.log(getRecipe)
        res.status(200).json(getRecipe)
    } catch (error) {
        console.log('/recipes/saved (POST) ERROR: ', error)
        res.status(400).json(error)
    }
})

//PROFILE
router.post('/profile', async (req,res,next)=>{
    try {
        // console.log(req.body)
        // console.log(req.body.user.id)
        // console.log(req.body.id)
        const myId =req.body._id
        
        const getUser = await User.findById({_id:myId})

        // // console.log(req.params)
        // // console.log(difficulty)
        // const getRecipe = await Recipes.find({difficulty:difficulty}).populate('author')
        // console.log(getUser)
        res.status(200).json(getUser)
    } catch (error) {
        console.log('/profile (POST) ERROR: ', error)
        res.status(400).json(error)
    }
})
router.patch('/profile/update', async (req,res,next)=>{
    try {
        // console.log(req.body)
        // console.log(req.body.user.id)
        // console.log(req.body.id)
        const { profilePictureUrl, backgroundPictureUrl, email, _id } = req.body
        // const myId =req.body.id
        // console.log("usuario", req.body)
        const getUser = await User.findByIdAndUpdate(_id, {profilePictureUrl, backgroundPictureUrl, email}, {new:true})

        // // console.log(req.params)
        // // console.log(difficulty)
        // const getRecipe = await Recipes.find({difficulty:difficulty}).populate('author')
        // console.log(getUser)
        res.status(200).json(req.body)
    } catch (error) {
        console.log('/profile/update (POST) ERROR: ', error)
        res.status(400).json(error)
    }
})
router.post('/myRecipes', async (req,res,next)=>{
    try {
        // console.log("EN SERVER, Req.params.id:",req.params.id)
        // console.log(req.body.id)

        const myId =req.body.id
        const getRecipes = await Recipes.find({author:myId}).populate('author')
        // console.log("RECIPIE RESPONSE:",getRecipes)
        res.status(200).json(getRecipes)
    } catch (error) {
        console.log('/myRecipes (POST) ERROR: ', error)
        res.status(400).json(error)
    }
})

// SEARCH
router.get('/category/:category', async (req,res,next)=>{
    try {
        // console.log("EN SERVER, req.params.category:",req.params.category)
        const category =req.params.category
        // console.log("Filtered Category:", category)
        const getRecipe = await Recipes.find({category:category}).populate('author')
        // console.log("RECIPIE RESPONSE:",getRecipe)
        res.status(200).json(getRecipe)
    } catch (error) {
        console.log('/category/:category (GET) ERROR: ', error)
        res.status(400).json(error)
    }
})
router.get('/difficulty/:difficulty', async (req,res,next)=>{
    try {
        const difficulty =req.params.difficulty
        // console.log(req.params)
        // console.log(difficulty)
        const getRecipe = await Recipes.find({difficulty:difficulty}).populate('author')
        // console.log(getRecipe)
        res.status(200).json(getRecipe)
    } catch (error) {
        console.log('/difficulty/:difficulty (GET) ERROR: ', error)
        res.status(400).json(error)
    }
})

// FUNCTIONALITY
router.post('/like', async (req,res,next)=>{
    try {
        // console.log("---------  LIKE ROUTINE    ---------")
        // console.log(req.body)
        const {userId,recipeId} = req.body
        
        const currentUser = await User.findOne({_id:userId},'liked')
        const currentRecipe = await Recipes.findOne({_id:recipeId})

        // console.log("PREVIOUS LIKE STATE: ",currentUser.liked)
        // console.log("SELECTED RECIPE ID:  ", recipeId)
        // console.log("BOOLEAN IF LIKE IS INCLUDED:",currentUser.liked.includes(recipeId))
        if (currentUser.liked.includes(recipeId)){

            // console.log("Recipe Likes:",currentRecipe.popularity, "Do I Like That Already? ", currentUser.liked.includes(recipeId), " --> LETS DISLIKE")

            let index1 = currentUser.liked.indexOf(recipeId)
            let index2 = currentRecipe.liked.indexOf(userId)

            currentUser.liked.splice(index1,1)
            currentRecipe.liked.splice(index2,1)

            currentRecipe.popularity = currentRecipe.popularity - 1

            // console.log("Recipe Likes:",currentRecipe.popularity, "Do I Like That Already? ", currentUser.liked.includes(recipeId))

        } else {

            // console.log("Recipe Likes:",currentRecipe.popularity, "Do I Like That Already? ", currentUser.liked.includes(recipeId), " --> LETS LIKE")

            currentUser.liked.push(recipeId)
            currentRecipe.liked.push(userId)

            currentRecipe.popularity = currentRecipe.popularity + 1

            // console.log("Recipe Likes:",currentRecipe.popularity, "Do I Like That Already? ", currentUser.liked.includes(recipeId))

        }
        // console.log(currentRecipe)
        const savedUser = await User.findByIdAndUpdate({_id:userId},currentUser)
        const savedRecipe = await Recipes.findByIdAndUpdate({_id:recipeId},currentRecipe)
        // console.log(savedRecipe)

        res.status(200).json({savedUser:currentUser,savedRecipe:currentRecipe})
    } catch (error) {
        console.log('/like (POST) ERROR: ', error)
        res.status(400).json(error)
    }
})
router.post('/save', async (req,res,next)=>{
    try {
        // console.log("---------  SAVE ROUTINE    ---------")
        // console.log(req.body)
        const {userId,recipeId} = req.body
        
        const currentUser = await User.findOne({_id:userId},'saved')

        // console.log("PREVIOUS LIKE STATE: ",currentUser.liked)
        // console.log("SELECTED RECIPE ID:  ", recipeId)
        // console.log("BOOLEAN IF LIKE IS INCLUDED:",currentUser.liked.includes(recipeId))
        if (currentUser.saved.includes(recipeId)){

            // console.log("Recipe Likes:",currentRecipe.popularity, "Do I Like That Already? ", currentUser.liked.includes(recipeId), " --> LETS DISLIKE")

            let index1 = currentUser.saved.indexOf(recipeId)

            currentUser.saved.splice(index1,1)


            // console.log("Recipe Likes:",currentRecipe.popularity, "Do I Like That Already? ", currentUser.liked.includes(recipeId))

        } else {

            // console.log("Recipe Likes:",currentRecipe.popularity, "Do I Like That Already? ", currentUser.liked.includes(recipeId), " --> LETS LIKE")

            currentUser.saved.push(recipeId)


            // console.log("Recipe Likes:",currentRecipe.popularity, "Do I Like That Already? ", currentUser.liked.includes(recipeId))

        }
        // console.log(currentRecipe)
        const savedUser = await User.findByIdAndUpdate({_id:userId},currentUser)
        // const savedRecipe = await Recipes.findByIdAndUpdate({_id:recipeId},currentRecipe)
        // console.log(currentUser)

        res.status(200).json({currentUser})
    } catch (error) {
        console.log('/save (POST) ERROR: ', error)
        res.status(400).json(error)
    }
})


module.exports = router;