import { useEffect, useState } from "react";
import config from '../config';
import Cookies from 'js-cookie';

import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate()
  const [Email, setEmail] = useState('');
  const [ShowPassword, setShowPassword] = useState(false);
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const roles = ["user"];
  const [errorMessage, setErrorMessage] = useState("");  // State for error message
  const [backendResponse, setBackendResponse ] = useState({})
  const [showAlert, setShowAlert] = useState(true); // State to control the visibility of the popup

  useEffect(() => {
    if (showAlert && backendResponse?.status === "success") {
      const userData = {
        email: Email,
        role: "user",
        access_token: backendResponse?.access_token,
        refresh_token: backendResponse?.refresh_token,
      };

      // Set the cookie
      Cookies.set(config.COOKIENAME, JSON.stringify(userData), { expires: 7, path: '', secure: true });

      // Navigate to the home page
      navigate('/home');
    }
  }, [showAlert, backendResponse, Email, navigate]);


  console.log(Email);
  const handleClose = () => {
    console.log(" handle clos e")
    setShowAlert(false); // Hide the alert when close is clicked
    setBackendResponse({}); // Optionally clear the backendResponse state
    setEmail(''); 
    setPassword(''); 
    setConfirmPassword('');
};
  const handleFormSubmit =async  (e)=>
  {
    e.preventDefault();
    setShowAlert(false); 
    setBackendResponse({});
  

    const roleValue = document.querySelector('.role_div select').value;
e.preventDefault();
setErrorMessage("");

if (!Email || !Password || !ConfirmPassword || !roleValue) {
  setErrorMessage("Please fill out all fields.");
  setTimeout(() => setErrorMessage(""), 5000);
  return;
}

if (!(Password.length > 6) || Password.length > 15) {
  setErrorMessage("Password length must be greater than 6 and less than 15.");
  setTimeout(() => setErrorMessage(""), 5000);
  return;
}

if (Password !== ConfirmPassword) {
  setErrorMessage("Passwords do not match.");
  setTimeout(() => setErrorMessage(""), 5000);
  return;
}
console.log("Form submitted", {

  // prompt("Enter the super user password ");
  Email,
  Password,
  role: roleValue,
});


const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "email": Email,
  "username": Email,
  "password":Password,
  "confirm_password":ConfirmPassword,
  "role": roleValue
});
console.log(raw)


const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(config.REGISTER_BACKEND_URL, requestOptions)
  .then((response) => response.json())
  .then((result) => {setBackendResponse( result); console.log(result)})
  .catch((error) => setErrorMessage(error));
  }


  useEffect(() => {
    if (backendResponse?.detail?.[0]?.msg || backendResponse?.status === "failure") {
        setShowAlert(true);
    }
    if (backendResponse?.detail?.[0]?.msg || backendResponse?.status === "success") {
      setShowAlert(true);
  }
}, [backendResponse]);

  return (
    <>
      <style>
        {`
          input[type="text"], input[type="password"] , select , option{
            width: 100%;
            max-width: 400px;
            padding: 3%;
            margin: 1 auto;
            box-sizing: border-box;
            focus:outline-none;
            box-shadow:1px 1px 5px rgba(0, 0, 0, 0.5);
          }

          input[type="checkbox"] {
          margin: 10 auto;
            transform: scale(1.5);
            margin-right: 10px; 
            cursor: pointer; 

            
          }

          .submit-button {
          
            cursor: pointer;
            border: 2px solid ;
            border-radius: 5px;
            border-color: blue;
            color: black;
            width:70%;
            padding:2%;
            font-size: 16px;
            transition: background-color 0.3s, transform 0.3s ease;
            background-color:#0096b3;
          }

          .submit-button:hover {
            background-color: #0056b3;
            transform: scale(1.05);
            color:white;
          }

          .register-main-div {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100vw;
            height: 100vh;
            padding: 20px;
            box-sizing: border-box;
          }


          .form_container {
            width: 100%;
            max-width: 600px;
            padding: 5%;
            background-color: rgba(243, 244, 246, 1);
            box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
            display: flex;
            flex-direction: column;
            gap: 20px;
            border-radius: 10px;
            box-sizing: border-box;
            text-align:center;
          }
         
          .aldredy_user_div {
            text-align: center;
            padding-top:30px;
          }

          @media (max-width: 768px) {
            .form_container {
              max-width: 90%;
              padding: 4%;
            }

            .submit-button {
              font-size: 14px;
              padding: 2%;
            }
          }

          @media (max-width: 480px) {
            .form_container {
              max-width: 95%;
              padding: 3%;
            }

            input[type="text"], input[type="password"] {
              padding: 2%;
            }

            .submit-button {
              font-size: 12px;
            }
          }


        `}
      </style>

      <div className="register-main-div">
        <form  className="form_container"   onSubmit={handleFormSubmit} >
          
          <b style={{ textAlign: "center" }}>
            <i><u>Register New User</u></i>
          </b>

          <div className="email_div">
            <input
            required
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={Email}
              placeholder="Enter your Email"
            />
          </div>

          <div className="role_div">
          <select required>
            {roles.map((role, index) => (
              <option key={index} value={role} style={{height:"60px",color:"red"}}>
                {role}
              </option>
            ))}
          </select>
        </div>

          <div className="password_div">
            <input
            required
              type={ShowPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <div className="conform_password_div">
            <input
             required
              type={ShowPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={ConfirmPassword}
            />
          </div>
          
          <div className="view-password-checkbox">
            <label style={{ cursor: "pointer" }}>
              <input
                type="checkbox"
                onChange={(e) => setShowPassword(e.target.checked)}
                style={{ transform: "scale(1.5)" }}
              />
              Show password
            </label>
          </div>



          

          <div className="aldredy_user_div">
            <p>
              <i>Already have an account? <u><a href={`${config.BASE_URL}/login`} style={{ color: "red", paddingTop:"30px" }}>Login</a></u></i>
            </p>

           
          </div>
          

          {errorMessage &&   (  
<div class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
  <div class="flex">
    <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
    <div>
      <p class="font-bold">{errorMessage}</p>
      </div>
  </div>
</div>)}

{console.log((backendResponse), "res")}


{backendResponse && backendResponse?.detail?.map((error, index) => (
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
  


  {showAlert && backendResponse?.status ==="failure" && (
 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
 <strong className="font-bold">Holy smokes!</strong>
 <span className="block sm:inline">{backendResponse?.message}</span>
 <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
   <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" onClick={handleClose} ><title >Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
 </span>
</div>
)}


{showAlert && backendResponse?.status ==="success" && 

navigate('/home')


// (
//   <div className="bg-red-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
//   <strong className="font-bold">Holy smokes!</strong>
//   <span className="block sm:inline">{backendResponse?.message}</span>
//   <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
//     <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" onClick={handleClose} ><title >Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
//   </span>
//  </div>
//  )
}



          <div className="submit_button_div" style={{ display: "flex", justifyContent: "center" }}>
            <button className="submit-button" type="submit" >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
