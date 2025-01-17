import { useEffect, useState } from "react";
import config from '../config';
import { useNavigate, useParams } from "react-router-dom";
import Cookies from 'js-cookie';
function ResetPassword()
{
    const navigate= useNavigate()
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmPassword] = useState('')
    const [ShowPassword , setShowPassword] = useState(false )
    const [responseMessage, setResponseMessage] = useState(''); 
    const [errorMessage,setErrorMessage]=useState()
    const [showAlert, setShowAlert] = useState(false ); 
    const {token} = useParams()
    useEffect(() => {
        if (responseMessage?.status === "success") {
          Cookies.remove(config.COOKIENAME);
          navigate('/login');
        }
      }, [responseMessage, navigate]);
    

    useEffect(()=>
    {
        setShowAlert(true)


    },[responseMessage])

  const handleClose = () => {
    console.log(" handle clos e")
    setShowAlert(false); // Hide the alert when close is clicked
    setNewPassword(''); // Optionally clear the backendResponse state
    setConfirmPassword(''); 
     
};
    const handleSubmit=()=>{
        
        // if (newPassword.length >6 || newPassword.length<15)
        // {
        //     setShowAlert(true )
        //     setErrorMessage("passwort must be greater than 6 and less than 15")
        //     console.log("error in length")
        // }
        if (newPassword !==confirmNewPassword)
        {
            setShowAlert(true )
            setErrorMessage("password and confirm password doesnot match")
            console.log("password mismatch")
            return 
        }

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

        console.log(" api call ")
        const currentUrl = window.location.href;
        const token = currentUrl.split('/reset-password/')[1];

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${access_token}`)

        const raw = JSON.stringify({
        "new_password": newPassword
        });
        console.log(raw)

        const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
        };

        fetch(`${config.RESETPASSWORDTOKEN}${token}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {setResponseMessage(result); console.log(result)})
        .catch((error) => console.error(error));

    }
return (<>
    <style>
        {
            `
            
                .global_div_reset_password{
                
                width:100vW;
                height:100vh;
                display:flex;
                justify-content:center;
                align-items:center;
            
            
                }
                
                input[type="text"], input[type="password"]
                {
                padding: 15px 50px;
                width:100%;
                max-width:800px;
                box-shadow:1px 1px 7px  rgba(0, 0, 0, 0.8);
                border-radius:5px;
                 box-sizing: border-box;
              
                
                }
          

                .main_div_reset_password{
                display:flex;
                flex-direction:column;
                border-radius:10px;
                padding:5%;
                background-color:white ;
                border: 2px None ;
                box-shadow:1px 1px 10px rgba(0, 0, 0, 0.5);
                 gap :15px;
                }
                .main_div_reset_password>div
                {
                
                display:flex;
                flex-direction:column;
                // align-items:center;
                
                gap :15px;
                }
                .submitButton
                {
                border:1px ;
                padding:3%;
                
                background-color:#2e94b9;
                transition: background-color 0.3s ease, border-color 0.3s ease; /* Smooth transition for hover effect */

                


                }
                .submitButton:hover
                {
                
                background-color:#3ab1c8;

                }
                .div_for_submit_button{
                
                padding-top:40px;
                
                
                }
                

                
            `
        }
    </style>





        <div className="global_div_reset_password">

                <div className="main_div_reset_password">
                   
                   <center> <p style={{paddingBottom:"20px"}}>
                        <u>
                            <i> 
                                Reset - Password 
                            </i>
                        </u>
                    </p>
                    </center>
                    <div className="div_for_password">
                        <label>
                            Password 

                        </label>
                        <input type={ShowPassword?"text":"password"}  placeholder="New Password" onChange={(e)=>{setNewPassword(e.target.value)}}/>

                    </div>

                    <div className="div_for_conirm_password">
                    <label>
                            confirm - Password 

                        </label>
                        <input type={ShowPassword?"text":"password"}  placeholder="Re-enter Password" onChange={(e)=>{setConfirmPassword(e.target.value)}}/>


                    </div>

                    <div className="div_for_show_password">
                        <label> 
                            
                        <input type = "checkbox"   onChange={(e)=>{setShowPassword(e.target.checked)}}  />
                           &nbsp;&nbsp;show password 
                        </label>
                        <br />
                    </div>
                    
                    <div>
              



{responseMessage?.status =="failure"&& showAlert&&(
 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
 <strong className="font-bold">Holy smokes!</strong>
 <span className="block sm:inline">{responseMessage?.message}</span>
 <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
   <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" onClick={handleClose} ><title >Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
 </span>
</div>
)}
{/* 
 {responseMessage?.status =="success"&& Cookies.remove('LoginDetails')  &&  navigate('/login') */}
 
 
{errorMessage && showAlert && (
 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
 <strong className="font-bold">Holy smokes!</strong>
 <span className="block sm:inline">{errorMessage}</span>
 <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
   <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" onClick={handleClose} ><title >Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
 </span>
</div>
)}


                    </div>

                    <div className="div_for_submit_button">

                        <button type ="submit" onClick={()=>{handleSubmit()}}  className="submitButton" > reset-password </button>

                    </div>

                    <div>

                    <div style={{"display":"flex"}}>
                                                    
                            <button   onClick={()=>{navigate('/login')}}type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Login</button>

                            <button  onClick={()=>{navigate('/register')}} type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Register</button>


                            <button  onClick={()=>{navigate('/forget-password')}} type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">forget password</button>


                    </div>
                    </div>

                    

                </div>
                
        </div>


</>)





}

export default ResetPassword;