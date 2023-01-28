
# Login system with node js

In this project I create a basic login system with help of express.

## Authors

- Sandip Mandal


## 🛠 Require Skills
You must have the basic knowledge of HTML, CSS, JavaScript, Express JS & Mongodb to undestand this project.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`APP_NAME=Login System `

`PORT=<add port no.>`

`MONGODB_CONNECTION_STRING=<add mongodb connection string>`

`COOKIE_SECRET=<add cookie secret key>`

`JWT_SECRET=<add jwt secret key>`

`JWT_EXPIRY=<add jwt expiry time>`

86400000 - for oneday

`COOKIE_NAME=<add cookie name>`
## To create any secret key

You can create any secret key by using this website

[Wordpress salt generator](https://api.wordpress.org/secret-key/1.1/salt/)


[sha1 online](http://www.sha1-online.com/)
## Run Locally

Make sure all dependencies are installed in your project directory.

```bash
  git clone https://github.com/smproject09/login-system-with-node-js.git
```

Go to the project directory

```bash
  cd login-system-with-node-js
```

Install dependencies

```bash
  yarn install
```

Start the server

```bash
  yarn start
```
