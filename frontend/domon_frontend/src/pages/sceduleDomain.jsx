import React, { useEffect, useState } from 'react';
import config from "../config";
import Cookies from 'js-cookie';
import { green } from '@mui/material/colors';
import axios from "axios";

function SceduleFunctionalities() {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingExpiration, setIsEditingExpiration] = useState(false);
  const [scheduledDomains, setScheduledDomains] = useState('');
  const [expirationDomains, setExpirationDomains] = useState('');
  const [showModal , setShowModal] = useState(false)
  const [showExpirationModal , setExpirationShowModal] = useState(false)
  const [apiResponse , setApiResponse ] = useState({})
  const [apiResponseExpiry , setApiResponseExpiry ] = useState({})
  const [domainInput , setDomainInput] = useState('')
  let cookieData =  Cookies.get(config.COOKIENAME);
  const [backendScheduledDoamins, setBackendScheduledDomains] = useState({})
  const [backendExpiryScheduledDoamins, setBackendExpiryScheduledDomains] = useState({})
  const [noOfPagesPerPage , setNoOfPagesPerPage] = useState(10)
  const [pagginatedPages , setPagginatedPages] = useState(1)
  const [selectedOption , setSelectedOption] = useState("domain")
  const [scheduledPagination, setScheduledPagination] = useState(1);
const [expirationPagination, setExpirationPagination] = useState(1);
const [editPopup, setEditPopup] = useState(null)
const [editExpiryPopup, setEditExpiryPopup]= useState(null)
// const [pausePopup , setPausePopup] = useState(false)
// const [pauseExpiry, setPauseExpiry] = useState(false )
const [deletePopup, setDeletePopup] = useState(null); // State for schedule domain delete popup
const [deleteExpiryPopup, setDeleteExpiryPopup] = useState(null); 


