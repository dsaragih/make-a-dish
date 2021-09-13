import axios from 'axios';

export default async function fetchData (url) {
    const res = await axios.get(url);
    const data = await res.data;

    return data;
}