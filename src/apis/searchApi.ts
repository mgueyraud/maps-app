import axios from "axios";

const searchApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params: {
        limit: 5,
        language: 'es',
        access_token: 'pk.eyJ1IjoibWd1ZXlyYXVkIiwiYSI6ImNsMWU3OGxndTBoMTIza24yMXV2N3E2OGcifQ.pn-G2RDb2BbDAvmiMwXfUQ'
    }
});

export default searchApi;