
resource "aws_dynamodb_table" "users" {
  name           = "srp-users"
  billing_mode   = "PROVISIONED"
  hash_key       = "userId"
  range_key      = "email"
  read_capacity  = 1
  write_capacity = 1

  attribute {
    name = "userId"
    type = "S"
  }

  attribute {
    name = "email"
    type = "S"
  }
}

resource "aws_dynamodb_table" "textbooks" {
  name           = "srp-textbooks"
  billing_mode   = "PROVISIONED"
  hash_key       = "textbookId"
  range_key      = "name"
  read_capacity  = 1
  write_capacity = 1

  attribute {
    name = "textbookId"
    type = "S"
  }

  attribute {
    name = "name"
    type = "S"
  }
}

resource "aws_dynamodb_table" "answers" {
  name           = "srp-answers"
  billing_mode   = "PROVISIONED"
  hash_key       = "textbookId"
  range_key      = "answerId"
  read_capacity  = 1
  write_capacity = 1

  attribute {
    name = "textbookId"
    type = "S"
  }

  attribute {
    name = "answerId"
    type = "S"
  }
}