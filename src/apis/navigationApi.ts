import axios from "axios";

const directionsApi = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
    params: {
        alternatives:false,
        geometries: 'geojson',
        overview: 'simplified',
        steps: false,
        access_token: 'pk.eyJ1IjoibWd1ZXlyYXVkIiwiYSI6ImNsMWU3OGxndTBoMTIza24yMXV2N3E2OGcifQ.pn-G2RDb2BbDAvmiMwXfUQ'
    }
});

export default directionsApi;