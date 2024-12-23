import { useState } from "react";
import config from '../config';
function Register() {
  const [Email, setEmail] = useState('');
  const [ShowPassword, setShowPassword] = useState(false);
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');

  console.log(Email);

  return (
    <>
      <style>
        {`
          input[type="text"], input[type="password"] {
            width: 100%;
            max-width: 400px;
            padding: 4%;
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

          .view-password-checkbox{
            
            

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
        <div className="form_container">
          <b style={{ textAlign: "center" }}>
            <i><u>Register New User</u></i>
          </b>

          <div className="email_div">
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              value={Email}
              placeholder="Enter your Email"
            />
          </div>

          <div className="password_div">
            <input
              type={ShowPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <div className="conform_password_div">
            <input
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

          <div className="submit_button_div" style={{ display: "flex", justifyContent: "center" }}>
            <button className="submit-button" type="button" onClick={(e) => { e.preventDefault(); console.log("handle click event "); }}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
