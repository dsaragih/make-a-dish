import axios from 'axios';

export default axios.create({
    baseURL: "https://make-a-dish.herokuapp.com/",
    headers: {
        "Content-Type": "application/json"
    }
});