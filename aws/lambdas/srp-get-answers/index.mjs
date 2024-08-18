import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
    console.log(event);
    if (
            !event.queryStringParameters || 
            !event.queryStringParameters.textbookId || 
            !event.queryStringParameters.chapter || 
            !event.queryStringParameters.section || 
            !event.queryStringParameters.question
        ) {
        return apiResponse(400, "Missing required query string parameters")
    }
    const { textbookId, chapter, section, question } = event.queryStringParameters;

    const getAnswersCommand = new QueryCommand({
        TableName: "srp-answers",
        KeyConditionExpression: "#t = :textbookId",
        ExpressionAttributeValues: {
            ":textbookId": textbookId,
        },
        ExpressionAttributeNames: {
            "#t": "textbookId",
        },
        ConsistentRead: true,
    });

    const response = await docClient.send(getAnswersCommand);
    console.log(response);

    if (response.$metadata.httpStatusCode !== 200) {
        return apiResponse(400, "Failed to get answers from database");
    }

    const answers = response.Items.filter((answer) => {
        return answer.chapter === chapter && answer.section === section && answer.question === question;
    });

    if (answers.length === 0) {
        return apiResponse(404, "No answers found");
    }

    return apiResponse(200, answers);
}

const apiResponse = (statusCode, message) => {
    return {
        statusCode: statusCode,
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
        },
        body: JSON.stringify(message),
    };
}