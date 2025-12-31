import axios from "axios";

const apiURL = axios.create({
    baseURL: "http://localhost:5000",
});

export default apiURL;
