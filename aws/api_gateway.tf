resource "aws_api_gateway_rest_api" "srp-api" {
  name        = "srp-api"
  description = "This is the API for the slader revival project"
  endpoint_configuration {
   types = ["REGIONAL"]
  }
}

# Create the Authorizer for API calls
resource "aws_api_gateway_authorizer" "srp-authorizer" {
  name                   = "srp-authorizer"
  type                   = "TOKEN"
  rest_api_id            = aws_api_gateway_rest_api.srp-api.id
  identity_source        = "method.request.header.Authorization"
  authorizer_uri         = aws_lambda_function.srp-authorizer.invoke_arn
  authorizer_result_ttl_in_seconds = 0
}

# Create the API key for API calls
resource "aws_api_gateway_api_key" "srp-api-key" {
  name  = "srp-api-key"
}

resource "aws_api_gateway_usage_plan" "srp-usage-plan" {
  name         = "srp-usage-plan"
  api_stages {
    api_id = aws_api_gateway_rest_api.srp-api.id
    stage  = aws_api_gateway_stage.srp-dev-stage.stage_name
  }
}

resource "aws_api_gateway_usage_plan_key" "srp-usage-plan-key" {
  key_id        = aws_api_gateway_api_key.srp-api-key.id
  key_type      = "API_KEY"
  usage_plan_id = aws_api_gateway_usage_plan.srp-usage-plan.id
}

# Create the users resource
resource "aws_api_gateway_resource" "users" {
  parent_id   = aws_api_gateway_rest_api.srp-api.root_resource_id
  path_part   = "users"
  rest_api_id = aws_api_gateway_rest_api.srp-api.id
}

resource "aws_api_gateway_resource" "users-login" {
  parent_id   = aws_api_gateway_resource.users.id
  path_part   = "login"
  rest_api_id = aws_api_gateway_rest_api.srp-api.id
}

resource "aws_api_gateway_resource" "users-create" {
  parent_id   = aws_api_gateway_resource.users.id
  path_part   = "create"
  rest_api_id = aws_api_gateway_rest_api.srp-api.id
}

resource "aws_api_gateway_method" "create-user-post" {
  authorization    = "NONE"
  http_method      = "POST"
  resource_id      = aws_api_gateway_resource.users-create.id
  rest_api_id      = aws_api_gateway_rest_api.srp-api.id
  api_key_required = true
}

resource "aws_api_gateway_method" "login-user-post" {
  authorization    = "NONE"
  http_method      = "POST"
  resource_id      = aws_api_gateway_resource.users-login.id
  rest_api_id      = aws_api_gateway_rest_api.srp-api.id
  api_key_required = true
}

resource "aws_api_gateway_integration" "create-user-integration" {
  rest_api_id             = aws_api_gateway_rest_api.srp-api.id
  resource_id             = aws_api_gateway_resource.users-create.id
  http_method             = aws_api_gateway_method.create-user-post.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.srp-create-user.invoke_arn
}

resource "aws_api_gateway_integration" "login-user-integration" {
  rest_api_id             = aws_api_gateway_rest_api.srp-api.id
  resource_id             = aws_api_gateway_resource.users-login.id
  http_method             = aws_api_gateway_method.login-user-post.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.srp-login.invoke_arn
}

# Create the textbooks endpoint
resource "aws_api_gateway_resource" "textbook" {
  parent_id   = aws_api_gateway_rest_api.srp-api.root_resource_id
  path_part   = "textbook"
  rest_api_id = aws_api_gateway_rest_api.srp-api.id
}

resource "aws_api_gateway_resource" "textbook-get" {
  parent_id   = aws_api_gateway_resource.textbook.id
  path_part   = "{textbookId+}"
  rest_api_id = aws_api_gateway_rest_api.srp-api.id
}

resource "aws_api_gateway_resource" "textbook-search" {
  parent_id   = aws_api_gateway_resource.textbook.id
  path_part   = "search"
  rest_api_id = aws_api_gateway_rest_api.srp-api.id
}

resource "aws_api_gateway_method" "textbook-get" {
  authorization    = "NONE"
  http_method      = "GET"
  resource_id      = aws_api_gateway_resource.textbook-get.id
  rest_api_id      = aws_api_gateway_rest_api.srp-api.id
  api_key_required = true
}

resource "aws_api_gateway_method" "textbook-search-get" {
  authorization    = "NONE"
  http_method      = "GET"
  resource_id      = aws_api_gateway_resource.textbook-search.id
  rest_api_id      = aws_api_gateway_rest_api.srp-api.id
  api_key_required = true
}

resource "aws_api_gateway_integration" "textbook-get-integration" {
  rest_api_id             = aws_api_gateway_rest_api.srp-api.id
  resource_id             = aws_api_gateway_resource.textbook-get.id
  http_method             = aws_api_gateway_method.textbook-get.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.srp-textbook-get.invoke_arn
}

resource "aws_api_gateway_integration" "textbook-search-integration" {
  rest_api_id             = aws_api_gateway_rest_api.srp-api.id
  resource_id             = aws_api_gateway_resource.textbook-search.id
  http_method             = aws_api_gateway_method.textbook-search-get.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.srp-textbook-search.invoke_arn
}

# Create the answers endpoint
resource "aws_api_gateway_resource" "answers" {
  parent_id   = aws_api_gateway_rest_api.srp-api.root_resource_id
  path_part   = "answers"
  rest_api_id = aws_api_gateway_rest_api.srp-api.id
}

resource "aws_api_gateway_method" "answers-get" {
  authorization    = "NONE"
  http_method      = "GET"
  resource_id      = aws_api_gateway_resource.answers.id
  rest_api_id      = aws_api_gateway_rest_api.srp-api.id
  api_key_required = true
}

resource "aws_api_gateway_method" "answers-post" {
   authorization    = "CUSTOM"
   authorizer_id    = aws_api_gateway_authorizer.srp-authorizer.id
   http_method      = "POST"
   resource_id      = aws_api_gateway_resource.answers.id
   rest_api_id      = aws_api_gateway_rest_api.srp-api.id
}

resource "aws_api_gateway_integration" "answers-get-integration" {
  rest_api_id             = aws_api_gateway_rest_api.srp-api.id
  resource_id             = aws_api_gateway_resource.answers.id
  http_method             = aws_api_gateway_method.answers-get.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.srp-get-answers.invoke_arn
}

resource "aws_api_gateway_integration" "answers-post-integration" {
  rest_api_id             = aws_api_gateway_rest_api.srp-api.id
  resource_id             = aws_api_gateway_resource.answers.id
  http_method             = aws_api_gateway_method.answers-post.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.srp-post-answer.invoke_arn
}


# Create the stage for the Rest API
resource "aws_api_gateway_stage" "srp-dev-stage" {
  deployment_id = aws_api_gateway_deployment.srp-api.id
  rest_api_id   = aws_api_gateway_rest_api.srp-api.id
  stage_name    = "dev"

  depends_on = [ aws_api_gateway_deployment.srp-api ]
}

resource "aws_api_gateway_deployment" "srp-api" {
  rest_api_id = aws_api_gateway_rest_api.srp-api.id

  depends_on = [
    aws_api_gateway_method.create-user-post,
    aws_api_gateway_method.login-user-post,
    aws_api_gateway_integration.create-user-integration,
    aws_api_gateway_integration.login-user-integration
  ]
}
