# Fit Meal

The app that allow you to create, discover and share recipes and meal plans to improve your eating habits.

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Signup:** As an anon I can sign up in the app so that I can start creating, sharing and discovering recipes and meal plans.
-  **Login:** As a user I can login to the app so that I can create, share and discover recipes and meal plans.
-  **Logout:** As a user I can logout from the ap so no one else can use it.
-  **Home:** As an anon I can see the main features of the app, some mock ups, and the Signup and Login links.
-  **Home:** As a user I can see a list of recipies and categories to explore.
-  **Plans:**
      - **Home:** As a user I can see a list of plans made by other users.
      - **Details:** As a user I can see the meals planned for each week day.
- **Recipes:**
      - **Home:** As a user I can see a list of the most popular recipes done by other users.
      - **Details:** As a user I can see a picture of the meal, de ingredients, the preparation process and the needed time, the dificulty level and Like and Save the recipe.
- **Profile:**
  As a user I can edit my name, email, password, profile pictures and background picture. I can also log out, or delete my account.
      - **My Recipies:** As a user I can see and edit de recipies that I have created.
      - **My Plans:** As a user I can see and edit the meal plans that I have created.
      - **Saved:** As a user I can see all the recipies and meal plans that I have saved from other users.


## Backlog

User profile:
- Search, sort and filter recipes and meal plans by:
    - Words present in the meal description.
    - Ingredients.
    - Preparation Time.
    - Dificulty Level.
- Show the total amount of calories of a meal or a plan.
- Creat a shoppint list based on the ingredients and quantities that appear in a meal plan.


# Client / Frontend (Pending)

## React Router Routes (React App)
| Path                      | Component            | Permissions                 | Behavior                                                     |
| ------------------------- | -------------------- | --------------------------- | ------------------------------------------------------------ |
| `/`                       | SplashPage           | public `<Route>`            | Home page                                                    |
| `/signup`                 | SignupPage           | anon only  `<AnonRoute>`    | Signup form, link to login, navigate to homepage after signup |
| `/login`                  | LoginPage            | anon only `<AnonRoute>`     | Login form, link to signup, navigate to homepage after login |
| `/tournaments`            | TournamentListPage   | user only `<PrivateRoute>`  | Shows all tournaments in a list                              |
| `/tournaments/add`        | TournamentListPage   | user only `<PrivateRoute>`  | Edits a tournament                                           |
| `/tournaments/:id`        | TournamentDetailPage | user only `<PrivateRoute>`  | Details of a tournament to edit                              |
| `/tournament/:id`         | n/a                  | user only `<PrivateRoute>`  | Delete tournament                                            |
| `/tournament/players`     | PlayersListPage      | user only  `<PrivateRoute>` | List of players of a tournament                              |
| `/tournament/players/add` | PlayersListPage      | user only `<PrivateRoute>`  | Add a player to the tournament                               |
| `/tournament/players/:id` | PlayersDetailPage    | user only `<PrivateRoute>`  | Edit player for tournament                                   |
| `/tournament/players/:id` | PlayersListPage      | user only  `<PrivateRoute>` | Delete player from tournament                                |
| `/tournament/tableview`   | TableView            | user only  `<PrivateRoute>` | Games view and brackets                                      |
| `/tournament/ranks`       | RanksPage            | user only `<PrivateRoute>`  | Ranks list                                                   |
| `/tournament/game`        | GameDetailPage       | user only `<PrivateRoute>`  | Game details                                                 |




## Components (Pending)

- LoginPage

- SplashPage

- TournamentListPage

- Tournament Cell

- TournamentDetailPage

- TableViewPage

- PlayersListPage

- PlayerDetailPage

- RanksPage

- TournamentDetailPageOutput

- Navbar


  

 

## Services (Pending)

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser() // synchronous
- Tournament Service
  - tournament.list()
  - tournament.detail(id)
  - tournament.add(id)
  - tournament.delete(id)
  
- Player Service 

  - player.detail(id)
  - player.add(id)
  - player.delete(id)

- Game Service

  - Game.put(id)



<br>


# Server / Backend 


## Models

User model

```javascript
{
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  profilePictureUrl:{type: String},
  backgroundPictureUrl:{type:String},
  saved: {type:Schema.Types.ObjectId, ref:'Recipes',type:Schema.Types.ObjectId, ref:'Plans', default:[]},
  recipes: {type:Schema.Types.ObjectId, ref:'Recipes', default:[]},
  plans: {type:Schema.Types.ObjectId, ref:'Plans', default:[]},

}
```



Recipes model

```javascript
 {
   title: {type: String, required: true},
   author: {type: Schema.Types.ObjectId, ref:'User', required: true},
   picture: {type: String},
   ingredientsText: {type: String, required:true},
   preparation: {type: String, required:true},
   preparationTime: {typee: String, required: true},
   dificultyLevel: {type:String, required:true}
 }
```



Meal Plan model

```javascript
{
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
}
```


<br>


## API Endpoints (backend routes) (Pending)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/profile    `           | Saved session                | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | `/auth/signup`                | {name, email, password}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`                 | {username, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/auth/logout`                | (empty)                      | 204            | 400          | Logs out the user                                            |
| GET         | `/tournaments`                |                              |                | 400          | Show all tournaments                                         |
| GET         | `/tournaments/:id`            | {id}                         |                |              | Show specific tournament                                     |
| POST        | `/tournaments/add-tournament` | {}                           | 201            | 400          | Create and save a new tournament                             |
| PUT         | `/tournaments/edit/:id`       | {name,img,players}           | 200            | 400          | edit tournament                                              |
| DELETE      | `/tournaments/delete/:id`     | {id}                         | 201            | 400          | delete tournament                                            |
| GET         | `/players`                    |                              |                | 400          | show players                                                 |
| GET         | `/players/:id`                | {id}                         |                |              | show specific player                                         |
| POST        | `/players/add-player`         | {name,img,tournamentId}      | 200            | 404          | add player                                                   |
| PUT         | `/players/edit/:id`           | {name,img}                   | 201            | 400          | edit player                                                  |
| DELETE      | `/players/delete/:id`         | {id}                         | 200            | 400          | delete player                                                |
| GET         | `/games`                      | {}                           | 201            | 400          | show games                                                   |
| GET         | `/games/:id`                  | {id,tournamentId}            |                |              | show specific game                                           |
| POST        | `/games/add-game`             | {player1,player2,winner,img} |                |              | add game                                                     |
| POST        | `/games/add-all-games`        |                              |                |              | add all games from a tournament. Gets a list of players and populates them via algorithm. |
| PUT         | `/games/edit/:id`             | {winner,score}               |                |              | edit game                                                    |


<br>


## Links

[Trello](https://trello.com/b/J9EbMXg1/fitmeal) 

[Client repository](https://github.com/Estevemartin/fitmeal-client)

[Server repository](https://github.com/Estevemartin/fitmeal-server)

[Deploy]()

[Slides]()
