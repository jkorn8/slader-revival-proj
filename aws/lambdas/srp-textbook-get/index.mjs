import textbooks from "./textbooks.mjs";

export const handler = async (event) => {
    if (!event.queryStringParameters || !event.queryStringParameters.search) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Missing search parameter' }),
        }
    }

    const query = event.queryStringParameters.search;
    const response = textbooks.filter((textbook) => {
        return textbook.name.toLowerCase().includes(query.toLowerCase());
    })

    return {
        statusCode: 200,
        body: JSON.stringify(response),
    }
}