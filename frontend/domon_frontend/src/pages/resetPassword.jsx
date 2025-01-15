import { useState } from "react";
import config from '../config';
import { useParams } from "react-router-dom";

function ResetPassword()
{

    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmPassword] = useState('')
    const [ShowPassword , setShowPassword] = useState(false )



    const {token} = useParams()
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
                    </div>

                    <div className="div_for_submit_button">

                        <button type ="submit"  className="submitButton" > reset-password </button>

                    </div>


                </div>
        </div>


</>)





}

export default ResetPassword;