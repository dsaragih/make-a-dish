import http from '../http-db';

class UserDataService {

    getRecipes(data) {
        return http.get('/recipe', data);
    }
    createRecipe(data) {
        return http.post('/recipe', data)
    }
    updateRecipe(data) {
        return http.put('/recipe', data)
    }
    deleteRecipe(id, userId) {
        return http.delete(`/recipe?id=${id}`, {data: {user_id: userId}})
    }


    getCart(name) {
        return http.get(`/cart?name=${name}`);
    }
    createCart(data) {
        return http.post('/cart', data)
    }
    updateCart(data) {
        return http.put('/cart', data)
    }
    deleteCart(cart_id, name) {
        return http.delete(`/cart?name=${name}`, {data: {cart_id: cart_id}})
    }

}

export default new UserDataService();