# client_registration_API

An API developed with the objective of practicing full stack skills. This means that it is a simple back end project with a simple front end to train the integration of them both. It allows client registration and each client can have multiple contacts. It also uses pdfkit to be able to generate a pdf with the client's information.

## Table of contents

- [Overview](#1-overview)
- [ER Diagram](#2-er-diagram)
- [Setting up](#3-setting-up)
  - [Running it using docker](#31-running-it-using-docker)
  - [Running it without docker](#32-running-it-without-docker)
 - [Endpoints](#4-endpoints)
  
---

## 1. Overview

tecnologies:

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [Typescript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)

API port 3000:3000 (exposed/docker) -----
DB port 5431:5432 (exposed/docker)

Default local URL: http://localhost:3000

---

## 2. ER Diagram
![DER](ERDiagram.jpg)

---

## 3. Setting up

[Go back to start](#table-of-contents)

Make sure you have [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable) package manager installed.</br>
There are two ways of running this project locally.</br>
The first one is to run it with docker (recommended). You will need to have installed [docker](https://docs.docker.com/get-docker/) and [docker-compose](https://docs.docker.com/compose/install/#install-compose).</br>
The second one is to configure .env and having installed [postgresql](https://www.postgresql.org/download/) 

</br>

### 3.1 Running it using docker

Right after clonning the repository run the command:

```bash
yarn
```

Open the terminal in the root of the project and type **docker-compose up**. Everything will be setted up automatically. (even migrations!)</br>

```bash
docker-compose up
```
The command to exclude the containers afterwards is **docker-compose down**.

</br>

### 3.2 Running it without docker

Before even clonning the repository you should have a postgresql database created. </br>
Inside the postgre CLI run the command:

```bash
CREATE DATABASE database_name
```

Of course, **database_name** is whatever you choose it to be.

Then clone the repository and run the command:

```bash
yarn
```

Now, create a .env file in the root of the project and use .env.example as a model for filling it. </br>
Remember to match it with your previous created database.</br>

Run the migrations with:

```bash
yarn migrate
```

Start the project with:

```bash
yarn dev
```

---

## 4. Endpoints
[Go back to start](#table-of-contents)

### 1. **Client**

The client object is defined as:

| Field       | Type    | Description                                     |
| ----------- | ------- | ----------------------------------------------- |
| id          | uuid    | client's unique identifier                      |
| name        | string  | client's full name                              |
| username    | string  | client's unique username used for authentication|
| password    | string  | client's password                               |
| createdAt   | datetime| When the client was created                     |
| cpf         | number  | O cpf do usuário.                               |
| emails      |  orm    | client's emails, only accessed by orm (not db)  |
| phoneNumbers|  orm    | client's email, only accessed by orm (not db)   |

#### 1.1 Endpoints Client

| Method | Route                              | Description                                |
| ------ | ---------------------------------- | ------------------------------------------ |
| POST   | /clients                           | creates client                             |
| GET    | /clients                           | lists client own info                      |
| POST   | /clients/login                     | performs login and gets access token       |
| PATCH  | /clients                           | updates client's own information           |
| DELETE | /clients                           | deletes client's own account               |
| POST   | /clients/emails                    | registers a client's email address         |
| DELETE | /clients/emails/:emailAddress      | deletes a client's email address           |
| POST   | /clients/phoneNumbers              | registers a client's phone number          |
| DELETE | /clients/phoneNumbers/:phoneNumber | deletes a client's phone number            |
| GET    | /clients/mainInfo                  | gets client's main email and phone number  |
| GET    | /clients/pdf                       | gets client's entire account in pdf format |

---

#### 1.2 client creation

[Go back to start](#table-of-contents)

##### `/clients`

##### request example:

```
POST /clients
Host: http://localhost:3000
Authorization: None
Content-type: application/json
```

##### request body:

```json
{
	"name": "Saitama",
	"username": "CapedBaldy",
	"password": "12345678Ab#"
}
```

##### response example:

```
201 Created
```

```json
{
  "id": "ee96441b-ed3b-4207-bc4e-4950d0a0c339" 
	"name": "Saitama",
	"username": "CapedBaldy",
	"createdAt": "2022-09-12T19:11:21.483Z",
}
```

---

#### 1.3 client login

[Go back to start](#table-of-contents)

##### `/clients/login`

##### request example:

```
POST /clients/login
Host: http://localhost:3000
Authorization: None
Content-type: application/json
```

##### request body:

```json
{
	"username": "CapedBaldy",
	"password": "12345678Ab#"
}
```

##### response example:

```
200 OK
```

```json
{ "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZlcm5hbmRvIiwiaWF0IjoxNjcwMTI0Mzg0LCJleHAiOjE2NzAyMTA3ODR9.wH5zEEpridTBVO1sps2GwFE-SxuJe5sjYEDPhw5KYEg"
}
```

---

#### 1.4 client listing

[Go back to start](#table-of-contents)

##### `/clients`

##### request example:

```
GET /clients
Host: http://localhost:3000
Authorization: Token
Content-type: application/json
```

##### request body:

```json
empty
```

##### response example:

```
200 OK
```

```json
{
  "id": "ee96441b-ed3b-4207-bc4e-4950d0a0c339" 
	"name": "Saitama",
	"username": "CapedBaldy",
	"createdAt": "2022-09-12T19:11:21.483Z",
  "phoneNumbers" : [],
  "emails":[]
}
```

---

#### 1.5 client update

[Go back to start](#table-of-contents)

##### `/clients`

##### request example:

```
PATCH /clients
Host: http://localhost:3000
Authorization: Token
Content-type: application/json
```

##### request body:

```json
  "name":"saitama2"
	"username": "CapedBaldy2",
	"password": "12345678Ba#"
```

##### response example:

```
204 No Content
```

```json
No content
```

---

