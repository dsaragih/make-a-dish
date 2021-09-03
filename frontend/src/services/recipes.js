const baseUrl = process.env.REACT_APP_URL;

class DataServiceAppend {
    currentUrl = baseUrl;
    
    getFood(food) {
        food = encodeURI(food.toLowerCase())
        if (this.currentUrl.match(/q=([^&]*)/)) {
            this.currentUrl = this.currentUrl.replace(/q=([^&]*)/, `q=${food}`);
        } else if (!food) {
            this.currentUrl = this.currentUrl.replace(/&q=([^&]*)/, '');
        } else {
            this.currentUrl += `&q=${food}`;
        }
        return this.currentUrl;
    }

    getCuisine(cuisine) {
        cuisine = encodeURI(cuisine.toLowerCase())
        if (this.currentUrl.match(/cuisineType=([^&]*)/)) {
            this.currentUrl = this.currentUrl.replace(/cuisineType=([^&]*)/, `cuisineType=${cuisine}`);
        } else if (!cuisine) {
            this.currentUrl = this.currentUrl.replace(/&cuisineType=([^&]*)/, '');
        } else {
            this.currentUrl += `&cuisineType=${cuisine}`;
        }
        return this.currentUrl;
    }
    
    getDishType(dishType) {
        dishType = encodeURI(dishType.toLowerCase())
        if (this.currentUrl.match(/dishType=([^&]*)/)) {
            this.currentUrl = this.currentUrl.replace(/dishType=([^&]*)/, `dishType=${dishType}`);
        } else if (!dishType) {
            this.currentUrl = this.currentUrl.replace(/&dishType=([^&]*)/, '');
        } else {
            this.currentUrl += `&dishType=${dishType}`;
        }
        return this.currentUrl;
    }

    getMealType(mealType) {
        mealType = encodeURI(mealType.toLowerCase())
        if (this.currentUrl.match(/mealType=([^&]*)/)) {
            this.currentUrl = this.currentUrl.replace(/mealType=([^&]*)/, `mealType=${mealType}`);
        } else if (!mealType) {
            this.currentUrl = this.currentUrl.replace(/&mealType=([^&]*)/, '');
        } else {
            this.currentUrl += `&mealType=${mealType}`;
        }
        return this.currentUrl;
    }

    getDiet(diet) {
        diet = encodeURI(diet.toLowerCase().replaceAll(' ', '-'))
        if (this.currentUrl.match(/diet=([^&]*)/)) {
            this.currentUrl = this.currentUrl.replace(/diet=([^&]*)/, `diet=${diet}`);
        } else if (!diet) {
            this.currentUrl = this.currentUrl.replace(/&diet=([^&]*)/, '');
        } else {
            this.currentUrl += `&diet=${diet}`;
        }        
        return this.currentUrl;
    }

    getHealth(health) {
        health = encodeURI(health.toLowerCase().replaceAll(' ', '-'));
        if (this.currentUrl.match(/health=([^&]*)/)) {
            this.currentUrl = this.currentUrl.replace(/health=([^&]*)/, `health=${health}`);
        } else if (!health) {
            this.currentUrl = this.currentUrl.replace(/&health=([^&]*)/, '');
        } else {
            this.currentUrl += `&health=${health}`;
        }        
        return this.currentUrl;
    }
}

export default new DataServiceAppend();