import axios from 'axios';

const BASE_URL = "http://10.91.208.37";
const PORT = ":3001";

const petPalMockApi = axios.create({ baseURL: BASE_URL + PORT })

export default petPalMockApi;