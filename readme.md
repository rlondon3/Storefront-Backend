STORE FRONT BACKEND PROJECT
=======================================================
                          This is a Node and Express APP for a Store front backend API.

        • This is a backend project for the fullstack javascript Udacity Nanodegree •
      
                                        DEVELOPMENT TECHNOLOGY
        Node.js| Express| Typescript| Jasmine | PostgreSQL | JSON Webtoken | Supertest | Bcrypt | Dotenv 
 ___________________________________________________________________

OVERVIEW
---------------------------
Create database and start the API server. This project is running on localhost:3000.

• **_Start PostgreSQL_**

•**_Create 2 databases:_** In postgres SQL shell you will create 1 database for development and the other for testing. 
  <br>Example: <br> CREATE DATABASE full_stack_dev; CREATE DATABSE full_stack_test;

• **_Connect to the database:_** <br> \c full_stack_dev

• **_Create user and password:_**
<br>Example: <br>CREATE USER full_stack_user WITH PASSWORD 'password123';

• **_Grant user privileges to use the database:_** 
<br>Example: <br> GRANT ALL PRIVILEGES ON DATABASE full_stack_dev TO full_stack_user;
         <br> GRANT ALL PRIVILEGES ON DATABASE full_stack_dev_test TO full_stack_user;
         
Be sure to check that all databases and user is working. <br> Enter \l to list databases, and \du to display users.
<br> No tables have been created; therefore, \dt will return "No relations found."

Below are the environmental variables that needs to be set in a .env file:
<br> *Note that the values are not the same as the provided examples given above. 

POSTGRES_HOST=127.0.0.1
<br>POSTGRES_DB=legendary_arts_dev
<br>POSTGRES_TEST_DB=legendary_arts_test
<br>POSTGRES_USER=legendary_user
<br>POSTGRES_PASSWORD=password123
<br>ENV=dev
<br>PEPPER=ren-and-stimpy-happy-joy
<br>SALT_ROUNDS=10
<br>TOKEN_SECRET=mchammertime987
<br>SPEC_TEST_PASSWORD=0123456789


