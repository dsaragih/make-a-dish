import recipeDAO from "../dao/userRecipeDAO.js"

export default class recipeController {
    static async apiGetRecipeList(req, res, next) {
        try {
            const name = req.query.name;

            const { recipeArray, totalRecipes } = await recipeDAO.getUserRecipes(name);

            if (!recipeArray) {
                res.status(404).json({ error: "Not found" })
                return
            }

            res.json({recipeArray: recipeArray, totalRecipes: totalRecipes})
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    }
    static async apiPostRecipe(req, res, next) {
        try {
        const title = req.body.title;
        const ingredients = req.body.ingredients;
        const instructions = req.body.instructions;
        const userInfo = {
            name: req.body.name,
            _id: req.body.user_id
        }
        const image = req.body.image
        const date = new Date()

        const reviewResponse = await recipeDAO.addItem(
            userInfo,
            title,
            date,
            ingredients,
            instructions,
            image
        )
        res.json({ status: "success" })
        } catch (e) {
        res.status(500).json({ error: e.message })
        }
    }

    static async apiUpdateRecipe(req, res, next) {
        try {
        const recipeId = req.body.recipe_id
        const userId = req.body.user_id
        const date = new Date()
        const title = req.body.title;
        const ingredients = req.body.ingredients;
        const instructions = req.body.instructions;
        const image = req.body.image;

        const reviewResponse = await recipeDAO.updateItem(
            recipeId,
            userId,
            title,
            date,
            ingredients,
            instructions,
            image
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