import axios from "axios";

const MyFetch = axios.create({
    baseURL: "http://localhost:5284/v1/",
    headers: {
        "Content-Type": "application/json",
    }
});

export default MyFetch;