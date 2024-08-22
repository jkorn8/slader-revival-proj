import axios from "axios";
import Textbook from "../types/Textbook";
import Solution from "../types/Solution";

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

export const textbookGet = async (textbookId: string): Promise<Textbook | undefined> => {
    try {
        const response = await axios.get(`${API_URL}/textbook/${textbookId}`);
        return response.data as Textbook;
    }
    catch (err) {
        console.log(err);
        return;
    }
}

export const solutionGet = async (
    textbookId: string, 
    chapter: string | number, 
    section: string | number, 
    question: string | number
): Promise<Solution[]> => {
    try {
        const response = await axios.get(`https://i7q4t70bv6.execute-api.us-west-1.amazonaws.com/dev/answers?textbookId=${textbookId}&chapter=${chapter}&section=${section}&question=${question}`);
        return response.data as Solution[];
    }
    catch (err) {
        console.log(err);
        return [];
    }
}

// TODO: please make naming consistent and change all "answers" to "solutions"
export const solutionPost = async (
    textbookId: string, 
    chapter: string | number,
    section: string | number, 
    question: string | number,
    solution: string
): Promise<boolean> => {
    try {
        await axios.post(`${API_URL}/answers`, {
            textbookId,
            chapter,
            section,
            question,
            solution,
        });
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }

}