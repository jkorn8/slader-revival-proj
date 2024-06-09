resource "aws_lambda_layer_version" "bcryptjs-layer" {
  filename   = "./layers/bcryptjs/nodejs.zip"
  layer_name = "bcryptjs"
  
  compatible_runtimes = ["nodejs20.x", "nodejs18.x"]
}

resource "aws_lambda_layer_version" "jsonwebtoken-layer" {
  filename   = "./layers/jsonwebtoken/nodejs.zip"
  layer_name = "jsonwebtoken"
  
  compatible_runtimes = ["nodejs20.x", "nodejs18.x"]
}