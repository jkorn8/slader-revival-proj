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

# Remember to add permissions for API Gateway lambda proxy integration