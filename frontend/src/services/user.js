import http from '../http-db';

class UserDataService {

    getRecipes(name) {
        return http.get(`/recipe?name=${name}`);
    }
    createRecipe(data) {
        return http.post('/recipe', data)
    }
    updateRecipe(data) {
        return http.put('/recipe', data)
    }
    deleteRecipe(recipe_id, name) {
        return http.delete(`/recipe?name=${name}`, {data: {recipe_id: recipe_id}})
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