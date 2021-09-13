import usersDAO from "../dao/usersDAO.js";

export default class UsersController {
    static async apiGetUsers(req, res, next) {
        try {
            const name = req.query.name;

            const { count } = await usersDAO.getUsers(name);

            if (count === -1) {
                res.status(404).json({ error: "Not found" })
                return
            }

            res.json({count: count})
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    }
    static async apiPostUser(req, res, next) {
        try {
        const name = req.body.name;
        const id = req.body.user_id;

        const reviewResponse = await usersDAO.addUsers(
            name,
            id
        )
        res.json({ status: "success" })
        } catch (e) {
        res.status(500).json({ error: e.message })
        }
    }

}