resource "aws_iam_role_policy" "lambda-dynamodb-policy" {
  name = "srp-lambda-dynamodb-policy"
  role = aws_iam_role.lambda-dynamodb-role.id
  policy = "${file("./policies/ddb-policy.json")}"
}

resource "aws_iam_role" "lambda-dynamodb-role" {
  name = "srp-lambda-dynamodb-role"

  assume_role_policy = jsonencode({
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Service": "lambda.amazonaws.com"
            },
            "Action": "sts:AssumeRole"
        }
    ]
  })
}

resource "aws_iam_role_policy" "lambda-execution-policy" {
  name = "srp-lambda-execution-policy"
  role = aws_iam_role.lambda-execution-role.id
  policy = "${file("./policies/lambda-policy.json")}"
}

resource "aws_iam_role" "lambda-execution-role" {
  name = "srp-lambda-execution-role"

  assume_role_policy = jsonencode({
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Service": "lambda.amazonaws.com"
            },
            "Action": "sts:AssumeRole"
        }
    ]
  })
}

# Remember to add permissions for API Gateway lambda proxy integration
resource "aws_lambda_permission" "srp-create-user-integration" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.srp-create-user.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.srp-api.execution_arn}/*/POST/users/create"
}

resource "aws_lambda_permission" "srp-login-integration" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.srp-login.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.srp-api.execution_arn}/*/POST/users/login"
}
