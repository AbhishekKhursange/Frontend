import axios from "axios";

const apiURL = axios.create({
    baseURL: "https://cravings-backend-9c5w.onrender.com",
});

export default apiURL;
