import axios from "axios";

const BASE_URL = "https://dog.ceo";
const getDogApi = axios.create({ baseURL: BASE_URL });

export default getDogApi;
