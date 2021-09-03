import axios from 'axios';

export default async function fetchData (url) {
    const res = await axios.get(url);
    const hits = await res.data['hits'];

    return hits;
}