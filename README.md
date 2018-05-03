# 🎓 Thesis project: Webkomponenten zur Erstellung von Javascript basierenden Serveranwendungen.

This project is the practical work of the bachlor thesis. It's not ment to be used productive in any way. It was a proof of concept work to test the limits of webcomponents. I've created an application (simple CRUD app) that does everything with and through webcomponents. Client UI, server setup and database queries. But can this even work? Spoiler: It works!

## 💻 Usage
```
bower install
npm install
npm run setup // sets up the complete project
npm run start // development without a debug browser window
npm run start-w // development with a debug browser window (recommended)
```


## ⚡️ Quickstart
```
mongod --dbpath <path-to-db-data>
npm run start // development without a debug browser window
npm run start-w // development with a debug browser window (recommended)
```
To access all pages of the project, you need to have a valid user to login.
The mongoDB model needs to have fields: username, password, email, number.
So first create a dataset in the users collection with those fields.
Password is encoded, check how it is done in the code.

## 📄 Content

* /client - client / frontend files
* /server - server / backend files
* /server/data - mongodb database data
* README.md - this file
* Webkomponenten zur Erstellung von Javascript basierenden Serveranwendungen - Hahn Andreas.pdf - The bachelor thesis

##  🙌 Author

Andreas Hahn is a full-stack web-developer freelancer based in Austria, NOT Australia. Check out [his website](https://andreas-hahn.at).

