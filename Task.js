const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json())

// GET METHOD FOR ALL USERS TO GET THE ALL USERS
app.get("/allusers", (req, res) => {
    const data = fs.readFileSync("./users.json", "utf8");
    console.log(data);
    res.status(200).json({ message: "Hello From Get Request" })
});

// CREATE USER (POST METHOD)
app.post("/createuser", (req, res) => {
    const newUser = {
        id: Date.now(),
        ...req.body
    }
    const data = JSON.parse(fs.readFileSync("./users.json", "utf8"))
    data.push(newUser);
    // console.log(newUser);
    fs.writeFileSync("./users.json", JSON.stringify(data, null, 2))
    res.status(201).json({
        message: "User Added Successfully",
        data: newUser
    });
});

// GET INDIVIDUAL USER DATA WITH ID 
app.get("/profile/:id",(req,res)=>{
    const {id} = req.params;
    const data = JSON.parse(fs.readFileSync("./users.json","utf8"));
    const users = data.find((user)=> user.id === Number(id));
    if(!users){
        return res.status(200).json({message:"User Not Found......"});
    }
    res.status(200).json({
        message:"User Not Found......",
        data:users
    });
})


app.listen(8090, () => {
    console.log("Server is Running.....");
})