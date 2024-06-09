data "archive_file" "srp-login-archive" {
  type        = "zip"
  source_file = "./lambdas/srp-login/index.mjs"
  output_path = "./outputs/srp-login.zip"
}

resource "aws_lambda_function" "login-lambda" {
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

data "archive_file" "srp-create-user-archive" {
  type        = "zip"
  source_file = "./lambdas/srp-create-user/index.mjs"
  output_path = "./outputs/srp-create-user.zip"
}

resource "aws_lambda_function" "create-user-lambda" {
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
