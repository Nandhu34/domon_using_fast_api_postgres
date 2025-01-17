import React, { useEffect, useState } from "react";
import config from '../config'
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
export default function Login() {
    const navigate= useNavigate();

    const [email , setEmail ]= useState()
    const [password , setPassword]= useState()
    const [role,setRole]= useState('user')
    const [backendResponse, setBackendResponse ] = useState({})
    const [showAlert, setShowAlert] = useState(true); // State to control the visibility of the popup

  const handleClose = () => {
    console.log(" handle clos e")
    setShowAlert(false); // Hide the alert when close is clicked
    setBackendResponse({}); // Optionally clear the backendResponse state
    setEmail(''); 
    setPassword(''); 
        setRole('');
};


useEffect(() => {
  if (showAlert && backendResponse?.status === "success") {
    const userData = {
      email: email,
      role: role,
      access_token: backendResponse?.access_token,
      refresh_token: backendResponse?.refresh_token,
    };

    console.log(userData)
    // Set the cookie
    Cookies.set(config.COOKIENAME, JSON.stringify(userData), { expires: 7, path: '', secure: true });

    // Navigate to the home page
    navigate('/home');
  }
}, [showAlert, backendResponse, email, role, navigate]);

    useEffect(()=>
        {

                {backendResponse?.detail?.[0]?.msg && setShowAlert(true )}
        },[backendResponse])
    const handleSubmit = (event) => {
        event.preventDefault();  
        // console.log("Form submitted with values: ", { email, password, role });
       const login_url= config. LOGIN_BACKEND_URL
       const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
        "email": email,
        "password":password,
        "role": role 
        });

        const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
        };

        fetch(login_url, requestOptions)
        .then((response) => response.json())
        .then((result) => {setBackendResponse( result); console.log(result)})
        .catch((error) => console.error(error));
            };

           
  return (
    
  
   <>
   <div className="flex flex-col h-screen bg-gray-100">
    <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        <div className="flex">
            {/* {console.log(backendResponse.detail[0].msg)} */}
            <span className="text-center font-bold my-20 mx-auto">        
                <a href="https://egoistdeveloper.github.io/twcss-to-sass-playground/" target="_blank" className="text-blue-600">
                    welcome to DOMON !
                </a>
            </span>
        </div>

        <div className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
            px-6 py-10 sm:px-10 sm:py-6 
            bg-white rounded-lg shadow-md lg:shadow-lg">
            <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
                Login
            </h2>

            <form className="mt-10" onSubmit={handleSubmit}>

                <label htmlFor="email" className="block text-xs font-semibold text-gray-600 uppercase">E-mail</label>
                <input value={email} id="email" type="email" name="email" placeholder="e-mail address" autoComplete="email"
                    className="block w-full py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                    required  onChange={(e)=>{setEmail(e.target.value )}}/>
                    
                <label htmlFor="password" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Password</label>
                <input  value ={password}id="password" type="password" name="password" placeholder="password" autoComplete="current-password"
                    className="block w-full py-3 px-1 mt-2 mb-4
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                    required  onChange={(e)=>{setPassword(e.target.value)}}/>

                <label htmlFor="role" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Role</label>
                <select  value ={role} id="role" name="role" className="block w-full py-3 px-1 mt-2 mb-4
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200" required onChange={(e)=>{setRole(e.target.value)}}>
                    <option value="admin">admin</option>
                    <option value="user">user</option>
                    {/* <option value="superuser">Super User</option> */}
                </select>
                {console.log(backendResponse?.detail?.[0]?.msg,"msg")}
                {showAlert && backendResponse?.detail?.length > 0 && (
  <div>
    {backendResponse?.detail?.map((error, index) => (
      <div
        key={index}
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Holy smokes!</strong>
        <span className="block sm:inline">{error?.msg}</span>
        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg
            className="fill-current h-6 w-6 text-red-500"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            onClick={handleClose}
          >
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
          </svg>
        </span>
      </div>
    ))}
  </div>
)}



  {showAlert && backendResponse?.status ==="failure" && (
 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
 <strong className="font-bold">Holy smokes!</strong>
 <span className="block sm:inline">{backendResponse?.message}</span>
 <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
   <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" onClick={handleClose} ><title >Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
 </span>
</div>
)}




          
                <button type="submit"
                    className="w-full py-3 mt-10 bg-gray-800 rounded-sm
                    font-medium text-white uppercase
                    focus:outline-none hover:bg-gray-700 hover:shadow-none"  >
                    Login
                </button>

                <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
                    <a href={`${config.BASE_URL}/forget-password`} className="flex-2 underline">
                        Forgot password?
                    </a>

                    <p className="flex-1 text-gray-500 text-md mx-4 my-1 sm:my-auto">
                        or
                    </p>
        
                    <a href={`${config.BASE_URL}/register`} className="flex-2 underline">
                        Create an Account
                    </a>
                </div>
            </form>
        </div>
    </div>
</div>

   </> 
    );
}