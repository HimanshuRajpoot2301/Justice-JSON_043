const express = require("express");
const conectTodb = require("./configs/db");
require("dotenv").config();
const session= require("express-session");
const MongoStore = require('connect-mongo');
const app = express();
const authRoute = require("./routes/auth");
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
      // secure: true,
      httpOnly: true,
    }
  }));
app.get('/',(req,res)=>{
    try {
        res.send("This is a home route")
        console.log("this is the home route")
    } catch (error) {
        console.log("err in home route");
    }
})
app.use('/auth',authRoute)


const port = process.env.PORT || 3000;
const mongo_url = process.env.MONGO_URI;

app.listen(port,()=>{
    try {
        conectTodb(mongo_url);
        console.log("server listening on port");
    } catch (error) {
        
    }
})