# Thesis project: Webkomponenten zur Erstellung von Javascript basierenden Serveranwendungen.
This project is the practical work to the bachlor thesis.

## Usage
```
bower install
npm install
npm run setup // sets up the complete project
npm run start // development without a debug browser window
npm run start-w // development with a debug browser window (recommended)
```



## Quickstart
```
mongod --dbpath <path-to-db-data>
npm run start // development without a debug browser window
npm run start-w // development with a debug browser window (recommended)
```
To access all pages of the project, you need to have a valid user to login.
The mongoDB model needs to have fields: username, password, email, number.
So first create a dataset in the users collection with those fields.
Password is encoded, check how it is done in the code.#
## Contents

* /client - client / frontend files
* /server - server / backend files
* /server/data - mongodb database data
* README.md - this file
* etc. stuff that the loaders need

## Author

Andreas Hahn is a full-stack web-developer freelancer. You can visit him at [his website](http://andreas-hahn.at).

