# QHO541 Advanced DataBase System

## Node JS project

This project is a Node.js web application designed around a goodreads book dataset, developed using the Express.js framework using the MVC model. 
The goodreads database has been downloaded from [kaggle](https://www.kaggle.com/datasets/jealousleopard/goodreadsbooks).

## Features
 - User authentication and authorization
 - CRUD operations for managing a personal reading list
 - User profiles with the ability to change passwords
 - Review books from the database
 - CRUD operations for book reviews

 ## Technologies
 - Node.js
 - Express.js 
 - MongoDB/Mongoose
 - Bootstrap
 - JWT for authentication

## Getting started
 
 ### Development environment

 #### Prerequisites

 - Node.js
 - npm
 - MongoDB

 #### Installing

 1. Clone git repository `git clone `

 2. Navigate to project directory
 ` cd yourprojectdir` 

 3. Install dependencies `npm install`

 4. Set up environment variables:
    
    Create `.env` file in the root directory and add the following variables:

    DB_URI: <your_mongodb_connection_string>

    JWT_SECRET: <your_jwt_secret_key>

    SESSION_SECRET: <your_session_secret_key>

 #### Using the app in development
 1. Start the server `npm run devStart`

 2. Navigate to http://localhost:3000 in your browser to view the app.
