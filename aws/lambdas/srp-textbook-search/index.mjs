import textbooks from "./textbooks.mjs";

export const handler = async (event) => {
    if (!event.queryStringParameters || event.queryStringParameters.search === undefined) {
        return apiResponse(400, { message: 'Missing search parameter' });
    }

    const query = event.queryStringParameters.search;
    const response = textbooks.filter((textbook) => {
        return textbook.title.toLowerCase().includes(query.toLowerCase());
    })

    return apiResponse(200, response);
}

const apiResponse = (statusCode, body) => {
    return {
        statusCode: statusCode,
        headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
        },
        body: JSON.stringify(body)
    };
}