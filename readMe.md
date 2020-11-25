# Fit Meal

The app that allow you to create, discover and share recipes and meal plans to improve your eating habits.

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Signup:** As an anon I can sign up in the app so that I can start creating, sharing and discovering recipes and meal plans.
-  **Login:** As a user I can login to the app so that I can create, share and discover recipes and meal plans.
-  **Logout:** As a user I can logout from the ap so no one else can use it.
-  **Home:** As an anon I can see the main features of the app, some mock ups, and the Signup and Login links.
-  **Home:** As a user I can see a list of recipies and categories to explore.
-  **Recipes:**
    - **Home:** As a user I can see a list of the most popular recipes done by other users.
    - **Details:** As a user I can see a picture of the meal, de ingredients, the preparation process and the preparatin time, the dificulty level and Like and Save the recipe.
- **Profile:**
  As a user I can edit my email, profile picture and background picture. I can also log out.
  - **My Recipies:** As a user I can see and edit de recipies that I have created.
  - **Saved:** As a user I can see all the recipies and meal plans that I have saved from other users.

## Backlog

- Create, edit, like, saved and share weekly meal plans made by selecting preivously created recipes.
- Allow user to changes the password.
- Allow user to delete the account.
- Filter and sort search results.
- Show the total amount of daily/weekly calories of a meal or plan.
- Creat a shopping list based on the ingredients that appear in a meal plan.

<br><br>

# Client / Frontend (Pending)

## React Router Routes (React App)

| Path                      | Component            | Permissions                 | Behavior                                                     |
| ------------------------- | -------------------- | --------------------------- | ------------------------------------------------------------ |
| `/`                       | LandingPage          | public `<Route>`            | Landing Page                                                 |
| `/signup`                 | SignupPage           | anon only `<AnonRoute>`     | Signup form, link to login, navigate to homepage after signup|
| `/login`                  | LoginPage            | anon only `<AnonRoute>`     | Login form, link to signup, navigate to homepage after login |
| `/recipes`                | Recipes              | user only `<PrivateRoute>`  | Shows all recipes in a list                                  |
| `/addNewRecipe`           | AddNewRecipe         | user only `<PrivateRoute>`  | Form to creat a new recipe                                   |
| `/recipes/:id`            | RecipeDetails        | user only `<PrivateRoute>`  | Show recipe details                                           
| `/profile`                | Profile              | user only `<PrivateRoute>`  | Show user profile                                            |
| `/profile/savedRecipes`   | Profile              | user only `<PrivateRoute>`  | Show saved recipes by the current user                       |
| `/profile/edit`           | EditProfile          | user only `<PrivateRoute>`  | Allow to edit profile settings                               |
| `/search/:query`          | Search               | user only `<PrivateRoute>`  | Display search results                                       |
| `/editRecipe/:id`         | AddNewRecipe         | user only `<PrivateRoute>`  | Allow to edit a recipe                                       |



<br>

## Components and Pages

- Pages
  - Landing Page
  - Signup 
  - Login 
  - Search 
  - Recipes 
  - Recipe Details 
  - Add New Recipe 
  - Profile 
  - Edit Profile 
- Components
  - Anon Route
  - Private Route
  - Navbar
  - Navbar Mobile
  - Serach Bar
  - Search Recipes
  - Slider
  - Category Card
  - Card Recipe
  - Ingredient
  - Profile Edit Card


  

 <br>

## Services

- Auth Service
  - auth.signup(username, password, email)
  - auth.login(username, passwordd)
  - auth.logout()
  - auth.me()
- API Service
  - PROFILE
    - service.getUserInfo(userId)
    - service.getMyRecipes(userId)
    - service.getSavedsRecipes(userId)
    - service.updateUserProfile(user)
  - ACTIONS
    - service.like(userId,recipeId)
    - service.save(userId,recipeId)
  - RECIPES
    - service.getRecipes()
    - service.getRecipeDetails(recipeId)
    - service.updateRecipe(recipe)
  - CREATE RECIPE
    - service.handleUpload(theFile)
    - service.saveNewRecipe(newRecipe)
  -SEARCH
    - service.getRecipesByCategory(category)
    - service.getRecipesByDifficulty(difficulty)



<br><br>


# Server / Backend 


## Models
<br>
User model:

```javascript
  const userSchema = new Schema({
      username: {type: String, required: true, unique: true},
      email: {type: String, required: true, unique: true},
      password: {type: String, required: true},
      profilePictureUrl:{type: String,default:""},
      backgroundPictureUrl:{type:String,default:""},
      saved: [{type:Schema.Types.ObjectId, ref:'Recipe'}],
      liked: [{type:Schema.Types.ObjectId, ref:'Recipe'}],
      recipes: {type:Schema.Types.ObjectId, ref:'Recipe'},
      plans: {type:Schema.Types.ObjectId, ref:'Plans'},
  }, {
      timestamps: {
          createdAt: 'created_at',
          updatedAt: 'updated_at'
      },
  });
```
<br>

Recipes model:

```javascript
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
```
<br>

Meal Plan model:

