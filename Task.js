const express = require("express");
const fs = require("fs");
const { getallUsersController, createUserController, getUserBYIdController } = require("./controllers/filesystemController");

const app = express();
app.use(express.json())

// GET METHOD FOR ALL USERS TO GET THE ALL USERS
app.get("/allusers",getallUsersController);

// CREATE USER (POST METHOD)
app.post("/createuser",createUserController);

// GET INDIVIDUAL USER DATA WITH ID 
app.get("/profile/:id",getUserBYIdController);


app.listen(8070, () => {
    console.log("Server is Running.....");
})