# client_registration_API

An API developed with the objective of practicing full stack skills. This means that it is a simple back end project with a simple front end to train the integration of them both. It allows client registration and each client can have multiple contacts. It also uses pdfkit to be able to generate a pdf with the client's information.

## Table of contents

- [Overview](#1-overview)
- [ER Diagram](#2-er-diagram)
- [Setting up](#3-setting-up)
  - [Running it using docker](#31-running-it-using-docker)
  - [Running it without docker](#32-running-it-without-docker)
- [Endpoints](#4-endpoints)
  - [Client](#1-client)
  - [Endpoints Client](#11-endpoints-client)
    - [Client creation](#12-client-creation)
    - [Client login](#13-client-login)
    - [Client listing](#14-client-listing)
    - [Client update](#15-client-update)
    - [Client deletion](#16-client-deletion)
    - [Client main info listing](#17-client-main-info-listing)
    - [Client account as pdf](#18-client-account-as-pdf)
    - [Create client email](#19-create-client-email)
    - [Delete client email](#110-delete-client-email)
    - [Create client Phone Number](#111-create-client-phone-number)
    - [Delete client Phone Number](#112-delete-client-phone-number)
  - [Contact](#2-contact)
  - [Endpoints Contact](#21-endpoints-contact)
    - [Contact creation](#22-contact-creation)
    - [Contact listing](#23-contact-listing)
    - [Contact deletion](#24-contact-deletion)
    - [Contact update](#25-contact-update)
    - [Contact specific listing](#26-contact-specific-listing)
    - [Contact email creation](#27-contact-email-creation)
    - [Contact email deletion](#28-contact-email-deletion)
    - [Contact phone number creation](#29-contact-phone-number-creation)
    - [Contact phone number deletion](#210-contact-phone-number-deletion)
---

## 1. Overview

tecnologies:

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [Typescript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Docker](https://www.docker.com/)
- [Docker-Compose](https://docs.docker.com/compose/)
- [PDF kit](https://pdfkit.org/)

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
{
  "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZlcm5hbmRvIiwiaWF0IjoxNjcwMTI0Mzg0LCJleHAiOjE2NzAyMTA3ODR9.wH5zEEpridTBVO1sps2GwFE-SxuJe5sjYEDPhw5KYEg"
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
{
  "name":"saitama2"
  "username": "CapedBaldy2",
  "password": "12345678Ba#"
}
```

##### response example:

```
204 No Content
```

```json
No content
```

---

#### 1.6 client deletion

[Go back to start](#table-of-contents)

##### `/clients`

##### request example:

```
DELETE /clients
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
204 No Content
```

```json
No content
```

---

#### 1.7 client main info listing

[Go back to start](#table-of-contents)

##### `/clients/mainInfo`

##### request example:

```
GET /clients/mainInfo
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
	"email": {
		"isMain": true,
		"emailAddress": "saitama@gmail.com"
	},
	"phone": {
		"isMain": true,
		"phoneNumber": "935774945"
	}
}
```

---

#### 1.8 client account as pdf

[Go back to start](#table-of-contents)

##### `/clients/pdf`

##### request example:

```
GET /clients/pdf
Host: http://localhost:3000
Authorization: Token
Content-type: application/pdf
```

##### request body:

```json
empty
```

##### response example:

```
200 OK
```

```pdf
pdf file (i mean a real pdf file download)
```

---

#### 1.9 create client email

[Go back to start](#table-of-contents)

##### `/clients/emails`

##### request example:

```
GET /clients/emails
Host: http://localhost:3000
Authorization: Token
Content-type: application/json
```

##### request body:

```json
{
	"emailAddress":"saitama@gmail.com",
	"isMain":true
}
```

##### response example:

```
201 CREATED
```

```json
{
	"emailAddress":"saitama@gmail.com",
	"isMain":true,
	"client": {
		"id": "ee96441b-ed3b-4207-bc4e-4950d0a0c339" 
  		"name": "Saitama",
  		"username": "CapedBaldy",
  		"createdAt": "2022-09-12T19:11:21.483Z",
	}
}
```

---

#### 1.10 delete client email

[Go back to start](#table-of-contents)

##### `/clients/emails`

##### request example:

```
DELETE /clients/emails
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
204 No Content
```

```json
No Content
```

---

#### 1.11 create client Phone Number

[Go back to start](#table-of-contents)

##### `/clients/phoneNumbers`

##### request example:

```
GET /clients/phoneNumbers
Host: http://localhost:3000
Authorization: Token
Content-type: application/json
```

##### request body:

```json
{
	"phoneNumber":"11111111111",
	"isMain":true
}
```

##### response example:

```
201 CREATED
```

```json
{
	"phoneNumber":"11111111111",
	"isMain":true,
	"client": {
		"id": "ee96441b-ed3b-4207-bc4e-4950d0a0c339" 
  		"name": "Saitama",
  		"username": "CapedBaldy",
  		"createdAt": "2022-09-12T19:11:21.483Z",
	}
}
```

---

#### 1.12 delete client Phone Number

[Go back to start](#table-of-contents)

##### `/clients/phoneNumbers`

##### request example:

```
DELETE /clients/phoneNumbers
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
204 No Content
```

```json
No Content
```

---

### 2. **Contact**

The Contact object is defined as:

| Field       | Type    | Description                                     |
| ----------- | ------- | ----------------------------------------------- |
| id          | uuid    | contact's unique identifier                     |
| name        | string  | contact's full name                             |
| clientId    | string  | client whom contact is owned by                 |
| emails      |  orm    | contact's emails, only accessed by orm (not db) |
| phoneNumbers|  orm    | contact's email, only accessed by orm (not db)   |

#### 2.1 Endpoints Contact

| Method | Route                                           | Description                              |
| ------ | ---------------------------------------------   | ---------------------------------------- |
| POST   | /contacts                                       | creates client's contact                 |
| GET    | /contacts                                       | lists all client's contact info          |
| GET    | /contacts/:contactId                            | list specific contact                    |
| DELETE | /contacts/:contactId                            | deletes contact                          |
| PATCH  | /contacts/:contactId                            | updates contact                          |
| POST   | /contacts/:contactId/emails/                    | registers a contact's email address      |
| DELETE | /contacts/:contactId/email/:emailId             | deletes a contact's email address        |
| POST   | /contacts/:contactId/phoneNumbers/              | registers a contact's phone number       |
| DELETE | /clients/:contactId/phoneNumbers/:phoneNumberId | deletes a contact's phone number         |

---

#### 2.2 contact creation

[Go back to start](#table-of-contents)

##### `/contacts`

##### request example:

```
POST /contacts
Host: http://localhost:3000
Authorization: Token
Content-type: application/json
```

##### request body:

```json
{
	"name":"john",
	"emailAddress":"john@gmail.com"
}
```

##### response example:

```
201 Created
```

```json
{
	"id": "46a7770c-1e74-405d-bf6d-102ea498f308",
	"name": "john",
	"phoneNumbers": [],
	"emails": [
		{
			"isMain": true,
			"id": "2dca6278-5d3d-4b25-a6a2-1874afe09ff4",
			"emailAddress": "john@gmail.com"
		}
	]
}
```

---

#### 2.3 contact listing

[Go back to start](#table-of-contents)

##### `/contacts`

##### request example:

```
GET /contacts
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
[
	{
		"id": "46a7770c-1e74-405d-bf6d-102ea498f308",
		"name": "john",
		"phoneNumbers": [
			{
				"isMain": true,
				"id": "fa4865e0-b748-4bb0-9489-ff9077e17026",
				"phoneNumber": "11111112"
			}
		],
		"emails": [
			{
				"isMain": true,
				"id": "9fa3686c-5461-4b9a-811b-45e71924db45",
				"emailAddress": "john@gmail.com"
			}
		]
	},
	{
		"id": "29d1f589-43e8-47f4-bf48-a2a2958099be",
		"name": "jack",
		"phoneNumbers": [],
		"emails": [
			{
				"isMain": false,
				"id": "9fb458f4-29f4-423b-9c20-cbf9cb0ee1fd",
				"emailAddress": "jack@gmail.com"
			}
		]
	}
]
```

---

#### 2.4 contact deletion

[Go back to start](#table-of-contents)

##### `/contacts/:contactId`

##### request example:

```
GET /contacts/:contactId
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
204 No Content
```

```json
No Content
```

---

#### 2.5 contact update

[Go back to start](#table-of-contents)

##### `/contacts/:contactId`

##### request example:

```
PATCH /contacts/:contactId
Host: http://localhost:3000
Authorization: Token
Content-type: application/json
```

##### request body:

```json
{
	"name":"carter"
}
```

##### response example:

```
204 No Content
```

```json
No Content
```

---

#### 2.6 contact specific listing

[Go back to start](#table-of-contents)

##### `/contacts/:contactId`

##### request example:

```
GET /contacts/:contactId
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
	"id": "99c11353-c3c0-470f-b50f-604ed0de58dd",
	"name": "carter",
	"emails": [
		{
			"isMain": true,
			"id": "9a70b09c-9587-4d9b-a51d-5a3418306cd9",
			"emailAddress": "john@gmail.com"
		}
	],
	"phoneNumbers": [
		{
			"isMain": true,
			"id": "5e984dc0-40d2-41b7-8896-ae3c6f6ad27e",
			"phoneNumber": "1111111111"
		}
	]
}
```

---

#### 2.7 contact email creation

[Go back to start](#table-of-contents)

##### `/contacts/:contactId/emails/`

##### request example:

```
POST /contacts/:contactId/emails/
Host: http://localhost:3000
Authorization: Token
Content-type: application/json
```

##### request body:

```json
{
	"emailAddress": "john2@gmail.com",
	"isMain":true
}
```

##### response example:

```
201 Created
```

```json
{
	"isMain": true,
	"id": "2ca0bcdf-a13b-4cf9-a76f-fa733d56f29c",
	"emailAddress": "john2@gmail.com",
	"contact": {
		"id": "46a7770c-1e74-405d-bf6d-102ea498f308",
		"name": "john"
	}
}
```

---

#### 2.8 contact email deletion

[Go back to start](#table-of-contents)

##### `/contacts/:contactId/emails/:emailId`

##### request example:

```
DELETE /contacts/:contactId/emails/:emailId
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
204 No Content
```

```json
No Content
```

---

#### 2.9 contact phone number creation

[Go back to start](#table-of-contents)

##### `/contacts/:contactId/phoneNumbers`

##### request example:

```
POST /contacts/:contactId/phoneNumbers/
Host: http://localhost:3000
Authorization: Token
Content-type: application/json
```

##### request body:

```json
{
	"phoneNumber":"11111119",
	"isMain":true
}
```

##### response example:

```
201 Created
```

```json
{
	"isMain": true,
	"id": "b05e75e8-542b-466a-93a1-98954bee68d9",
	"phoneNumber": "11111119",
	"contact": {
		"id": "46a7770c-1e74-405d-bf6d-102ea498f308",
		"name": "john"
	}
}
```

---

#### 2.10 contact phone number deletion

[Go back to start](#table-of-contents)

##### `/contacts/:contactId/phoneNumbers/:phoneNumberId`

##### request example:

```
DELETE /contacts/:contactId/phoneNumbers/:phoneNumberId
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
204 No Content
```

```json
No Content
```

---

