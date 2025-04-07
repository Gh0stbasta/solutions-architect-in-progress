# ☁️ Hello API – AWS CloudFormation Starter Project

This is a minimal example of how to create a simple AWS Lambda function using CloudFormation, with optional expansion to API Gateway.

## 📦 What's Included

- **AWS Lambda Function**  
  A basic "Hello World" Lambda function written in Node.js.

- **IAM Role for Lambda Execution**  
  Allows logging to CloudWatch.

- **CloudFormation Template**  
  JSON-based template – clean and minimal, ideal for beginners, without API.
  YAML-base template - with API

## 🧾 Requirements

- AWS CLI configured on your machine
- An AWS account with permission to deploy CloudFormation stacks
- Optional: Node.js (for testing or future development)

## 🚀 Deploy the Stack

Open your terminal (CMD or PowerShell on Windows) and run:

```bash
aws cloudformation deploy ^
  --template-file template.json ^
  --stack-name hello-api-json ^
  --capabilities CAPABILITY_NAMED_IAM
```

If you want to delete the stack:
```bash
aws cloudformation delete-stack --stack-name hello-api-json
```

