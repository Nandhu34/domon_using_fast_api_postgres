import { useState } from "react";
import registerBackground from '../assets/images/register_background.jpeg';
import './registerPage.css';

function Register() {
  return (
    <>
      <div className="register-main-div">
        <div  className="form_container"   style={{display:"flex", flexDirection:"column"}}>

              <div className="email_div">

                 <input type="text"  placeholder="Enter your email" />
                
              </div>
              <div className="username_div">
              <input type="text"  placeholder="Enter your email" />
               

              </div>
              <div className="password_div">
             
              <input type="text"  placeholder="Enter your email" />
               
              </div>

              <div className="conform_password_div">
                
              <input type="text"  placeholder="Enter your email" />
               
              </div>

              <div className="submit_button_div">

              </div>

        </div>
      </div>
     
     
     
     </>
  );
}

export default Register;