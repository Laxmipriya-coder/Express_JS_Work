const fs=require("fs")

const getAllData=(url)=>{
    const alldata=JSON.parse(fs.readFileSync(url,"utf-8"))
    return alldata;
}

const isExistUserById=(id)=>{
    const allusers=JSON.parse(fs.readFileSync("./data/user.json","utf-8"))
    const currentUser=allusers.find((user)=>user.id===id)
    return currentUser ? true : false
}
module.exports={getAllData,isExistUserById}