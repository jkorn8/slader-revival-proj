import axios from "axios";
import Textbook from "../types/Textbook";

const API_URL = "https://i7q4t70bv6.execute-api.us-west-1.amazonaws.com/dev";

export const textbookSearch = async (query: string): Promise<Textbook[]> => {
    try {
        const response = await axios.get(`${API_URL}/textbook/search?search=${query}`);
        return response.data as Textbook[];
    }
    catch (err) {
        console.log(err);
        return [];
    }
}

export const textbookGet = async (textbookId: number): Promise<Textbook | undefined> => {
    try {
        const response = await axios.get(`${API_URL}/textbook/${textbookId}`);
        return response.data as Textbook;
    }
    catch (err) {
        console.log(err);
        return;
    }
}