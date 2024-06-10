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