const [selectedDomains,setSelectedDomains] = useState('')
const [reloadData, setReloadData]=useState(false)

  cookieData =cookieData ? JSON.parse(cookieData) : null;

  const  getInitialDataFromBackend=async()=>
    
  {


  
      const scheduledDomainsUrl= config.GET_SCHEDULED_DOMAINS_URL+"page_no="+scheduledPagination+'&no_of_results='+noOfPagesPerPage
      const  expiryScheduledDomainsUrl=config.GET_EXPIRY_SCHEDULED_DOMAINS_URL+"page_no="+expirationPagination+'&no_of_results='+noOfPagesPerPage
    console.log(config.GET_SCHEDULED_DOMAINS_URL+"page_no="+scheduledPagination+'&no_of_results='+noOfPagesPerPage)
    console.log(config.GET_EXPIRY_SCHEDULED_DOMAINS_URL+"page_no="+expirationPagination+'&no_of_results='+noOfPagesPerPage)
          const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            myHeaders.append(  "Authorization", `Bearer ${cookieData.access_token}`)// Add Bearer token here
        
            const raw = JSON.stringify({
              "email": cookieData.email
            });

            const requestOptions = {
              method: "POST",
              headers: myHeaders,
              body: raw,
              redirect: "follow"
            };
            console.log(" rescgheduling ")
            fetch(scheduledDomainsUrl, requestOptions)
              .then((response) => response.json())
              .then((result) => {
                
                if( result && result.detail ==="Invalid token")
                  {
                   document.cookie.split(";").forEach((c) => {
             
                     document.cookie = c.trim().split("=")[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
               
                   });
               
                   window.location.href = "/login";  // Redirect to login page
                  }

                
                console.log(result);setBackendScheduledDomains(result)})
              .catch((error) => console.error(error));
    
              fetch(expiryScheduledDomainsUrl, requestOptions)
              .then((response) => response.json())
              .then((result) => {console.log(result);setBackendExpiryScheduledDomains(result)})
              .catch((error) => console.error(error));

};

  
  useEffect(()=>{
    if(apiResponse)

      {
        let timer = setTimeout(()=>{
          setApiResponse({})
        }, 15000)
      }
      
  }, [apiResponse])


  const [domainDetails, setDomainDetails] = useState({

    domainName: "",
    expirationDate: "",
    alertScheduled: false,
  });



  const popupDomainSchedule = () => {
     setShowModal(true )
     setExpirationShowModal(false)
    
    }


  const popupDomainExpirySchedule = () => {

    setShowModal(false)
    setExpirationShowModal(true )
  };

  

  const handleDomainSchedule = async() => {
    console.log("submit domain scedule ")
     setShowModal(false )
     setScheduledDomains('')
     setExpirationShowModal(false)
     
     const payload = {
        "email": cookieData.email,
      "domain_name":scheduledDomains
  
}     
     console.log(payload)
     try 
     {
      const response = await  fetch(config.INSERT_SCEDULE_DOMAIN_URL , {method:"POST", headers:{"Content-Type":"application/json", "Authorization": `Bearer ${cookieData.access_token}`// Add Bearer token here
        }, body:JSON.stringify(payload)})

    if(!response.ok)
    {
      throw new Error(`Error : ${response.statusText}`)


    }
    const data = await response.json();
    if( data && data.detail ==="Invalid token")
      {
       document.cookie.split(";").forEach((c) => {
 
         document.cookie = c.trim().split("=")[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
   
       });
   
       window.location.href = "/login";  // Redirect to login page
      }
    console.log(data,"data ")
    setApiResponse(data)
    getInitialDataFromBackend()



     }
     catch (error)
     {
      console.error("Failed to schedule domain:", error.message);
     }
    
    }


  const handleExpirationSchedule =async () => {

    setShowModal(false)
    setExpirationDomains('')
    setExpirationShowModal(false )
    try 
    {

      console.log(" sceduling domain expiry ")

      const response =await  fetch (config.INSERT_EXPIRATION_SCEDULED_DOMAIN,{method:"POST",headers:{"Content-Type":"application/json","Authorization":`Bearer ${cookieData.access_token}`}, body:JSON.stringify({"email":cookieData.email, "domain_name":expirationDomains})})
      const res = await response.json()
      if( res && res.detail ==="Invalid token")
        {
         document.cookie.split(";").forEach((c) => {
   
           document.cookie = c.trim().split("=")[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
     
         });
     
         window.location.href = "/login";  // Redirect to login page
        }
      setApiResponseExpiry(res)


    }
    catch (error) 
    {
      console.error(error)

    }
    getInitialDataFromBackend()

  };
  const handleEditDomain = (event) => {
    // const updatedDomain = event.target.previousSibling.value; // Get new value from input
    const oldDomain = editPopup?.domain_name; // Get old value from the object

    console.log("Old Domain:", oldDomain);
    console.log("Updated Domain:", selectedDomains);

    fetch(config.UPDATE_DOMAIN_SCHEDULE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json",
        "Authorization": `Bearer ${cookieData.access_token}`// Add Bearer token here
       },
      body: JSON.stringify({
        email: cookieData.email,
        domain_name: oldDomain,
        updated_domain_name: selectedDomains,
      }),
    })
      .then((response) => response.json())
      .then((result) => {

        if( result && result.detail ==="Invalid token")
          {
           document.cookie.split(";").forEach((c) => {
     
             document.cookie = c.trim().split("=")[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
       
           });
       
           window.location.href = "/login";  // Redirect to login page
          }
        
        
        setApiResponse(result)})
      .catch((error) => console.error(error));
    
    setEditPopup(null);
  };




  

  const handleEditExpiration = async  (event) => {
    const oldDomain = editExpiryPopup?.domain_name; // Get old value from the object

    console.log("Old Domain:", oldDomain);
    console.log("Updated Domain:", selectedDomains);

    fetch(config.UPDATE_DOMAIN_EXPIRY_SCHEDULE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" , "Authorization":`Bearer ${cookieData.access_token}`}// Add Bearer token here
      ,
      body: JSON.stringify({
        email: cookieData.email,
        domain_name: oldDomain,
        updated_domain_name: selectedDomains,
      }),
    })
      .then((response) => response.json())
      .then((result) =>{

        if( result && result.detail ==="Invalid token")
          {
           document.cookie.split(";").forEach((c) => {
     
             document.cookie = c.trim().split("=")[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
       
           });
       
           window.location.href = "/login";  // Redirect to login page
          }
       

       setApiResponseExpiry(result)
  })
      .catch((error) => console.error(error));
    
    setEditExpiryPopup(null);
    };


    const handleDomainAction = async (domain_name, endpoint) => {
      if (!domain_name || !cookieData.email) {
        console.error("Missing domain name or email");
        return;
      }
    
      console.log(`Performing action on domain: ${domain_name} | Endpoint: ${endpoint}`);
    
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append(  "Authorization", `Bearer ${cookieData.access_token}`)// Add Bearer token here
    
      const raw = JSON.stringify({
        email: cookieData.email,
        domain_name: domain_name
      });
    
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
    
      try {
        const response = await fetch(endpoint, requestOptions);
        const result = await response.json();
        if( result && result.detail ==="Invalid token")
          {
           document.cookie.split(";").forEach((c) => {
     
             document.cookie = c.trim().split("=")[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
       
           });
       
           window.location.href = "/login";  // Redirect to login page
          }
       
        setApiResponse(result)
        if (response.ok) {
          console.log(`Action successful: ${result}`);
        } else {
          console.error(`Failed action: ${result}`);
        }
      } catch (error) {
        console.error(`Error performing action:`, error);
      }
    
      // Refresh data after performing action
      getInitialDataFromBackend();
    };


    const handlePauseDomain = (domain_name) => handleDomainAction(domain_name, config.PAUSE_DOMAIN_URL);
const handlePauseExpiration = (domain_name) => handleDomainAction(domain_name, config.PAUSE_DOMAIN_EXPIRY_URL);
const handleUnpauseDomain = (domain_name) => handleDomainAction(domain_name, config.UNPAUSE_DOMAIN_URL);
const handleUnpauseDomainExpiry = (domain_name) => handleDomainAction(domain_name, config.UNPAUSE_DOMAIN_EXPIRY_URL);
   

  // Delete Functions
  const handleDeleteDomain = (domainName) => {

    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

myHeaders.append(  "Authorization", `Bearer ${cookieData.access_token}`)// Add Bearer token here
        
const raw = JSON.stringify({
  "email": cookieData.email,
  "domain_name": domainName
});

const requestOptions = {
  method: "DELETE",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(config.DELETE_SCHEDULED_DOMAIN_URL, requestOptions)
  .then((response) => response.json())
  .then((result) =>{
    if( result && result.detail ==="Invalid token")
      {
       document.cookie.split(";").forEach((c) => {
 
         document.cookie = c.trim().split("=")[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
   
       });
   
       window.location.href = "/login";  // Redirect to login page
      }
   
    
    setApiResponse(result)})
  .catch((error) => console.error(error));
  getInitialDataFromBackend();
    };

  const handleDeleteExpiration = (domainName) => {

    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

myHeaders.append(  "Authorization", `Bearer ${cookieData.access_token}`)// Add Bearer token here
        

const raw = JSON.stringify({
  "email": cookieData.email,
  "domain_name": domainName
});

const requestOptions = {
  method: "DELETE",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(config.DELETE_EXPIRY_SCHEDULED_DOMAIN_URL, requestOptions)
  .then((response) => response.json())
  .then((result) => {
    
    if( result && result.detail ==="Invalid token")
      {
       document.cookie.split(";").forEach((c) => {
 
         document.cookie = c.trim().split("=")[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
   
       });
   
       window.location.href = "/login";  // Redirect to login page
      }
   
   
      setApiResponseExpiry(result)})
  .catch((error) => console.error(error));
  getInitialDataFromBackend();
     };

  const handleCancelEdit = () => {
    setIsEditing(false);
    
    setIsEditingExpiration(false);
  };

  const handleSaveEdit = () => {
    // Logic to save updates to the database
    alert("Changes saved successfully!");
    setIsEditing(false);
    setIsEditingExpiration(false);
  };



  useEffect(()=>
  {
    console.log(" get initial data from backend ")
    getInitialDataFromBackend()
  },[scheduledPagination,expirationPagination, noOfPagesPerPage , editPopup , editExpiryPopup , reloadData])


  return (
    <>
      <div className="min-h-screen bg-gray-100">
        {/* Header Section */}
        <header className="bg-blue-600 text-white text-center p-8">
          <h1 className="text-4xl font-bold">Importance of WHOIS Domain and Scheduling</h1>
          <p className="text-lg mt-2">
            Proactively manage your domains and ensure they remain secure through WHOIS monitoring and scheduling.
          </p>
        </header>

        {/* Importance of WHOIS Domain Monitoring */}
        <section className="flex flex-wrap justify-center p-10">
          <div className="max-w-md p-6 bg-white rounded-lg shadow-md m-4">
            <img
              src="path_to_super_image1.jpg"
              alt="Domain Monitoring"
              className="w-full h-auto rounded-lg"
            />
            <h2 className="text-2xl font-bold mt-4">Why Monitor WHOIS Data?</h2>
            <p className="mt-2 text-gray-700">
              WHOIS domain monitoring helps ensure your domain details are always up-to-date and protected. It can alert
              you to changes in your domain registration or ownership, preventing any unauthorized transfers or attacks.
            </p>
          </div>
          <div className="max-w-md p-6 bg-white rounded-lg shadow-md m-4">
            <img
              src="path_to_super_image2.jpg"
              alt="Security Alerts"
              className="w-full h-auto rounded-lg"
            />
            <h2 className="text-2xl font-bold mt-4">Stay Alert, Stay Secure</h2>
            <p className="mt-2 text-gray-700">
              Automating alerts for domain expiration or potential impersonation ensures your business and customers are
              always protected.
            </p>
          </div>
        </section>

        {/* Buttons Section */}
        <section className="text-center p-8 bg-gray-200">
          <h2 className="text-2xl font-bold mb-4">Get Started with Domain Scheduling</h2>
          <div className="flex justify-center space-x-4">
            <button
              className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700"
              onClick={popupDomainSchedule}
            >
              Schedule a Domain
            </button>

            <button
              className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700"
              onClick={popupDomainExpirySchedule}
            >
              Schedule Domain Expiration Alert
            </button>
            
          </div>
          {/* {Object.entries(apiResponse).length >1 && (
  <div
    className={`pt-3 mt-5 px-4 py-3 rounded-md shadow-md text-sm text-center  font-medium ${
      apiResponse.status ? "bg-red-100 text-red-700 border border-red-400" : "bg-green-100 text-green-700 border border-green-400"
    }`}
  >
    <p>{apiResponse.message}</p>
  </div>
)} */}
</section>

        {/* popup html */}

        {(showModal || showExpirationModal) && (
  <>
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50" />

      {/* Shared Modal Content */}
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-6 w-96 relative z-50">
          {/* Title */}
          <h2 className="text-xl font-semibold mb-4">
            {showModal ? "Schedule Domain" : "Schedule Expired Domain"}
          </h2>

          {/* Input Field */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {showModal ? "Enter Domain to Monitor" : "Enter Expired Domain to Monitor"}
            </label>
            <input
              type="text"
              value={showModal ? scheduledDomains : expirationDomains}
              onChange={(e) =>
                showModal
                  ? setScheduledDomains(e.target.value)
                  : setExpirationDomains(e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter here..."
              autoFocus
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              onClick={() =>

                {
                  if (showModal) {
                    setShowModal(false);
                    setScheduledDomains('');
                  } else {
                    setExpirationShowModal(false);
                    setExpirationDomains('');
                  }
                }
              }
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={() =>
                showModal
                  ? handleDomainSchedule()
                  : handleExpirationSchedule()
              }
              className={`px-4 py-2 text-white rounded-md font-medium ${
                (showModal ? scheduledDomains : expirationDomains).trim() === ""
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={
                (showModal ? scheduledDomains : expirationDomains).trim() === ""
              } 
              
              >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
)}        {/* Domain List Section */}
        
        
      
        <section className="p-10 bg-white text-gray-800">
          <h2 className="text-3xl font-bold text-center mb-6">Scheduled Domains</h2>
          <div>

            {backendScheduledDoamins?.data?.[0]?.result ? (backendScheduledDoamins?.data[0]?.result.map((key, index)=>{
return(
  <>


<div
                    key={index}
                    className="bg-gray-100 p-4 mb-4 rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <p className="font-bold">{key.domain_name}</p>
                      <p className="text-gray-700">Scheduled Date: {key.date_of_scheduled}</p>
                    </div>
                    <div className="space-x-4">
                      <button
                        className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                        onClick={() => { console.log(key.domain_name);setSelectedDomains(key.domain_name);setEditPopup(key);setEditExpiryPopup(null)}}
                      >
                        Edit
                      </button>

                    <button
  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600  w-[100px]"
  onClick={() => {
    if (key.active) {
      handlePauseDomain(key.domain_name);
    } else {
      handleUnpauseDomain(key.domain_name);
    }
  }}
>
  {key.active ? <p>Pause</p> : <p>Resume</p>}
</button>


<div className="relative inline-block"> {/* Added relative position here */}
<button
  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
  onClick={() => { 
    setSelectedDomains(key.domain_name); 
    setDeletePopup(prev => prev === key ? null : key); // Open the correct popup
  }}
>
  Delete Scheduled Domain
</button>


  {/* Popup positioned above the button */}
  {deletePopup === key && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-40">
    <div className="bg-white border border-gray-300 shadow-lg rounded-lg p-6 w-auto max-w-[350px] z-50">
      <p className="text-lg font-[work-sans] text-[#1E1E1E]">
        Do you want to delete the scheduled domain <strong>{key.domain_name}</strong>?
      </p>
      <div className="flex justify-end gap-4 mt-4">
        <button
          className="border border-gray-500 px-4 py-2 rounded-md hover:bg-green-500 hover:text-white"
          onClick={() => {
            handleDeleteDomain(key.domain_name); // Call the delete function
            setDeletePopup(null); // Close the popup
          }}
        >
          Delete
        </button>
        <button
          className="border border-gray-500 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white"
          onClick={() => setDeletePopup(null)} // Close without deleting
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}







</div>


                      
                    </div>
                   
                  </div>
                

  </>
)  }
            )):(<p>no domain scheduled  </p>)}

            {backendScheduledDoamins?.data?.[0]?.result && (

<div className='flex flex-row gap-[80px] justify-center'>
<button  className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-black  hover:text-white" onClick={()=>{setScheduledPagination(1);}}>
    First
  </button>
  {/* {console.log(backendScheduledDoamins?.pagination?.total_results)} */}
  {/* {backendScheduledDoamins?.pagination?.total_results/noOfPagesPerPage>pagginatedPages ? <p> {backendScheduledDoamins?.pagination?.total_results/noOfPagesPerPage>pagginatedPages} </p>:<p> flase </p>} */}
  <button 
  className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-black hover:text-white" 
  disabled={!backendScheduledDoamins?.pagination?.has_preview_page} 
  onClick={() => setScheduledPagination(prev => prev - 1)} // Use functional update for better readability
>
  Previous
</button>

<button 
  className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-black hover:text-white"
>
  {scheduledPagination}
</button>
{/* {console.log(backendScheduledDoamins.pagination)} */}

<button 
  className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-black hover:text-white"

  disabled={!backendScheduledDoamins?.pagination?.has_next_page} 
  onClick={() => setScheduledPagination(prev => prev + 1)} // Use functional update here as well
>
  Next
</button>
<button
  className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-black hover:text-white"
  onClick={() => {
    // Calculate the last page number based on total results and results per page
    const lastPage = Math.ceil(backendScheduledDoamins?.pagination?.total_results / noOfPagesPerPage);
    setScheduledPagination(lastPage); // Set the page to the last page
  }}
>
  Last
</button></div>

            )}

              <button
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 mt-4"
                  onClick={()=>{popupDomainSchedule()}}
                >
                  Add New Domain 
                </button>
                {Object.entries(apiResponse).length >1 && (
  <div
    className={`pt-3 mt-5 px-4 py-3 rounded-md shadow-md text-sm  text-center font-medium ${
      apiResponse.status ? "bg-red-100 text-red-700 border border-red-400" : "bg-green-100 text-green-700 border border-green-400"
    }`}
  >
    <p>{apiResponse.message}</p>
  </div>
)}
          </div>
        </section>

       
        <section className="p-10 bg-white text-gray-800">
          <h2 className="text-3xl font-bold text-center mb-6">Scheduled Expiry Domains</h2>
          <div>

            {backendExpiryScheduledDoamins?.data?.[0]?.result ? (backendExpiryScheduledDoamins?.data[0]?.result.map((key, index)=>{
return(
  <>


<div
                    key={index}
                    className="bg-gray-100 p-4 mb-4 rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <p className="font-bold">{key.domain_name}</p>
                      <p className="text-gray-700">Scheduled Date: {key.date_of_scheduled}</p>
                    </div>
                    <div className="space-x-4">
                      <button
                        className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                        onClick={() => {setSelectedDomains(key.domain_name);setEditPopup(null); setEditExpiryPopup(key)}}
                       >
                        Edit
                      </button>

                      <button
  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600  w-[100px]"
  onClick={() => {
    if (key.active) {
      handlePauseExpiration(key.domain_name);
    } else {
      handleUnpauseDomainExpiry(key.domain_name);
    }
  }}
>
  {key.active ? <p>Pause</p> : <p>Resume</p>}
</button>

<button
  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
  onClick={() => { 
    setSelectedDomains(key.domain_name);
    setDeleteExpiryPopup(prev => prev === key ? null : key); // Open expiry delete popup
  }}
>
  Delete Scheduled Domain Expiry
</button>
{deleteExpiryPopup === key && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-40">
    <div className="bg-white border border-gray-300 shadow-lg rounded-lg p-6 w-auto max-w-[350px] z-50">
      <p className="text-lg font-[work-sans] text-[#1E1E1E]">
        Do you want to delete the expiry schedule for <strong>{key.domain_name}</strong>?
      </p>
      <div className="flex justify-end gap-4 mt-4">
        <button
          className="border border-gray-500 px-4 py-2 rounded-md hover:bg-green-500 hover:text-white"
          onClick={() => {
            handleDeleteExpiration(key.domain_name); // Call expiry delete function
            setDeleteExpiryPopup(null); // Close the popup
          }}
        >
          Delete
        </button>
        <button
          className="border border-gray-500 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white"
          onClick={() => setDeleteExpiryPopup(null)} // Close without deleting
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

                    </div>
                   
                  </div>

                

  </>
)  }
            )):(<p>No Domain Scheduled</p>)}

{editPopup && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white border border-gray-300 shadow-lg rounded-lg p-6 w-auto max-w-[350px]">
      <input
        className="border border-gray-400 rounded-lg p-2 w-full"
        type="text"
        value ={selectedDomains}
        onChange={(e)=>{setSelectedDomains(e.target.value)}} 
        />
      <div className="flex justify-end gap-4 mt-4">
        <button className="border border-gray-500 px-4 py-2 rounded-md hover:bg-green-500 hover:text-white" 
        onClick={(e)=>{handleEditDomain(e); }}
        >

          Update
        </button>
        <button
          className="border border-gray-500 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white"
          onClick={() => setEditPopup(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}



{editExpiryPopup && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white border border-gray-300 shadow-lg rounded-lg p-6 w-auto max-w-[350px]">
      <input
        className="border border-gray-400 rounded-lg p-2 w-full"
        type="text"
        value ={selectedDomains}
        onChange={(e)=>{setSelectedDomains(e.target.value)}} 
        />
      <div className="flex justify-end gap-4 mt-4">
        <button className="border border-gray-500 px-4 py-2 rounded-md hover:bg-green-500 hover:text-white" 
        onClick={(e)=>{handleEditExpiration(e);  }}
        >

          Update
        </button>
        <button
          className="border border-gray-500 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white"
          onClick={() => setEditExpiryPopup(null)}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}


{backendExpiryScheduledDoamins?.data?.[0]?.result && 

(

  <div className='flex flex-row gap-[80px] justify-center'>
  <button  className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-black  hover:text-white" onClick={()=>{setExpirationPagination(1);}}>
      First
    </button>
    {/* {console.log(backendScheduledDoamins?.pagination?.total_results)} */}
    {/* {backendScheduledDoamins?.pagination?.total_results/noOfPagesPerPage>pagginatedPages ? <p> {backendScheduledDoamins?.pagination?.total_results/noOfPagesPerPage>pagginatedPages} </p>:<p> flase </p>} */}
    <button 
    className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-black hover:text-white" 
    disabled={!backendExpiryScheduledDoamins?.pagination?.has_preview_page} 
    onClick={() => setExpirationPagination(prev => prev - 1)} // Use functional update for better readability
  >
    Previous
  </button>
  
  <button 
    className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-black hover:text-white"
  >
    {expirationPagination}
  </button>
  {/* {console.log(backendScheduledDoamins.pagination)} */}
  
  <button 
    className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-black hover:text-white"
  
    disabled={!backendExpiryScheduledDoamins?.pagination?.has_next_page} 
    onClick={() => setExpirationPagination(prev => prev + 1)} // Use functional update here as well
  >
    Next
  </button>
  <button
    className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-black hover:text-white"
    onClick={() => {
      // Calculate the last page number based on total results and results per page
      const lastPage = Math.ceil(backendExpiryScheduledDoamins?.pagination?.total_results / noOfPagesPerPage);
      setExpirationPagination(lastPage); // Set the page to the last page
    }}
  >
    Last
  </button></div>
  )
}


{/* 
{Object.entries(apiResponseExpiry).length >1 && (
  <div
    className={`pt-6 mt-5 px-4 py-3 rounded-md shadow-md text-sm text-center font-medium ${
      apiResponse.status ? "bg-red-100 text-red-700 border border-red-400" : "bg-green-100 text-green-700 border border-green-400"
    }`}
  >
    <p>{apiResponse.message}</p>
  </div>
)} */}
              <button
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 mt-4"
                  onClick={popupDomainExpirySchedule}
                >
                  Add New Expiry Domain
                </button>
               
                
          </div>

        </section>

        {/* Save, Cancel Section */}
        {isEditing || isEditingExpiration ? (
          <section className="text-center p-8 bg-gray-200">
            <div className="space-x-4">
              <button
                className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700"
                onClick={handleSaveEdit}
              >
                Save
              </button>
              <button
                className="bg-gray-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-700"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            </div>
          </section>
        ) : null}
      </div>
    </>
  );
}

export default SceduleFunctionalities;
