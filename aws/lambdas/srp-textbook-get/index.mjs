import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
    if (!event.pathParameters || !event.pathParameters.textbookId) {
        return apiResponse(400, { message: 'Missing textbookId parameter' });
    }

    const textbookId = event.pathParameters.textbookId;
    if (parseInt(textbookId).isNaN) {
        return apiResponse(404, { message: 'Textbook not found' });
    }

    const queryCommand = new QueryCommand({
        TableName: "srp-textbooks",
        KeyConditionExpression: "#t = :textbookId",
        ExpressionAttributeValues: {
            ":textbookId": textbookId,
        },
        ExpressionAttributeNames: {
            "#t": "textbookId",
        },
        ConsistentRead: true,
    });
    const response = await docClient.send(queryCommand);
    if (response.Items.length === 0) {
        return apiResponse(404, { message: `No textbooks with id ${textbookId} found` });
    }
    //const response = textbooks[parseInt(query)];
    return apiResponse(200, response.Items[0]);
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