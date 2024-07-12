import axios from "axios";

const API_URL = "https://i7q4t70bv6.execute-api.us-west-1.amazonaws.com/dev";

export const test = async () => {
    return axios.get(`${API_URL}`);
}