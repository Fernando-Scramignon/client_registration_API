# client_registration_API

An API developed with the objective of practicing full stack skills. This means that it is a simple back end project with a simple front end to train the integration of them both. It allows client registration and each client can have multiple contacts. It also uses pdfkit to be able to generate a pdf with the client's information.

## Table of contents

- [Overview](#1-overview)
- [ER Diagram](#2-er-diagram)
- [Setting up](#3-setting-up)
  - [Running it using docker](#31-running-it-using-docker)
  - [Running it without docker](#32-running-it-without-docker)
  
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

Make sure you have [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable) package manager installed.</br>
There are two ways of running this project locally.</br>
The first one is to run it with docker (recommended). You will need to have installed [docker](https://docs.docker.com/get-docker/) and [docker-compose](https://docs.docker.com/compose/install/#install-compose).</br>
The second one is to configure .env and having installed [postgresql](https://www.postgresql.org/download/) 

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




