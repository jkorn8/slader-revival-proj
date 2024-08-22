import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from 'crypto';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
    if (!event.body) {
        return apiResponse(400, 'Missing request body');
    }

    const { textbookId, chapter, section, question, solution } = JSON.parse(event.body);
    // const { textbookId, chapter, section, question, solution } = event.body;
    const userId = event.requestContext.authorizer.userId;
    const userName = event.requestContext.authorizer.username;

    if (!textbookId || !chapter || !section || !question || !solution)
        return apiResponse(400, 'Missing required fields in body');

    if (!userId || !userName)
        return apiResponse(400, 'Missing token in request context');

    const answer_object = {
        answerId: randomUUID(),
        textbookId: textbookId,
        chapter: chapter.toString(),
        section: section.toString(),
        question: question.toString(),
        solution: solution,
        userId: userId,
        userName: userName,
        timeCreated: Date.now(),
        ratings: []
    }

    const putAnswerCommand = new PutCommand({
        TableName: "srp-answers",
        Item: answer_object
    });

    const response = await docClient.send(putAnswerCommand);

    if (response.$metadata.httpStatusCode !== 200)
        return apiResponse(400, "Failed to add answer to database");

    return apiResponse(200, answer_object);
};

const apiResponse = (statusCode, message) => {
    return {
        statusCode: statusCode,
        headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
        },
        body: JSON.stringify(message),
    };
}