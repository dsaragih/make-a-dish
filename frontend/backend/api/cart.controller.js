import CartDAO from "../dao/cartDAO.js"

export default class CartController {
    static async apiGetCart(req, res, next) {
        try {
            console.log(req.params)
            const name = req.query.name;

            const { cartArray, totalItems } = await CartDAO.getCart(name);
            // if (!cartArray) {
            //     res.status(404).json({ error: "Not found" })
            //     return
            // }

            res.json({cartArray: cartArray, itemsInCart: totalItems})

        } catch (e) {
            res.status(500).json({error: e.message})
        }
    }

    static async apiPostItem(req, res, next) {
        try {
        const item = req.body.item
        const userInfo = {
            name: req.body.name,
            _id: req.body.user_id
        }
        const quantity = req.body.quantity;
        const date = new Date()

        const ReviewResponse = await CartDAO.addItem(
            userInfo,
            date,
            item,
            quantity
        )
        res.json({ status: "success" })
        } catch (e) {
        res.status(500).json({ error: e.message })
        }
    }

    static async apiUpdateItem(req, res, next) {
        try {
        const cartId = req.body.cart_id
        const quantity = req.body.quantity
        const date = new Date()

        const reviewResponse = await CartDAO.updateItem(
            cartId,
            req.body.user_id,
            quantity,
            date
        )

        let { error } = reviewResponse
        if (error) {
            res.status(400).json({ error })
        }

        if (reviewResponse.modifiedCount === 0) {
            throw new Error(
            "unable to update cart - user may not be original poster",
            )
        }

        res.json({ status: "success" })
        } catch (e) {
        res.status(500).json({ error: e.message })
        }
    }

    static async apiDeleteItem(req, res, next) {
        try {
        const name = req.query.name
        const cartId = req.body.cart_id

        const reviewResponse = await CartDAO.deleteItem(
            cartId,
            name
        )
        res.json({ status: "success" })
        } catch (e) {
        res.status(500).json({ error: e.message })
        }
    }

}