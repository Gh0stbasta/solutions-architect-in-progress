## Simple Todo App

This is a serverless Todo application that allows users to manage their tasks efficiently. The app provides the following features:

- **Add Tasks**: Users can create new tasks.
- **Mark as Done**: Tasks can be marked as completed, with a line-through style applied to indicate their status.
- **Delete Tasks**: Users can delete tasks they no longer need.
- **Filter Tasks**: Users can filter tasks to view all tasks, only completed tasks, or only active tasks.

All tasks are stored in a DynamoDB table, ensuring scalability and reliability. The architecture leverages AWS services such as API Gateway, Lambda, and DynamoDB for a fully serverless solution.

```mermaid
graph TD
   A[User] -->|Creates Task| B[Frontend Application]
   B -->|Sends Request| C[API Gateway]
   C -->|Triggers| D[Lambda Function]
   D -->|Interacts with| E[DynamoDB]
   E -->|Stores Task| F[Database]
   D -->|Returns Response| B
   B -->|Displays Task| A
```

### Todo: Issue Board

#### Active Tasks
- [ ] **Fix items not showing** 

#### Done Tasks
- [x] **Created Structure and connected API Gateway**



