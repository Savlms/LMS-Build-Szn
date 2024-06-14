# Learning Management System
 This project is an LMS API designed to facilitate user and admin management, payment processing, and course enrollment. It includes comprehensive features for user authentication, authorization, CRUD operations, generating payment orders, and enrolling users in different courses.

## Installation
### Cloning the Repository
+ Clone the repository from GitHub:


+ git clone https://github.com/your-username/your-repo.git
+ This step pulls the project code from the GitHub repository to your local machine.

+ Navigate to the project directory:

+ cd your-repo, change the current directory to the project directory you just cloned.

## Installing Dependencies
+ Install all required Node.js packages using npm install
+ This command installs all necessary packages and dependencies listed in package.json to run the project.

## Environment Configuration
+ Create a .env file in the root directory to store environment variables like port number, secret keys, and database URL. 
### Example:

* PORT=3000
* SECRET_KEY=your_secret_key
* DATABASE_URL=your_database_url
* Environment variables are used to configure settings and store sensitive information securely. The .env file contains these variables which the application reads at runtime.

## Usage
* Start the development server using: 
#### npm run dev
* This command starts the server in development mode. By default, the server will run on http://localhost:3000.

## API Endpoints
### User Management
#### Update a User

* PATCH /users/:id
````Description: Updates a user by ID.
Requires: Authentication.
Request Body: Partial user object, e.g., { "name": "John Doe Updated", "email": "john.doe@example.com" }
Note: This endpoint allows authenticated users to update their details.
````

#### Delete a User
* DELETE /users/:id
````Description: Deletes a user by ID.
Requires: Authentication.
Note: This endpoint allows authenticated users to delete their accounts.
````

#### Get All Users
* GET /users
````Description: Retrieves all users.
Requires: Authentication and Authorization.
Note: This endpoint allows authenticated and authorized users to view all user records.
````

#### Get a Single User
* GET /users/:id
````Description: Retrieves a single user by ID.
Requires: Authentication.
Note: This endpoint allows authenticated users to view their profile or other users' profiles if authorized.
````

#### User Login
* POST /users/login
````Description: Logs in a user.
Request Body: { "email": "john@example.com", "password": "password123" }
Note: This endpoint authenticates users and generates a JWT token for session management.
````

#### User Logout
* POST /users/logout
````Description: Logs out a user.
Note: This endpoint invalidates the user's session token.
````
#### User Signup
* POST /users
````Description: Signs up a new user.
Request Body: { "email": "john@example.com", "password": "password123", "role": "user" }
Note: This endpoint registers a new user and stores their information securely.
````
#### Forgot Password
* PUT /users/forgot-password
````Description: Sends a password reset link.
Request Body: { "email": "john@example.com" }
Note: This endpoint sends a reset password email to the user's registered email address.
````
#### Reset Password
* PUT /users/reset-password/:token
````Description: Resets password using token.
Request Body: { "password": "newpassword123" }
Note: This endpoint updates the user's password using the token sent to their email.
````
### Admin Management
#### Admin Signup
* POST /users/admin
````Description: Signs up a new admin user.
Request Body: { "email": "admin@example.com", "password": "adminpassword123", "role": "admin" }
Note: This endpoint is used to register new admin users with elevated privileges.
````
#### Admin Forgot Password
* PUT /users/admin/forgot-password
````Description: Sends a password reset link to admin.
Request Body: { "email": "admin@example.com" }
Note: This endpoint sends a reset password email specifically for admin users.
````
### Payment Processing
#### Generate Payment Order
* POST /payment
````Description: Generates a payment order.
Request Body: { "email": "customer@example.com", "amount": 20000 }
Note: This endpoint initializes a payment order through the payment gateway (e.g., Paystack).
````
### Course Management
#### GET /courses/product-design
````Description: Retrieves the product design course details.
Note: This endpoint provides details of the product design course from the mock database.
````
#### GET /courses/frontend
````Description: Retrieves the frontend course details.
Note: This endpoint provides details of the frontend course from the mock database.
````
#### GET /courses/backend
````Description: Retrieves the backend course details.
Note: This endpoint provides details of the backend course from the mock database.
````
#### GET /courses/web3
````Description: Retrieves the web3 course details.
Note: This endpoint provides details of the web3 course from the mock database.
````
### Enroll in a Course

* POST /courses/enroll/:path
````Description: Enrolls the user in a specific course.
Path Parameter: The course path, with values 1 (Product Design), 2 (Frontend), 3 (Backend), 4 (Web3).
Note: This endpoint allows users to enroll in a specific course by specifying the course path.
````
### Middleware
#### Authentication Middleware

````Description: Authenticates users based on a token.
Note: This middleware checks if the request contains a valid JWT token and authenticates the user.
````
#### Authorization Middleware
````Description: Authorizes users based on their role.
Note: This middleware checks the user's role and grants or denies access to certain endpoints.
````
#### Validation Middleware
````Description: Validates request bodies against provided schemas.
Note: This middleware ensures that incoming request data matches the expected format and types.
````
