import axios from "axios";

const apiURL = axios.create({
    baseURL: "https://backend-j472.onrender.com",
});

export default apiURL;
