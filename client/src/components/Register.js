import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { adddata } from './context/ContextProvider';
const Register = () => {

    const {udata,setUdata} =useContext(adddata)
     
    const navigate = useNavigate();
    const[inpval,setINP]=useState({
        name:"",
        email:"",
        password:"",
        dob:"",
        mobno:""


    })

    
      const setdata=(e)=>{
        console.log(e.target.value);
        const {name,value} = e.target;
        setINP((preval)=>{
            return{
                ...preval,
                [name]:value
            }
        })
      }

      const addinpdata =async(e)=>{
        e.preventDefault();

        const {name,email,password,dob,mobno}=inpval;
        const res=await fetch("http://localhost:8003/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                name,email,password,dob,mobno
            })
        })

        
        const data=await res.json();
        console.log(data);



        if(res.status  ===  422 || !data){
            alert("User is Already Present");
            console.log("error");
        }
        else{
        
            navigate("/");
            setUdata(data)
            console.log("data added")
            
        }
      }
    

    return (
        <div className='container'>
            <NavLink to="/">Go to Home</NavLink>
            <form className='mt-4'>
            <div className='row'>
                <div className="mb-3 col-lg-6 col-md-6 col-12">
                    <label for="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text" name='name' value={inpval.name} onChange={setdata}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3 col-lg-6 col-md-6 col-12">
                    <label for="exampleInputPassword1" className="form-label">Email</label>
                    <input type="email" name='email' value={inpval.email} onChange={setdata}  className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3 col-lg-6 col-md-6 col-12">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name='password' value={inpval.password} onChange={setdata}  className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3 col-lg-6 col-md-6 col-12">
                    <label for="exampleInputPassword1" className="form-label">DOB</label>
                    <input type="date"  name='dob' value={inpval.dob}  onChange={setdata}  className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3 col-lg-6 col-md-6 col-12">
                    <label for="exampleInputPassword1" className="form-label">Mobile Number</label>
                    <input type="number" name='mobno' value={inpval.mobno}  onChange={setdata}  className="form-control" id="exampleInputPassword1" />
                </div>    
             <button type="submit" onClick={addinpdata} className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Register;
