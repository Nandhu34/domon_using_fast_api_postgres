import React, { useState } from "react"; 
import config  from '../config'
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";


function  ForgetPassword()
{
    const navigate= useNavigate()
    const [registeredEmail,setRegisteredEmail] = useState('')
    const [role , setRole ] = useState('user')
    const [responseMessage, setResponseMessage] = useState(''); 
    const [errorMessage , setErrorMessage] = useState('')
    const [showAlert, setShowAlert] = useState(true); // State to control the visibility of the popup

  const handleClose = () => {
    console.log(" handle clos e")
    setShowAlert(false); // Hide the alert when close is clicked
    setRegisteredEmail({}); // Optionally clear the backendResponse state
    setRegisteredEmail(''); 
     
        setRole('');
};


    const handleApiCall=async()=>
    {
        console.log(" making api call ")
        const loginDetails = Cookies.get(config.COOKIENAME);
    if (!loginDetails) {
      console.error("LoginDetails cookie not found");
      setErrorMessage("LoginDetails cookie not found")
      return;
    }

const { access_token } = JSON.parse(loginDetails);
console.log(loginDetails)
     
    if (!access_token) {
      console.error("Access token not found in LoginDetails");
      setErrorMessage("accesstoken cookie not found")
      return;
    }

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization",`Bearer ${access_token}`);

        const raw = JSON.stringify({
        "email": registeredEmail,
        "role": role
        });

        const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
        };

        fetch(config.FORGETPADDWORDURL, requestOptions)
        .then((response) => response.json())
        .then((result) => setResponseMessage(result))
        .catch((error) => console.error(error));
            }
    return (<>
    <style>
        {`
        .forget_password_div{
        display:flex;
        justify-content:center;
        width:100vw;
        height:100vh;
        align-items: center;
         }
        .forgetPasswordBox{
         box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
         padding:6%;
         display:flex;
         flex-direction: column;
         gap:20px;
        
        }
        input[type=text]
         {
        padding:15px;
        box-shadow:0px 0px 5px rgba(0, 0, 0, 0.5);
        
         
         }
        .button{
            border: 1px solid #ccc;
             padding: 10px 20px;
             background-color: #007bff; 
              color: white;
               font-size: 16px;
                border-radius: 5px; 
                 transition: background-color 0.3s ease, border-color 0.3s ease; /* Smooth transition for hover effect */

        }
                 .button:hover {
    background-color: #0056b3; 
    border-color: #004085; 
}
            
         `}
    </style>
    <div className="forget_password_div">
        <div className="forgetPasswordBox">
            <center><p><b><u>Forget Password </u></b></p></center>
            <label>Email </label> 
                <input type="email"  value ={registeredEmail} placeholder="enter registered email"  onChange={(e)=> {setRegisteredEmail(e.target.value )}} />
              
                <label>Role  </label> 
                <select  value ={role}  id="role" name="role" className="block w-full py-3 px-1 mt-2 mb-4
                    text-gray-800 appearance-none 
                    border-b-2 border-black-100
                    focus:text-gray-500 focus:outline-none focus:border-grey-200" required onChange={(e)=>{setRole(e.target.value )}}>
                      <option value="user">user</option>
                    <option value="admin">admin</option>
                
                    {/* <option value="superuser">Super User</option> */}
                </select>

               {responseMessage?.status =="failure"&& showAlert&&(
 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
 <strong className="font-bold">Holy smokes!</strong>
 <span className="block sm:inline">{responseMessage?.message}</span>
 <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
   <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" onClick={handleClose} ><title >Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
 </span>
</div>
)}

 {responseMessage?.status =="success"&&showAlert && (
 <div className="bg-red-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
 <strong className="font-bold">Holy smokes!</strong>
 <span className="block sm:inline">{responseMessage?.message}</span>
 <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
   <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" onClick={handleClose} ><title >Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
 </span>
</div>
)}

              
              
                <button type="submit" className="button" onClick={(e)=>{console.log(" hih"); handleApiCall()}}> get link </button>

                <div style={{"display":"flex" , justifyContent:"space-around"}}>
                <button   onClick={()=>{navigate('/login')}}type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Login</button>

                <button  onClick={()=>{navigate('/register')}} type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Register</button>

                </div>
        </div>

        

        
        
    </div>




    </>)
}


export default ForgetPassword;