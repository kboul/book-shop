# Book Shop

A full stack application using React, Nodejs express and Typescript in both along with MySQL to perform CRUD operations. Other technologies that were used are tailwindcss, react-query, axios, react-router. Inspired by [React Node.js MySQL CRUD Tutorial for Beginners
](https://www.youtube.com/watch?v=fPuLnzSjPLE) and extended according to personal preferences.

## Run the application

Install MySQL on your machine

Create .env inside server folder and include the following env vars thar are required to connect the DB.

```
MYSQL_HOST="your_host"
MYSQL_USER="your_user"
MYSQL_PASSWORD="your_password"
MYSQL_DATABASE="book_shop"
```

```
cd server && yarn install && yarn dev
cd client && yarn install && yarn start
```
