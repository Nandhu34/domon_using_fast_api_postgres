import React, { useState } from "react"; 


function  ForgetPassword()
{
    const [registeredEmail,setRegisteredEmail] = useState('')
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
                <input type="text"  placeholder="enter registered email" value={registeredEmail} onChange={(e)=> {setRegisteredEmail(e.target.value )}} />
                <button type="submit" className="button" onSubmit={(e)=>{}}> get link </button>

        </div>
        
    </div>




    </>)
}


export default ForgetPassword;