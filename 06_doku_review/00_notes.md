# 🧠 AWS Solutions Architect Associate – Core Components

This guide lists the essential AWS services, concepts, and tools you need to understand for the AWS SAA certification.

---

## 🧱 Core Services (Must-Know)

| Area             | Key Services & Topics |
|------------------|------------------------|
| **Compute**      | ✅ EC2 (Launch, Types, ASG, Load Balancer)<br>✅ Lambda (Serverless, Triggers, Roles) |
| **Storage**      | ✅ S3 (Policies, Lifecycle, Encryption)<br>✅ EBS, EFS |
| **Databases**    | ✅ RDS (Backups, Multi-AZ, Read Replicas)<br>✅ DynamoDB (Keys, Modes) |
| **Networking**   | ✅ VPC (Subnets, Routing, NAT)<br>✅ SGs vs NACLs, CIDR<br>✅ Route 53 (DNS) |
| **IAM & Security** | ✅ IAM Roles/Policies, MFA, STS, SCP<br>✅ KMS, Secrets Manager, SSM |
| **HA & Fault Tolerance** | ✅ ASG, Multi-AZ/Region<br>✅ Load Balancer (ALB/NLB) |
| **Monitoring**   | ✅ CloudWatch, CloudTrail, X-Ray |

---

## 🧠 Core Concepts

- ☁️ Well-Architected Framework (5 Pillars)
- 🔐 Least Privilege, Separation of Duties
- 💵 Cost Optimization (Spot, S3 Classes, Savings Plans)
- 🔁 Decoupling & Event Design (SQS, SNS, Lambda)
- 🧰 Infrastructure as Code – CloudFormation, CDK (basics)

---

## 📚 Recommended for Practice

| Focus            | Services               |
|------------------|------------------------|
| Serverless       | Lambda, API Gateway, DynamoDB |
| Static Hosting   | S3, CloudFront, Route 53 |
| Microservices    | Step Functions, EventBridge, SNS, SQS |
| Data Processing  | Athena, Glue, Kinesis (basic) |
| Security         | IAM, SCP, KMS, SSM, Config |
| Deployment       | CodePipeline, CloudFormation, EB (basic) |

---

## ✅ Top 10 Topics to Master for the Exam

1. VPC Design (Public/Private Subnets + NAT)
2. IAM Roles & Policies
3. S3: Access Control, Encryption, Versioning
4. EC2: Launch Templates, ASG, Load Balancer
5. RDS: Multi-AZ, Backups, Snapshots
6. DynamoDB: Partition Keys, Provisioned vs On-Demand
7. Lambda + API Gateway
8. CloudWatch Logs & Alarms
9. CloudFormation Basics
10. Cost Optimization & Pricing Models