# React GraphQL Template

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://choosealicense.com/licenses/mit/)
![License](https://img.shields.io/badge/Made%20with-React-darkgreen.svg)
[![Github Commits](https://img.shields.io/github/commit-activity/w/HobbaZ/React-Graphql-Template)](https://github.com/HobbaZ/React-Graphql-Template/commits)
[![GitHub latest commit](https://img.shields.io/github/last-commit/HobbaZ/React-Graphql-Template)](https://github.com/HobbaZ/React-Graphql-Template/branches)
[![GitHub followers](https://img.shields.io/github/followers/HobbaZ.svg)]()
![GitHub repo size](https://img.shields.io/github/repo-size/HobbaZ/React-Graphql-Template)
[![GitHub issues](https://img.shields.io/github/issues/HobbaZ/React-Graphql-Template)](https://img.shields.io/github/issues/HobbaZ/React-Graphql-Template)
![GitHub forks](https://img.shields.io/github/forks/HobbaZ/React-Graphql-Template)
![GitHub language count](https://img.shields.io/github/languages/count/HobbaZ/React-Graphql-Template)

## Description

### Project Aim

To create a simple React app with GraphQL MongoDB database to be used as a template to develop websites quicker.

### What Problem Does It Solve

Starting a React website from scratch

### What I Learnt

How to use GraphQL with React

## Deployment

Deployed on Heroku [here](https://react-graphql-template.herokuapp.com/)

## Table of Contents

- [Description](#description)
- [User Story](#user-story)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Features](#features)
- [Technology](#technology)
- [Contributors](#contributors)
- [Acknowledgements](#acknowledgements)
- [Testing](#testing)
- [License](#license)
- [Questions](#questions)

## User Story

Create a template for basic setup of a React SPA with a GraphQL backend.

## Screenshots

![the home page](./assets/images/screencapture-react-graphql-template-herokuapp-2022-08-23-10_17_54.png)

![the login page](./assets/images/screencapture-react-graphql-template-herokuapp-login-2022-08-23-10_25_18.png)

![the signup page](./assets/images/screencapture-react-graphql-template-herokuapp-signup-2022-08-23-10_26_24.png)

![The profile page](./assets/images/screencapture-react-graphql-template-herokuapp-profile-2022-08-23-10_07_54.png)

## Installation

Need to install MongoDB local server before trying to run this project, check the MongoDB documentation: [https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/)

1. Clone the repo to your computer by clicking the green code button and copying the SSH version.

2. Open Gitbash in your desired folder and type `git clone ` then right click to paste the string and hit enter. The repo will then be cloned to your computer.

3. Navigate to the repo folder and type `code .` into gitbash to open the repo in VS Code.

4. Open a new Terminal in VS Code and type `npm install` to install the repo dependencies.

5. Create a .env file like the image below in the server folder and input your database details.

![example .env file](./client/src/images/envExample.PNG)

6. Install concurrently as dev dependency `npm i concurrently -D` at root folder

7. Start your local MongoDB server by going to the location mongoDB was installed or opening Gitbash and cd ing to it.

   The location path is usually similar to this: `C:\Program Files\MongoDB\Server\<server version number>\bin`

   Then type mongod into Gitbash and hit enter. This will start a local server.

8. Then open Mongo Compass and connect to the local server by typing:
   `mongodb://localhost:27017/`

9. Finally, type `npm run develop` into the terminal and it will start the dev server at localhost:3000.

## Features

- Can create an account, delete your account and update your details.
- User Authentication for profile and login routes.
- Login, signup, home, profile, about and contact pages.
- Express server already set up and ready to go.
- MongoDB database ready, change details in .env file to connect yours.
- Fontawesome icons used where appropriate.

## Technology

- Express
- Heroku
- GraphQL
- React
- JWT
- MongoDB
- Bootstrap

## Contributors

[Zachary Hobba](https://github.com/HobbaZ)

You can also contribute by opening a pull request or submitting an issue.

## Acknowledgements

[Custom mongoDB error messages from Stack overflow](https://stackoverflow.com/questions/61324293/mongoose-e11000-duplicate-key-change-the-type-of-return-message-in-case-of-erro)

[MongoDB error handling middleware](https://mongoosejs.com/docs/middleware.html#error-handling-middleware)

Background photo is by [Geran de Klerk](https://unsplash.com/@gerandeklerk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) [forest](https://unsplash.com/s/photos/forest?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

Important: Code to kill port processes if something running on port 3000 error `npx kill-port 3000`, type into your VS Code terminal and hit enter, will kill port 3000 and let you run the app.

## Testing

No tests yet

## License

MIT

**Copyright 2022 Zachary Hobba**

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Questions

Find me on Github at [HobbaZ](https://github.com/HobbaZ)

If this has helped you with your web development, consider buying me a Coffee (only costs $3) at [zachobba](https://buymeacoffee.com/zachobbaS)

Email me at [zachobba@gmail.com](zachobba@gmail.com)
