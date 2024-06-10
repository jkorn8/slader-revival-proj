import jwt from 'jsonwebtoken';

export const handler = (event, context, callback) => {
  
  console.log(event);
  const token = event.authorizationToken;
  
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log("Decoded: " + JSON.stringify(decoded, null, 4));
    console.log("Decoded userid:", decoded['userId']);

    return callback(null, generatePolicy('user', "Allow", event.methodArn, decoded));
  }
  catch (error) {
    console.log(error);
    
    return callback(null, generatePolicy('user', 'Deny', event.methodArn));
  }
};

// function taken from AWS docs to generate the authorization response
const generatePolicy = (principalId, effect, resource, context = {}) => {
    var authResponse = {};
    
    authResponse.principalId = principalId;
    if (effect && resource) {
        var policyDocument = {};
        policyDocument.Version = '2012-10-17'; 
        policyDocument.Statement = [];
        var statementOne = {};
        statementOne.Action = 'execute-api:Invoke'; 
        statementOne.Effect = effect;
        statementOne.Resource = resource;
        policyDocument.Statement[0] = statementOne;
        authResponse.policyDocument = policyDocument;
    }
    
    
    // Optional output with custom properties of the String, Number or Boolean type.
    if ( context && Object.keys(context).length > 0)
      authResponse.context = context;

    console.log("AuthResponse:");
    console.log(authResponse);

    return authResponse;
};
