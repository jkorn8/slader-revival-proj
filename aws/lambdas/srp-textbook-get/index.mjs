import textbooks from "./textbooks.mjs";

export const handler = async (event) => {
    if (!event.pathParameters || !event.pathParameters.textbookId) {
        return apiResponse(400, { message: 'Missing textbookId parameter' });
    }

    const query = event.pathParameters.textbookId;
    if (parseInt(query).isNaN || !textbooks[parseInt(query)]) {
        return apiResponse(404, { message: 'Textbook not found' });
    }

    const response = textbooks[parseInt(query)];
    return apiResponse(200, response);
}

const apiResponse = (statusCode, body) => {
    return {
        statusCode: statusCode,
        headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
        },
        body: JSON.stringify(body)
    };
}