import recipeDAO from "../dao/userRecipeDAO.js"

export default class recipeController {
    static async apiGetRecipeList(req, res, next) {
        try {
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            } 
            const { recipeArray, totalRecipes } = await recipeDAO.getUserRecipes(userInfo);

            if (!recipeArray) {
                res.status(404).json({ error: "Not found" })
                return
            }

            res.json({recipes: recipeArray, totalUserRecipes: totalRecipes})
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    }
    static async apiPostRecipe(req, res, next) {
        try {
        const recipe = req.body.recipe
        const userInfo = {
            name: req.body.name,
            _id: req.body.user_id
        }
        const date = new Date()

        const reviewResponse = await recipeDAO.addItem(
            userInfo,
            date,
            recipe, 
        )
        res.json({ status: "success" })
        } catch (e) {
        res.status(500).json({ error: e.message })
        }
    }

    static async apiUpdateRecipe(req, res, next) {
        try {
        const recipeId = req.body.recipe_id
        const recipe = req.body.recipe
        const userId = req.body.user_id
        const date = new Date()
        const reviewResponse = await recipeDAO.updateItem(
            recipeId,
            userId,
            recipe,
            date,
        )

        let { error } = reviewResponse
        if (error) {
            res.status(400).json({ error })
        }

        if (reviewResponse.modifiedCount === 0) {
            throw new Error(
            "unable to update recipe - user may not be original poster",
            )
        }

        res.json({ status: "success" })
        } catch (e) {
        res.status(500).json({ error: e.message })
        }
    }

    static async apiDeleteRecipe(req, res, next) {
        try {
        const recipeId = req.query.recipe_id
        const userId = req.body.user_id

        const reviewResponse = await recipeDAO.deleteItem(
            recipeId,
            userId,
        )
        res.json({ status: "success" })
        } catch (e) {
        res.status(500).json({ error: e.message })
        }
    }

}