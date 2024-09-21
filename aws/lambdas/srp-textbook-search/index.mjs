import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
    if (!event.queryStringParameters || event.queryStringParameters.search === undefined) {
        return apiResponse(400, { message: "Missing search parameter" });
    }

    const query = event.queryStringParameters.search;
    const getAnswersCommand = new ScanCommand({
        TableName: "srp-textbooks",
        ExpressionAttributeValues: {
            ":title": query,
        },
        ExpressionAttributeNames: {
            "#t": "title",
        },
        FilterExpression: "contains(#t, :title)",
        ProjectionExpression: 'title, authors, ISBNs, textbookId'
    });

    const response = await docClient.send(getAnswersCommand);

    // const response = textbooks.filter((textbook) => {
    //     return textbook.title.toLowerCase().includes(query.toLowerCase());
    // })

    return apiResponse(200, response.Items);
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