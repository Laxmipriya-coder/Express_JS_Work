const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors({
    origin:"*"
}))

// GET REQUST
app.get("/health",(req,res)=>{
    res.status(200).json({message:"I am Ok"});
});

// POST REQUST
app.post("/register",(req,res)=>{
    console.log(req.body);
    res.status(201).json({message:"Register Successfully"});
})

// PUT REQUST
app.put("/updateprofile/:id",(req,res)=>{
    const {id} = req.params;
    console.log(id);
    console.log({id,...req.body});
    res.status(200).json({message:"Profile Updated Successfully"})
})

// DELETE REQUST
app.delete("/deleteuser/:userid",(req,res)=>{
    const {userid} = req.params;
    console.log(userid);
    res.status(200).json({message:"Profile Deleted"})
})

app.listen(8090,()=>{
    console.log("Server is running........");
})