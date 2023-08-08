import React, { useEffect, useState ,useContext} from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { NavLink } from 'react-router-dom';
import { adddata, deletedata } from './context/ContextProvider.js';
import { updatedata } from './context/ContextProvider.js';



const Home = () => {

    const [getuserdata, setUserdata] = useState([]);
    console.log(getuserdata);

    const {udata,setUdata} =useContext(adddata)
    const {updata,setUPdata}=useContext(updatedata)
    const {dltdata,setDLTdata}=useContext(deletedata)



    const getdata = async (e) => {


        const res = await fetch("http://localhost:8003/getdata", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },

        })

        const data = await res.json();
        console.log(data);
        if (res.status === 422 || !data) {

            console.log("error");
        }
        else {
            setUserdata(data)
            console.log("get data")
        }
    }


    useEffect(() => {
        getdata();
    }, [])


    const deleteuser = async (id) => {
        const res2 = await fetch(`http://localhost:8003/deleteuser/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const deletedata = await res2.json();
        console.log(deletedata);

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            console.log("user deleted");
            setDLTdata(deletedata)
            getdata();
        }
    }



    return (
        <>
        {
            udata ?
            <>
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <strong>{udata.name}</strong> Added succesfully! 
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            </>:""
        }
        {
            updata ?
            <>
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <strong>{updata.name}</strong> Updated succesfully! 
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            </>:""
        }
        {
            dltdata ?
            <>
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>{dltdata.name}</strong> Deleted succesfully! 
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            </>:""
        }
            
            <div className='mt-5'>
                <div className='container'>
                    <div className='add_btn mt-2'>
                        <NavLink to="/register" className='btn btn-primary'> + Add Data</NavLink>
                    </div>

                    <table class="table mt-5">
                        <thead>
                            <tr className='table-dark'>
                                <th scope="col">ID</th>
                                <th scope="col">User Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Password</th>
                                <th scope="col">DOB</th>
                                <th scope="col">Mob No</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                getuserdata.map((element, id) => {
                                    return (
                                        <>
                                            <tr>
                                                <th scope="row">{id + 1}</th>
                                                <td>{element.name}</td>
                                                <td>{element.email}</td>
                                                <td>{element.password}</td>
                                                <td>{element.dob}</td>
                                                <td>{element.mobno}</td>
                                                <td className='d-flex justify-content-between'>
                                                    <NavLink to={`view/${element._id}`}><button className='btn btn-success'><RemoveRedEyeIcon /></button> </NavLink>
                                                    <NavLink to={`edit/${element._id}`}><button className='btn btn-primary'><EditIcon /> </button></NavLink>
                                                    <button className='btn btn-danger' onClick={() => deleteuser(element._id)}><DeleteRoundedIcon /></button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }


                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
export default Home;