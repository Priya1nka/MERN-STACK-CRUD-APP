const express=require("express");
const router=express.Router();
const users=require("../models/usersSchema.js")

// router.get("/",(req,res)=>{
//     console.log("connect");
// })


router.post("/register",async(req,res)=>{
   // console.log(req.body);
   const {name,email,password,dob,mobno}=req.body;

   if(!name || !email || !password || !dob || !mobno){
    res.status(422).json("Plz fill the data")
   }
   try{
       
    const preuser= await users.findOne({email:email})
    console.log(preuser)

    if(preuser){
        res.status(422).json("this user user is already present")
    }else{
        const addUser = new users({
            name,email,password,dob,mobno
        })
        await addUser.save();
        res.status(201).json()
        console.log(addUser)
    }

   }catch(error){
    res.status(422).json(error)
   }
})

//get user data
router.get("/getdata",async(req,res)=>{
    try{
        const userdata= await users.find();
        res.status(201).json(userdata)
        console.log(userdata);

    }catch(error){
        res.status(422).json(error)
    }
})
module.exports=router;

//get individual user

router.get("/getuser/:id",async(req,res)=>{
    try{
      console.log(req.params)
      const {id}=req.params;
      const userindividual= await users.findById({_id:id})
      console.log(userindividual)
      res.status(201).json(userindividual)
    }catch(error){
        res.status(422).json(error)

    }
})


//update user
router.patch("/updateuser/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        const updateduser=await users.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updateduser);
        res.status(201).json(updateduser)
       
    }catch(error){
          res.status(422).json(error)
    }
})

//delete user
router.delete("/deleteuser/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        const deleteuser=await users.findByIdAndDelete({_id:id})

        console.log(deleteuser);
        res.status(201).json(deleteuser)
       
    }catch(error){
          res.status(422).json(error)
    }
})

module.exports=router;