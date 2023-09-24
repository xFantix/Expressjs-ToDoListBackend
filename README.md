# To do list [Express.js]

The program is a to-do list application built using Express.js. It allows users to create accounts and add tasks to their profiles

## Main Models

#### User

| Parameter   | Type      | Description                       |
| :---------- | :-------- | :-------------------------------- |
| `id`        | `integer` | **Required**. Id of item to fetch |
| `firstName` | `string`  | **Required**. First name of user  |
| `surname`   | `string`  | **Required**. Surname of user     |
| `email`     | `string`  | **Required**. Email of user       |

### Task

| Parameter     | Type      | Description                                      |
| :------------ | :-------- | :----------------------------------------------- |
| `id`          | `number`  | **Required**. Id of item to fetch                |
| `title`       | `string`  | **Required**. Title of the task                  |
| `description` | `string`  | Description of the task                          |
| `isImportant` | `boolean` | **Required**. Indicates if the task is important |
| `endDate`     | `date`    | **Required**. End date of the task               |
| `userId`      | `number`  | **Required**. Id of the associated user          |

## Getting Started

### Install yarn globally

```
  npm install --global yarn
```

### Copy .env.example file

```
  on OSX run cp .env.example .env
  on Windows run copy .env.example .env
```

### Run server

```
  yarn docker:up
  yarn dev
```

### Run tests

```
  yarn test
```

## Tech Stack

**Server:** Node, Express, Sequelize, Cors, Dotenv, htttp-errors, Joi, Jest, Eslint, Nodemon, Supertest,
