import { ObjectId } from "mongodb";

let recipe;

export default class recipeDAO {
    static async injectDB(conn) {
        if (recipe) {
        return
        }
        try {
        recipe = await conn.db(process.env.MAKEADISH_NS).collection("user_recipes")
        } catch (e) {
        console.error(`Unable to establish collection handles in userDAO: ${e}`)
        }
    }

    static async getUserRecipes(name) {
        let query = {
            "name": {$eq : name},
        }
        let search;
        try {
            search = recipe.find(query);
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { recipeArray: [], totalRecipes: 0}
        }

        try {
            const recipeArray = await search.toArray();
            const totalRecipes = await recipe.countDocuments(query);

            return { recipeArray, totalRecipes }
        } catch (e) {
            console.error(`Unable to convert search to array or problem counting documents, ${e}`);
            return { recipeArray: [], totalRecipes: 0}
        }
    }

    static async addItem(user, title, date, ingredients, instructions, image) {
        try {
        const recipeDoc = { name: user.name,
            user_id: user._id,
            title: title,
            date: date,
            ingredients: ingredients,
            instructions: instructions,
            image: image
        }

        return await recipe.insertOne(recipeDoc)
        } catch (e) {
        console.error(`Unable to post item to recipe: ${e}`)
        return { error: e }
        }
    }

    static async updateItem(recipeId, userId, title, date, ingredients, instructions, image) {
        try {
        const updateResponse = await recipe.updateOne(
            { user_id: userId, _id: ObjectId(recipeId)},
            { $set: { 
                title: title, 
                date: date,
                ingredients: ingredients,
                instructions: instructions,
                image: image
            } }
        )
        console.log(updateResponse)

        return updateResponse
        } catch (e) {
        console.error(`Unable to update recipe: ${e}`)
        return { error: e }
        }
    }

    static async deleteItem(recipeId, userId) {

        try {
        const deleteResponse = await recipe.deleteOne({
            _id: ObjectId(recipeId),
            user_id: userId
        })

        return deleteResponse
        } catch (e) {
        console.error(`Unable to delete recipe: ${e}`)
        return { error: e }
        }
    }

}