const mongoose=require("mongoose");

const DB="mongodb+srv://users:users123@mern-stack.zde5pix.mongodb.net/mern-stack?retryWrites=true&w=majority"


mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("connection start")).catch((error)=>console.log(error.message))