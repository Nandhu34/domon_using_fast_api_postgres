import React, { useState } from "react";
import Header from "../pages/header";
import WhoisSearch from "./WhoisSearch";
import OtherServices, { DnsLookup, IpFinder, MxRecord, RegisterScore } from "./otherServices";
import SceduleFunctionalities from "./sceduleDomain";

function HomePage() {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);  // To track if delete confirmation is shown
  const [selectedOption , setSelectedOption] = useState('')
 
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
      const response = await fetch("/api/delete-account", {
        method: "DELETE",
        credentials: "include", 
      });

      if (response.ok) {
        
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
    {selectedOption === "get_analytics" && <p>{selectedOption}</p>}
    

      </>
  );
}

export default HomePage;
