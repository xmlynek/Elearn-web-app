# React Node Express TypeScript Elearn App about UWB

![Logo](https://user-images.githubusercontent.com/70724986/178121509-1e2da0b5-7383-457e-974b-9036bb5256ed.png)

---

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![nodejs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.dev/)
[![ts-node](https://img.shields.io/badge/tsnode-3178C6.svg?style=for-the-badge&logo=ts-node&logoColor=white)](https://www.npmjs.com/package/ts-node)
[![Expressjs](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](https://hub.docker.com/repository/docker/xmlynek/node-backend)
[![Microsoft-azure](https://img.shields.io/badge/Microsoft_Azure-0089D6?style=for-the-badge&logo=microsoft-azure&logoColor=white)](https://elearn-uwb-bp.azurewebsites.net/welcome)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

<br>

# Table of Contents

- [Quick start](#quick-start)
  - [npm](#npm)
  - [docker-compose](#docker-compose)
- [Overview](#overview)
  - [Features](#features)
- [Use Case Diagram](#use-case-diagram)
- [User Roles and Functionality](#user-roles-and-functionality)
  - [Unauthenticated](#li-unauthenticated-li)
  - [Student](#li-student-li)
  - [Teacher](#li-teacher-li)
  - [Admin](#li-admin-li)
- [Database Model](#database-model)
- [Docker](#docker)
  - [Docker run](#docker-run)
  - [Docker compose](#docker-compose-1)
  - [Env variables](#env-variables)
- [App design & components](#app-design--components)
- [License](#license)

<br>

# Quick start

## npm

1. Run `npm install`
2. Rename `config.env.example` to `config.env`
3. Set valid `DATABASE_URL` in `config.env` file
4. Run `npm start`
5. App is running at http://localhost:8080/

## Docker compose

- Run `docker compose up`

<br>

# Overview

This application is a Web Elearning application about the UWB technology, which is the result of my bachelor thesis rework. It's a full stack application, which consists of React, Nodejs and Typescript technology. App uses REST API for communication between FE & BE using Express framework. I used Prisma for ORM and MySQL database.

- Example application is running on Microsoft Azure: https://elearn-uwb-app.azurewebsites.net
- Admin credentials: `admin@random.sk` `password1`

<br>

![homepage](https://user-images.githubusercontent.com/70724986/183497407-b165374b-e53a-42d0-b212-7666dda75e7f.png)

## Features

- Authentication/Authorization
- JWT tokens
- Client/server input validation
- REST API (Express)
- Swagger OpeAPI
- Password reset
- Roles
- Dynamic forms using formik
- Multiple question types
- React PDF
- Responsive design
- Nodemailer
- 2 languages
- Passport jwt
- Bootstrap
- Axios
- & many others..
  <br>

<br>

# Use Case Diagram

### Use Case diagram contains the role-based functionality of the application mentioned at <a href="#user-roles-and-functionality">User Roles And Functionality</a>, that the user can perform.

<br>

![UseCasediagram](https://user-images.githubusercontent.com/70724986/178120602-21c748a5-8401-43ab-945d-1b669e184bf5.png)

<br>

# User Roles and Functionality

## <li> Unauthenticated </li>

User without authentication has the folowing functionality:

<li> Register </li>
<li> Login </li>
<li> Password reset </li>
<li> Visit pages with list of topics, videos, tests, without taking the test or seeing specific topic. </li>

---

## <li> User/Student </li>

User with role Student has the following functionality:

<li> Explore/view specific topic from the topic list </li>
<li> Take and submit a test from test list.  </li> 
<li> Display user profile </li>
<li> Change user information </li>
<li> Change user password </li>
<li> Get the list of all taken tests </li>
<li> See the test details after submiting or after clicking on a particular test from taken tests list  </li>
<li> Logout </li>

---

## <li> Teacher </li>

In addition to the same functionality as the above Student role, a user with the Teacher role also has the following functionality:

<li> Display a list of all registered users </li>
<li> Visit a profile of the specific user </li>
<li> Get the list of all taken tests of particular user  </li>
<li> View the result and details of the particular test of the particular user </li>
<li> Manage video, topic and test resources. (Create, Update, Delete) </li>

---

## <li> Admin </li>

In addition to the same functionality as the above Teacher role, a user with the Admin role also has the following functionality:

<li> Create new user </li>
<li> Update information of the specific user </li>
<li> Delete existing user </li>
<li> Manage user roles </li>

<br>

# Database Model

![database-model](https://user-images.githubusercontent.com/70724986/178121577-7d4f73de-1b34-4289-8dac-06eff477adfb.png)

<br>

# Docker

Docker hub: <a href="https://hub.docker.com/repository/docker/xmlynek/react-node-elearn-app">xmlynek/react-node-elearn-app</a>

## Docker run

`docker run -p 8080:8080 -e DATABASE_URL=mysql://Filip:password@localhost:3306/uwbdb -e NODE_ENV=production xmlynek/react-node-elearn-app`

## Docker compose

run `docker compose up`

```
version: '3.8'
services:
  mysql_db:
    image: mysql:8.0
    restart: always
    volumes:
      - ./mysql/volume:/var/lib/mysql
      - ./mysql/dump.sql:/docker-entrypoint-initdb.d/dump.sql
    ports:
      - 9906:3306
    environment:
      MYSQL_HOST: localhost
      MYSQL_ROOT_PASSWORD: password
      MYSQL_USER: Filip
      MYSQL_PASSWORD: password
      MYSQL_DATABASE: uwbdb
    healthcheck:
      test: "exit 0"

  server:
    image: xmlynek/react-node-elearn-app
    ports:
      - 8080:8080
    environment:
      - DATABASE_URL=mysql://Filip:password@mysql_db/uwbdb
      - NODE_ENV=production
    depends_on:
      mysql_db:
        condition: service_healthy
    restart: always
```

## Env variables

- PORT
- NODE_ENV - development/production
- DATABASE_URL - mysql://USERNAME:PASSWORD@HOST:PORT/DB_NAME
- JWT_ACCESS_TOKEN_SECRET
- JWT_ACCESS_TOKEN_EXPIRATION
- JWT_REFRESH_TOKEN_SECRET
- JWT_REFRESH_TOKEN_EXPIRATION
- JWT_PASSWORD_RESET_TOKEN_SECRET
- JWT_PASSWORD_RESET_TOKEN_EXPIRATION
- EMAIL_HOST
- EMAIL_PORT
- EMAIL_USERNAME
- EMAIL_PASSWORD
- EMAIL_SERVICE

# App design & components

Design of pages and components can be found in <a href="https://github.com/xmlynek/Elearn-web-app/tree/master/client">client README</a>

# License

<a href="https://github.com/xmlynek/Elearn-web-app/LICENSE">MIT</a>
