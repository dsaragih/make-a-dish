let users;
export default class usersDAO {
    static async injectDB(conn) {
        if (users) {
        return
        }
        try {
        users = await conn.db(process.env.MAKEADISH_NS).collection("users")
        } catch (e) {
        console.error(`Unable to establish collection handles in userDAO: ${e}`)
        }
    }
    static async getUsers(name) {
        let query = {
            "name": {$eq : name}
        }
        let search;
        try {
            search = users.find(query);
            const arr = await search.toArray();
            return { count: arr }
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { count: -1 }
        }
    }
    static async addUsers(name, id) {
        try {
            const usersDoc = { name: name,
                user_id: id,
            }
            return await users.insertOne(usersDoc)
            } catch (e) {
            console.error(`Unable to post item to recipe: ${e}`)
            return { error: e }
            }
    }
}