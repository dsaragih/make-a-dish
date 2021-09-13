import { ObjectId } from "mongodb";

let cart;

export default class CartDAO {
    static async injectDB(conn) {
        if (cart) {
        return
        }
        try {
        cart = await conn.db(process.env.MAKEADISH_NS).collection("cart")
        } catch (e) {
        console.error(`Unable to establish collection handles in userDAO: ${e}`)
        }
    }

    static async getCart(name) {
        let query = {
            "name": {$eq : name},
        }
        let search;
        try {
            search = cart.find(query);
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { cartArray: [], totalItems: 0}
        }

        try {
            const cartArray = await search.toArray();
            const totalItems = await cart.countDocuments(query);

            return { cartArray, totalItems }
        } catch (e) {
            console.error(`Unable to convert search to array or problem counting documents, ${e}`);
            return { cartArray: [], totalItems: 0}
        }
    }

    static async addItem(user, date, item, quantity) {
        try {
        const cartDoc = { name: user.name,
            user_id: user._id,
            date: date,
            item: item,
            quantity: quantity, }

        return await cart.insertOne(cartDoc)
        } catch (e) {
        console.error(`Unable to post item to cart: ${e}`)
        return { error: e }
        }
    }

    static async updateItem(cartId, userId, quantity, date) {
        try {
        const updateResponse = await cart.updateOne(
            { user_id: userId, _id: ObjectId(cartId)},
            { $set: { quantity: quantity, date: date  } }
        )

        return updateResponse
        } catch (e) {
        console.error(`Unable to update item: ${e}`)
        return { error: e }
        }
    }

    static async deleteItem(cartId, name) {

        try {
        console.log(cartId, name)
        const deleteResponse = await cart.deleteOne({
            _id: ObjectId(cartId),
            name: name,
        })
        console.log(deleteResponse)
        return deleteResponse
        } catch (e) {
        console.error(`Unable to delete item: ${e}`)
        return { error: e }
        }
    }

}