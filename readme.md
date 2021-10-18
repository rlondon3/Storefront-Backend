STORE FRONT BACKEND PROJECT
++++++++++++++++++++++++++++++
This is a Node and Express APP for a Store front backend API.

              • This is a backend project for the fullstack javascript Udacity Nanodegree •
                   Node.js| Express| Typescript| Jasmine | PostgreSQL | JSON Webtoken | Supertest | Bcrypt | Dotenv
 ___________________________________________________________________

OVERVIEW

____________________________________________________________________
Development:

_Create database and start the API server._ This project is running on localhost:3000.

_Start PostgreSQL_

-_Create 2 databases:_ In postgres SQL shell you will create 1 database for development and the other for testing. 
  Example: CREATE DATABASE full_stack_dev; CREATE DATABSE full_stack_test;

-_Connect to the database:_ \c full_stack_dev

-_Create user and password:_ 
Example: CREATE USER full_stack_user WITH PASSWORD 'password123';

-_Grant user privileges to use the database:_ 
Example: GRANT ALL PRIVILEGES ON DATABASE full_stack_dev TO full_stack_user;
         GRANT ALL PRIVILEGES ON DATABASE full_stack_dev_test TO full_stack_user;
         
Be sure to check that all databases and user is working. Enter \l to list databases, and \du to display users.
No tables have been created; therefore, \dt will return "No relations found."

Below are the environmental variables that needs to be set in a .env file:
*Note that the values are not the same as the provided examples given above. 

POSTGRES_HOST=127.0.0.1
POSTGRES_DB=legendary_arts_dev
POSTGRES_TEST_DB=legendary_arts_test
POSTGRES_USER=legendary_user
POSTGRES_PASSWORD=password123
ENV=dev
PEPPER=ren-and-stimpy-happy-joy
SALT_ROUNDS=10
TOKEN_SECRET=mchammertime987
SPEC_TEST_PASSWORD=0123456789


