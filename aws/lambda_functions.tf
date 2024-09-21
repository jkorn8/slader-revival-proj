# Login Lambda function
data "archive_file" "srp-login-archive" {
  type        = "zip"
  source_file = "./lambdas/srp-login/index.mjs"
  output_path = "./outputs/srp-login.zip"
}

resource "aws_lambda_function" "srp-login" {
  filename      = "./outputs/srp-login.zip"
  function_name = "srp-login"
  role          = aws_iam_role.lambda-dynamodb-role.arn
  handler       = "index.handler"

  source_code_hash = data.archive_file.srp-login-archive.output_base64sha256
  
  environment {
    variables = {
      SECRET_KEY = "e5d46ec5a19736b2c0ade45a0bd7c92571a6cd302c121eeda880df243aa28d93"
    }
  }

  layers = [
    aws_lambda_layer_version.bcryptjs-layer.arn,
    aws_lambda_layer_version.jsonwebtoken-layer.arn
  ]
  runtime = "nodejs20.x"
  timeout = 10
}

# Create user lambda function
data "archive_file" "srp-create-user-archive" {
  type        = "zip"
  source_file = "./lambdas/srp-create-user/index.mjs"
  output_path = "./outputs/srp-create-user.zip"
}

resource "aws_lambda_function" "srp-create-user" {
  filename      = "./outputs/srp-create-user.zip"
  function_name = "srp-create-user"
  role          = aws_iam_role.lambda-dynamodb-role.arn
  handler       = "index.handler"

  source_code_hash = data.archive_file.srp-create-user-archive.output_base64sha256

  layers = [
    aws_lambda_layer_version.bcryptjs-layer.arn,
  ]
  runtime = "nodejs20.x"
  timeout = 10
}

# User authentication lambda function
data "archive_file" "srp-authorizer-archive" {
    type        = "zip"
    source_file = "./lambdas/srp-authorizer/index.mjs"
    output_path = "./outputs/srp-authorizer.zip"
}

resource "aws_lambda_function" "srp-authorizer" {
  filename      = "./outputs/srp-authorizer.zip"
  function_name = "srp-authorizer"
  role          = aws_iam_role.lambda-execution-role.arn
  handler       = "index.handler"

  source_code_hash = data.archive_file.srp-authorizer-archive.output_base64sha256

  environment {
    variables = {
      SECRET_KEY = "e5d46ec5a19736b2c0ade45a0bd7c92571a6cd302c121eeda880df243aa28d93"
    }
  }

  layers = [
    aws_lambda_layer_version.jsonwebtoken-layer.arn
  ]
  timeout = 3
  runtime = "nodejs20.x"
}

# Get answers lambda function (unprotected)
data "archive_file" "srp-get-answers-archive" {
    type        = "zip"
    source_file = "./lambdas/srp-get-answers/index.mjs"
    output_path = "./outputs/srp-get-answers.zip"
}

resource "aws_lambda_function" "srp-get-answers" {
  filename      = "./outputs/srp-get-answers.zip"
  function_name = "srp-get-answers"
  role          = aws_iam_role.lambda-dynamodb-role.arn
  handler       = "index.handler"

  source_code_hash = data.archive_file.srp-get-answers-archive.output_base64sha256
  runtime = "nodejs20.x"
}

# Post answer lambda function (protected)
data "archive_file" "srp-post-answer-archive" {
    type        = "zip"
    source_file = "./lambdas/srp-post-answer/index.mjs"
    output_path = "./outputs/srp-post-answer.zip"
}

resource "aws_lambda_function" "srp-post-answer" {
  filename      = "./outputs/srp-post-answer.zip"
  function_name = "srp-post-answer"
  role          = aws_iam_role.lambda-dynamodb-role.arn
  handler       = "index.handler"

  source_code_hash = data.archive_file.srp-post-answer-archive.output_base64sha256
  runtime = "nodejs20.x"
}

# Get textbooks lambda function (unprotected)
data "archive_file" "srp-textbook-get-archive" {
    type        = "zip"
    source_dir  = "./lambdas/srp-textbook-get"
    output_path = "./outputs/srp-textbook-get.zip"
}

resource "aws_lambda_function" "srp-textbook-get" {
  filename      = "./outputs/srp-textbook-get.zip"
  function_name = "srp-textbook-get"
  role          = aws_iam_role.lambda-dynamodb-role.arn
  handler       = "index.handler"

  source_code_hash = data.archive_file.srp-textbook-get-archive.output_base64sha256
  runtime = "nodejs20.x"
}


# Search for textbooks lambda function (unprotected)
data "archive_file" "srp-textbook-search-archive" {
    type        = "zip"
    source_dir  = "./lambdas/srp-textbook-search"
    output_path = "./outputs/srp-textbook-search.zip"
}

resource "aws_lambda_function" "srp-textbook-search" {
  filename      = "./outputs/srp-textbook-search.zip"
  function_name = "srp-textbook-search"
  role          = aws_iam_role.lambda-dynamodb-role.arn
  handler       = "index.handler"

  source_code_hash = data.archive_file.srp-textbook-search-archive.output_base64sha256
  runtime = "nodejs20.x"
}
