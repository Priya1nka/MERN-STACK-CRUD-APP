import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import { useParams } from 'react-router-dom';

const Detail = () => {

  const {id} = useParams("")
  console.log(id);

  const navigate=useNavigate("")

  const [getusersdata, setUserdata] =useState([]);
  console.log(getusersdata)

  const getdata =async()=>{

    
    const res=await fetch(`http://localhost:8003/getuser/${id}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        },
       
    })

    const data=await res.json();
    console.log(data);
    if(res.status === 422 || !data){

        console.log("error");
    }
    else{
      setUserdata(data)
        console.log("get data")
    }
  }


  useEffect(()=>{
    getdata();
  })


  const deleteuser =async(id)=>{
    const res2=await fetch(`http://localhost:8003/deleteuser/${id}`,{
       method:"DELETE",
       headers:{
           "Content-Type":"application/json"
       }
    })
    const deletedata = await res2.json();
    console.log(deletedata);           

    if(res2.status === 422  || !deletedata){
       console.log("error");
    }else{
       console.log("user deleted");
      navigate("/")
    }
 }




  return (
    <div className='container mt-3'>
      <NavLink to="/"><h2>Go to Back Home</h2></NavLink>
        <h1 style={{fontWeight:400}}> {getusersdata.name}</h1>
        <Card sx={{ maxWidth: 600 }}>
      <CardContent>
      <div className='add_btn'>
      <NavLink to={`/edit/${getusersdata._id}`}><button className='btn btn-primary mx-2'><EditIcon/> </button></NavLink>
      <button className='btn btn-danger' onClick={()=>deleteuser(getusersdata._id)}><DeleteRoundedIcon/></button>
      </div>
      <div className='row'>
      <div className='left_view col-lg-6 col-md-6 col-12'>
        {/* <img src='/profile.png' style={{width:50}} alt='profile'/> */}
        <h3 className='mt-3'>Name : <span style={{fontWeight:400}}>{getusersdata.name}</span></h3>
        <h3 className='mt-3'><EmailIcon/>Email : <span style={{fontWeight:400}}>{getusersdata.email}</span></h3>
        <h3 className='mt-3'><LockIcon/> Password : <span style={{fontWeight:400}}>{getusersdata.password}</span></h3>
        </div>
         <div className='right_view col-lg-6 col-md-6 col-12'>
         <h3 className='mt-3'><CalendarTodayIcon/>DOB : <span style={{fontWeight:400}}>{getusersdata.dob}</span></h3>
         <h3 className='mt-3'><AddIcCallIcon/>Mobile No. : <span style={{fontWeight:400}}>{getusersdata.mobno}</span></h3>
         </div>
      </div>
      </CardContent>
      </Card>
    </div>
  );
}

export default Detail;
