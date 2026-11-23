const express= require("express");
const { getallusersController, createUserController, getUserByIDController, updateUserByIdController, deleteUserByIdController } = require("./controllers/filesystemControllers");
const { getAllPostsByUserIdController, createNewPostByUserId } = require("./controllers/userPostsControllers");
const cors = require("cors");

const app=express();
app.use(express.json())
app.cors=({
    origin:"*"
})


// routes
// methods: GET,POST, PUT, PATCH, DELETE
// syntax:  app.method("path",middleware,controller)

// health route

// GET REQUEST
app.get("/health",(req,res)=>{
    res.status(200).json({message:"i am Ok"})
})

// // POST REQUEST
// app.post("/register",(req,res)=>{
//    console.log(req.body);
//    res.status(201).json({message:"Register successfully"})
// })

// // PUT REQUEST

// app.put("/updateprofile/:userid",(req,res)=>{
//     const {userid}=req.params
//     console.log(userid);
//     console.log({userid,...req.body});

//     res.status(200).json({message:"profile updated"})
// })

// // DELETE REQUEST

// app.delete("/deleteuser/:userid",(req,res)=>{
//     const {userid}=req.params
//     console.log(userid);
//     res.status(200).json({message:"user deleted"})
// })


//! user APIs
app.get("/allusers",getallusersController)
app.post("/createuser",createUserController)
app.get("/user/:id",getUserByIDController)
app.put("/update/:id",updateUserByIdController)
app.delete("/delete/:id",deleteUserByIdController)

//! User Posts APIs

app.get("/userposts/:userid",getAllPostsByUserIdController)
app.post("/createnewpost/:userid",createNewPostByUserId)


app.listen(8090,()=>{
    console.log("server is running");
})