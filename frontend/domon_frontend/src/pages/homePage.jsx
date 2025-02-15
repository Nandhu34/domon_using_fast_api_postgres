import React, { useState } from "react";
import Header from "../pages/header";
import WhoisSearch from "./WhoisSearch";
import OtherServices, { DnsLookup, IpFinder, MxRecord, RegisterScore } from "./otherServices";
import SceduleFunctionalities from "./sceduleDomain";
import GetAnalytics from "./analyticsPage";
import AboutUs from "./aboutus";
import EditUser from "./edit_user_data";
import config from "../config";
import Cookie from 'js-cookie'

function HomePage() {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);  // To track if delete confirmation is shown
  const [selectedOption , setSelectedOption] = useState('aboutus')
  const [editUserData, setEditUserData] = useState(false )

  let cookieData = Cookie.get(config.COOKIENAME)

  cookieData =cookieData ? JSON.parse(cookieData):null

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };
  const handleDeleteAccount = () => {
    setConfirmDelete(true);  
  };

  const cancelDeleteAccount = () => {
    setConfirmDelete(false); 
  };

  const confirmDeleteAccount = async () => {
    try {
      const url = config.DELETE_USER_ACCOUNT_URL
      const response = await fetch(url, {
        method: "DELETE",
      
        headers:{"Content-Type":"application/json",    "Authorization": `Bearer ${cookieData.access_token}`,
      },
        body:JSON.stringify({"email":cookieData.email, "role":cookieData.role})
      });

      if (response.ok) {
        console.log(" resposne is okay ")
        document.cookie.split(";").forEach((c) => {
          document.cookie = c.trim().split("=")[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
        });
        // Redirect to login page
        window.location.href = "/login"; 
      } else {
        console.error("Failed to delete account");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    } finally {
      setConfirmDelete(false); 
    }
  };

  return (
    <>
      <Header
        editUserData={editUserData}
        setEditUserData={ setEditUserData}
        profileMenuOpen={profileMenuOpen}
        setProfileMenuOpen={setProfileMenuOpen}
        confirmDelete={confirmDelete}
        setConfirmDelete={setConfirmDelete}
        toggleProfileMenu={toggleProfileMenu}
        handleDeleteAccount={handleDeleteAccount}
        cancelDeleteAccount={cancelDeleteAccount}
        confirmDeleteAccount={confirmDeleteAccount}
        setSelectedOption ={setSelectedOption}
      />

      {selectedOption  == "all"&& <OtherServices 
      selectedOption = {selectedOption}
      />}


{selectedOption  === "dns_lookup" && <DnsLookup />}

{selectedOption  === "ip_finder"&& <IpFinder
      
      />}

{selectedOption  === "mx_record"&& <MxRecord 
      
      />}

{selectedOption  === "register_score"&& <RegisterScore 
      
      />}

       
    {selectedOption === "getWhois" &&<WhoisSearch />}
    {selectedOption === "schedule_domain" && <SceduleFunctionalities />}
    {selectedOption === "check_active" && <p>{selectedOption}</p>}
    {selectedOption === "other_services" && <p>{selectedOption}</p>}
    {selectedOption === "get_analytics" &&  <GetAnalytics />}
    {selectedOption === "aboutus" && <AboutUs />}

      </>
  );
}

export default HomePage;
