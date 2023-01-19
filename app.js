// External dependencies
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Internal dependencies
const {notFoundHandler, errorHandler} = require('./middleware/common/errorHandler.js');
const logingRouter = require('./router/logingRouter');
const registerRouter = require('./router/registerRouter');
const dashboardRouter = require('./router/dashboardRouter');
const userRouter = require('./router/userRouter');

// Configuration
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser(process.env.COOKIE_SECRET));

// Database connection
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
.then(()=> console.log('Database connection successful.'))
.catch((err)=>console.log('Database connection failed!'));

// Routing
app.use("/", logingRouter);
app.use("/register", registerRouter);
app.use("/dashboard", dashboardRouter);
app.use("/user", userRouter);

// 404 (not found) error handeling
app.use(notFoundHandler);

// default error handeling
app.use(errorHandler);

// lestening port
app.listen(process.env.PORT, ()=> console.log(`Lestening on port: ${process.env.PORT}`));