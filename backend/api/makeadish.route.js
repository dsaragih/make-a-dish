import express from "express"
import CartController from "./cart.controller.js"
import recipeController from "./recipe.controller.js"
import UsersController from "./users.controller.js"

const router = express.Router()

router
  .route("/recipe")
  .get(recipeController.apiGetRecipeList)
  .post(recipeController.apiPostRecipe)
  .put(recipeController.apiUpdateRecipe)
  .delete(recipeController.apiDeleteRecipe)

router
  .route("/cart")
  .get(CartController.apiGetCart)
  .post(CartController.apiPostItem)
  .put(CartController.apiUpdateItem)
  .delete(CartController.apiDeleteItem)

router
  .route("/login")
  .get(UsersController.apiGetUsers)
  .post(UsersController.apiPostUser)

export default router