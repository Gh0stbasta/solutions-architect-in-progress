# Two-Zone VPC Project  

This project focuses on creating a Virtual Private Cloud (VPC) with both public and private subnets using AWS CloudFormation via the AWS SDK. The VPC will be designed to span two availability zones, ensuring high availability and fault tolerance.  

## Key Features  
- **Public Subnet**: A subnet accessible from the internet, typically used for resources like load balancers or bastion hosts.  
- **Private Subnet**: A subnet isolated from direct internet access, ideal for backend services like databases or application servers.  
- **AWS SDK Integration**: The infrastructure will be deployed programmatically using the AWS SDK to interact with CloudFormation.  

## Objectives  
1. Create a VPC with CIDR block allocation.  
2. Define public and private subnets across two availability zones.  
3. Configure routing tables for internet access in the public subnet and isolation in the private subnet.  
4. Automate deployment using AWS SDK and CloudFormation templates.  

## Prerequisites  
- AWS account with necessary permissions.  
- AWS SDK installed and configured.  
- Basic understanding of CloudFormation templates.  

## Outcome  
A robust, scalable, and secure VPC architecture suitable for hosting applications with both public-facing and private components.  