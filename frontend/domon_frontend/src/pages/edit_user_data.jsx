import React, { useEffect, useState } from "react";
import config from "../config";
import Header from "./header";
import { redirect } from "react-router-dom";
import Cookies from 'js-cookie'



function EditUser() {

    let cookieData = Cookies.get(config.COOKIENAME)
    cookieData = cookieData ? JSON.parse(cookieData) : null
    const [userData, setUserData] = useState([])



    const getUserDataApi = async () => {


        try {
            console.log("  get api data ")

            console.log(cookieData.email)

            const url = config.UPDATE_USER_DETAILS_URL + `?email=${cookieData.email}&role=${cookieData.role}`
            const requestOptions = {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                // body:JSON.stringify({}),
                redirect: "follow"
            }
            console.log(url, requestOptions)
            console.log(" calling api ")
            const response = await fetch(url, requestOptions)

            const result = await response.json()
            setUserData(result.data)

            console.log(result)


        }

        catch (error) {
            console.log(error)
        }




    }


    useEffect(() => {
        getUserDataApi()
    }, [])




    return (<>
        <div>


            {userData && Object.keys(userData).length>1 &&(
                <>
                <table className=" border-separate border-spacing-[20px] border border-gray-400 dark:border-gray-500">
                    <thead>
                        <tr>
                            <th className="border p-3 border-gray-300 dark:border-gray-600">field</th>
                            <th className="border p-3  border-gray-300 dark:border-gray-600"> value </th>
                            {/* <th className="border p-2 pr-7 pl-7  border-gray-300 dark:border-gray-600"> Edit  </th> */}
                            
                        </tr>


                    </thead>
                    <tbody className="text-center">
                       { Object.keys(userData).map((key,value)=>(

                        <tr key={key}>
                            <td className="border p-3  border-gray-300 dark:border-gray-600">{key}</td>
                            <input readOnly={true}  className="p-3" value ={userData[key]?userData[key]:"First Login"} type="text"/>
                            {/* <td className="border p-3  border-gray-300 dark:border-gray-600"  >Edit </td> */}
                        </tr>)
                       )
                       }
                    </tbody>

                </table>

                </> ) }
                
        </div>
    
    </>)

}



export default EditUser;