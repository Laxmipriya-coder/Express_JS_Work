const fs = require("fs");
const crypto = require("crypto");
const { profile } = require("console");

// GET ALL USERS CONTROLLER
const getallUsersController = (req, res) => {
    try {
        const allusers = JSON.parse(fs.readFileSync('./data/users.json', "utf8"));
        res.status(200).json({ data: allusers })
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error", error })
    }
}

// POST USERS
const createUserController = (req, res) => {
    try {
        const { username, age, gender, email } = req.body;
        if (!username || !age || !gender || !email) {
            return res.status(400).json({ message: "invalid data | insufficient data" })
        }
        // Auto Generated ID
        const userData = {
            id: crypto.randomUUID(),
            username,
            age,
            gender,
            email
        }
        const allusers = JSON.parse(fs.readFileSync("./data/users.json", "utf8"))
        allusers.push(userData);
        fs.writeFileSync("./data/users.json", JSON.stringify(allusers, null, 2))
        return  res.status(201).json({ message: "User added Successfully" })
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error", error })
    }
}


// GET USER BY ID
const getUserBYIdController = (req, res) => {
    try {
        const { id } = req.params;
        const allusers = JSON.parse(fs.readFileSync("./data/user.json", "utf8"));

        const currentUser = allusers.find((user) => user.id === id.trim())
        if (!currentUser) {
            return res.status(404).json({ message: "User Not Found" })
        }
        res.status(200).json({ profile: currentUser })
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error
        })
    }
}

// UPDATE USER BY ID
const updateUserByIdController = (req, res) => {
    try {
        const { id } = req.params;
        const { username, age, gender, email } = req.body
        const allusers = JSON.parse(fs.readFileSync("./data/user.json", "utf8"));
        const currentUser = allusers.find((user) => user.id === id);
        if (!currentUser) {
            res.status(400).json({ message: "User not Found" });
        }
        if (!username || !age || !gender || !email) {
            res.status(400).json({ message: "Invalid data" })
        }
        const newdata = {
            ...currentUser,
            username,
            age,
            gender,
            email
        }
        const newList = allusers.map((user) => user.id === currentUser.id ? newdata : user);

        fs.writeFileSync("./data/user.json", JSON.stringify(newList, null, 2));

        res.status(200).json({ message: `UserId: ${id} is Updated Successfully` })
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}

// DELETE USER BY ID
const deleteUserByIdController = (req, res) => {
    try {
        const { id } = req.params;
        const allusers = JSON.parse(fs.readFileSync("./data/user.json", "utf8"));
        const currentUser = allusers.find((user)=> user.id === id)
        if(!currentUser){
            res.status(404).json({message:"User Not Found"})
        }
        const newList = allusers.filter((user)=>user.id !== id)
        fs.readFileSync("./data/user.json",JSON.stringify(newList,null,2));
        res.status(200).json({ message: `UserId: ${id} is Deleted Successfully` })

    } catch (error) {

        res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports = { getallUsersController, createUserController, getUserBYIdController, updateUserByIdController,deleteUserByIdController }