```javascript
const recipeSchema = new Schema({
  title: {type: String, required: true},
  author: {type: Schema.Types.ObjectId, ref:'User', required: true},
  picture: {type: String},
  plan:{
    monday:{
      breakfast:{type:Schema.Types.ObjectId, ref:'Recipes'},
      brunch:{type:Schema.Types.ObjectId, ref:'Recipes'},
      lunch:{type:Schema.Types.ObjectId, ref:'Recipes'},
      snack:{type:Schema.Types.ObjectId, ref:'Recipes'},
      dinner:{type:Schema.Types.ObjectId, ref:'Recipes'}
      },
    tuesday:{
      breakfast:{type:Schema.Types.ObjectId, ref:'Recipes'},
      brunch:{type:Schema.Types.ObjectId, ref:'Recipes'},
      lunch:{type:Schema.Types.ObjectId, ref:'Recipes'},
      snack:{type:Schema.Types.ObjectId, ref:'Recipes'},
      dinner:{type:Schema.Types.ObjectId, ref:'Recipes'}
      },
    wednesday:{
      breakfast:{type:Schema.Types.ObjectId, ref:'Recipes'},
      brunch:{type:Schema.Types.ObjectId, ref:'Recipes'},
      lunch:{type:Schema.Types.ObjectId, ref:'Recipes'},
      snack:{type:Schema.Types.ObjectId, ref:'Recipes'},
      dinner:{type:Schema.Types.ObjectId, ref:'Recipes'}
      },
    thursday:{
      breakfast:{type:Schema.Types.ObjectId, ref:'Recipes'},
      brunch:{type:Schema.Types.ObjectId, ref:'Recipes'},
      lunch:{type:Schema.Types.ObjectId, ref:'Recipes'},
      snack:{type:Schema.Types.ObjectId, ref:'Recipes'},
      dinner:{type:Schema.Types.ObjectId, ref:'Recipes'}
      },
    friday:{
      breakfast:{type:Schema.Types.ObjectId, ref:'Recipes'},
      brunch:{type:Schema.Types.ObjectId, ref:'Recipes'},
      lunch:{type:Schema.Types.ObjectId, ref:'Recipes'},
      snack:{type:Schema.Types.ObjectId, ref:'Recipes'},
      dinner:{type:Schema.Types.ObjectId, ref:'Recipes'}
      },
    saturday:{
      breakfast:{type:Schema.Types.ObjectId, ref:'Recipes'},
      brunch:{type:Schema.Types.ObjectId, ref:'Recipes'},
      lunch:{type:Schema.Types.ObjectId, ref:'Recipes'},
      snack:{type:Schema.Types.ObjectId, ref:'Recipes'},
      dinner:{type:Schema.Types.ObjectId, ref:'Recipes'}
      },
    sunday:{
      breakfast:{type:Schema.Types.ObjectId, ref:'Recipes'},
      brunch:{type:Schema.Types.ObjectId, ref:'Recipes'},
      lunch:{type:Schema.Types.ObjectId, ref:'Recipes'},
      snack:{type:Schema.Types.ObjectId, ref:'Recipes'},
      dinner:{type:Schema.Types.ObjectId, ref:'Recipes'}
      }       
   }
});
```

<br><br>

## API Endpoints (backend routes)

<br>

| HTTP Method | URL                           | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | ----------------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| POST        | `/auth/signup`                | {username, email, password}  | 200            | 400          | Checks if fields user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`                 | {username, password}         | 200            | 401/404      | Checks if user exists (404), and if password matches (401), then stores user in session |
| POST        | `/auth/logout`                | (empty)                      | 204            |              | Logs out the user                                            |
| GET         | `/auth/me`                    | (empty)                      |                |              | Get the current user session                                 |
| GET         | `/recipes`                    |                              | 200            | 400          | Get all the recipes                                          |
| GET         | `/recipes/:id`                | {recipeId}                   | 200            | 400          | Get one recipe information                                   |
| POST        | `/recipes/create`             | {recipe}                     | 200            | 400          | Create and save a new recipe                                 |
| POST        | `/recipes/update`             | {recipe}                     | 200            | 400          | Edit a recipe                                                |
| POST        | `/recipes/saved`              | {userId}                     | 200            | 400          | Get all saved recipes by the current user                    |
| POST        | `/profile`                    | {userId}                     | 200            | 400          | Get a user information                                       |
| POST        | `/profile/update`             | {user}                       | 200            | 400          | Update user information                                      |
| POST        | `/myRecipes`                  | {userId}                     | 200            | 400          | Get recipes created by a user                                |
| GET         | `/category/:category`         | {category}                   | 200            | 400          | Get recipes from a given category                            |
| GET         | `/difficulty/:difficulty`     | {difficulty}                 | 200            | 400          | Get recipes from a given difficulty                          |
| POST        | `/like`                       | {userId,recipeId}            | 200            | 400          | Save recipe as the liked                                     |
| POST        | `/save`                       | {userId,recipeId}            | 200            | 400          | Save recipe as the saved                                     |



<br><br>


## Links

<br>

[Deploy](http://fitmeal-app.herokuapp.com/) - [Client repository](https://github.com/Estevemartin/fitmeal-client) - [Server repository](https://github.com/Estevemartin/fitmeal-server) - [Trello](https://trello.com/b/J9EbMXg1/fitmeal) - [Slides]()
