import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import bcryptjs from 'bcryptjs';
import { randomUUID } from 'crypto';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {

  // Parses the body of the request to retrieve the username, email, and password fields
  const { username, email, password } = JSON.parse(event.body);
  //const { username, email, password } = event.body;

  // The username, email, and password fields are required to create a user, so if they do not exist, the function errors
  if(!username || !email || !password) 
    return apiResponse(400, JSON.stringify('Missing required fields'));

  // Usernames should never include an '@' symbol, as they are used to distinguish between usernames and emails
  if(username.includes('@')) 
    return apiResponse(400, JSON.stringify('Username cannot contain @ symbol'));
  
  // Check if the email or username already exist in the database
  const getUserCommand = new ScanCommand({
    TableName: 'srp-users',
    FilterExpression: '#field = :em OR #field2 = :username',
    ExpressionAttributeNames: {
      '#field': "email",
      "#field2": "username"
    },
    ExpressionAttributeValues: {
      ':em': email,
      ':username': username
    }
  });
  
  const responseUser = await docClient.send(getUserCommand);
  console.log('Response from DynamoDB', responseUser);
  
  // Checks to make sure the scan was successful
  if(responseUser.$metadata.httpStatusCode !== 200)
    {
      console.log(`DB Scan Failed with the following data: ${username, email}`);
      return apiResponse(500, JSON.stringify('Error creating user'));
    }

  // Makes sure the user does not already exist
  if(responseUser['Count'] !== 0)
    return apiResponse(409, JSON.stringify('User already exists'));
  
  // Begins the process of creating a new user by creating a unique userId and hashing the password
  const userId = randomUUID();
  const hashedpassword = await bcryptjs.hash(password, 10); 
  console.log(hashedpassword);

  const user = {
      "userId": userId,
      "username": username,
      "email": email,
      "password": hashedpassword,
  };
  
  // Posts the user to the database
  const createUserCommand = new PutCommand({
    TableName: 'srp-users',
    Item: user
  });

  const response = await docClient.send(createUserCommand);
  
  if (response.$metadata.httpStatusCode != 200) 
    return apiResponse(500, JSON.stringify('Error creating user'));
  
  return apiResponse(200, JSON.stringify(`User ${username} created successfully`));
};

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