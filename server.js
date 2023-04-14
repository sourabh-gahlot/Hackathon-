const express = require("express");

const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DPASS);

const app = express()
mongoose.connect(DB, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
  useUnifiedTopology: true,
}).then(()=>console.log("Db connection sucessful"))


app.use(express.json())


app.listen(process.env.PORT,()=>{
  console.log(`server is Up and runing on Port ${process.env.PORT}`)
})
