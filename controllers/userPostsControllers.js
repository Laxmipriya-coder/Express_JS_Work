const fs=require("fs")
const crypto=require("crypto")
const { getAllData, isExistUserById } = require("../utils/utils")
const { time } = require("console")

const getAllPostsByUserIdController=(req,res)=>{
    try {
        const {userid}=req.params
        const isIdExist=isExistUserById(userid)
        if(!isIdExist){
            res.status(404).json({message:"user Not Found"})
        }
        const allposts=getAllData("./data/posts.json")
        const userPosts=allposts.filter((post)=>post.userid===userid)
        res.status(200).json({userPosts})
    } catch (error) {
        res.status(500).json({message:"Internal server error",error})
    }
}

const createNewPostByUserId=(req,res)=>{
    try {
        const {userid}=req.params
        const {title,loc,img_url,hashtags}=req.body
        const isIdExist=isExistUserById(userid)
        if(!isIdExist){
            res.status(404).json({message:"user Not Found"})
        }
        // validation

        const newPost={
            id:crypto.randomUUID(),
            title,
            loc,
            img_url,
            hashtags,
            time:Date(),
            userid
        }

        const allposts=getAllData("./data/posts.json")
        allposts.push(newPost)

        fs.writeFileSync("./data/posts.json",JSON.stringify(allposts,null,2))
        res.status(201).json({message:`userid: ${userid} upload post successfully`})
    } catch (error) {
        res.status(500).json({message:"Internal server error",error})
    }
}

module.exports={getAllPostsByUserIdController,createNewPostByUserId}