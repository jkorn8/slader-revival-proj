import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  
  //const body = JSON.parse(event.body);
  const body = event.body;

  // Retrieves the id and password fields from the request body if they exist. Then checks if they are empty.
  const id = body?.id;
  const password = body?.password;
  
  if(!id) return response(404, "Please enter a username or email");
  if(!password) return response(404, "Please enter a password");

  // Checks if the id is an email or username
  const usingEmail = id.includes('@');

  // Queries the table by the email or username to recieve the hashed password
  const getUserCommand = new ScanCommand({
    TableName: 'srp-users',
    FilterExpression: '#field = :value',
    ExpressionAttributeNames: {
      '#field': usingEmail ? "email" : "username"
    },
    ExpressionAttributeValues: {
      ':value': id
    }
  });
    
  const users = await docClient.send(getUserCommand);
  console.log(users);

  if(!users["Count"])
    return response(404, "User does not exist");
      
  const responseUser = users['Items'][0];

  //console.log("Response User: " + responseUser);
  
  // Creates the payload of the JWT to be signed
  const payload = {
      userId: responseUser.userId,
      username: responseUser.username,
      email: responseUser.email,
      password: responseUser.password,
  };

  // Checks to see if the password entered matches the hashed password in the database
  const isMatch = await bcryptjs.compare(password, payload.password);
  if(!isMatch) return response(401, "Invalid credentials");

  // Signs the JWT with the payload and the secret key, then returns it
  const token = jsonwebtoken.sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' });
  
  return response(200, JSON.stringify({
    message: `User ${payload.username} is logged in`,
    token: token
  }));
};

const response = (statusCode, body) => {
  return {
    statusCode: statusCode,
    body: body
  };
};

