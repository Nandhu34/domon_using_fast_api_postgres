import React, { useEffect, useRef, useState } from "react";
import EditUser from "./edit_user_data";

function Header({
  editUserData,
  setEditUserData,
  profileMenuOpen,
  setProfileMenuOpen,
  confirmDelete,
  setConfirmDelete,
  toggleProfileMenu,
  handleDeleteAccount,
  cancelDeleteAccount,
  confirmDeleteAccount,
  setSelectedOption,
  selectedOption
}) {



  const [hoverExtraOption, setHoverExtraOption] = useState(false)
  const editUserRef = useRef(null)

  const extraOptionRef = useRef(null)
  const profileOptionRef = useRef(null)

  useEffect(() => {
    const handleEditUserClickOutside = (event) => {
      if (editUserRef.current && !editUserRef.current.contains(event.target)) {
        console.log(" close popup funn")
        setEditUserData(false)
      }
    }

    document.addEventListener('mousedown', handleEditUserClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleEditUserClickOutside);
    };

  }, [])

  useEffect(() => {

    const handleClickOutside = (event) => {
      if (profileOptionRef.current && !profileOptionRef.current.contains(event.target)) {
        setProfileMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
  }, [])


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (extraOptionRef.current && !extraOptionRef.current.contains(event.target)) {
        setHoverExtraOption(false)
      }

    }
    document.addEventListener("mousedown", handleClickOutside)

  }, [])
  const handleLogout = () => {
    document.cookie.split(";").forEach((c) => {
      document.cookie = c.trim().split("=")[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
    });
    window.location.href = "/login";  // Redirect to login page
  };

  return (<>
    <nav className="flex items-center justify-between bg-white py-4 px-6 shadow-md">
      <div className="text-gray-700 font-bold text-xl">whois</div>
      <div className="flex space-x-4 items-center">
        <a
          onClick={() => { setSelectedOption("getWhois"); }}
          className={`pr-5 cursor-pointer transition duration-300 ${selectedOption === "getWhois"
            ? "text-blue-700 font-semibold"
            : "text-gray-700 hover:text-blue-700"
            }`} >
          Get Whois
        </a>
        <a
          onClick={() => { setSelectedOption("schedule_domain"); }}
          className={`pr-5 cursor-pointer transition duration-300 ${selectedOption === "schedule_domain"
            ? "text-blue-700 font-semibold"
            : "text-gray-700 hover:text-blue-700"
            }`}
        >
          Schedule Domain
        </a>

        <div ref={extraOptionRef}
          onClick={() => { setHoverExtraOption(!hoverExtraOption) }}
          className="relative inline-block pr-5"
        >
          <a
            className={`pr-5 cursor-pointer transition duration-300 ${["all", "dns_lookup", "ip_finder", "mx_record", "register_score", "other_services"].includes(selectedOption)
              ? "text-blue-700 font-semibold"
              : "text-gray-700 hover:text-blue-700"
              }`}
          >
            Other Services
          </a>

          {hoverExtraOption && (
            <div
              className="absolute"
              style={{ top: '50px', left: '0' }} // Adjust as needed for positioning
            >
              <div className="flex flex-col w-auto shadow-2xl backdrop-blur-sm bg-white/50 p-3">

                <a onClick={() => { setSelectedOption('all'); console.log("all") }} className="p-3 hover:bg-slate-200 cursor-pointer">All</a>
                <a onClick={() => { setSelectedOption('dns_lookup'); console.log("dns look up ") }} className="p-3 hover:bg-slate-200 cursor-pointer">DNS Lookup</a>
                <a onClick={() => { setSelectedOption('ip_finder'); console.log("ip finder") }} className="p-3 hover:bg-slate-200 cursor-pointer">IP Finder</a>
                <a onClick={() => { setSelectedOption('mx_record'); console.log("mx record ") }} className="p-3 hover:bg-slate-200 cursor-pointer">MX Record</a>
                <a onClick={() => { setSelectedOption('register_score'); console.log("regster score i ") }} className="p-3 hover:bg-slate-200 cursor-pointer">Register Score</a>

              </div>
            </div>

          )}

        </div>


        <a
          onClick={() => { setSelectedOption("get_analytics"); }}
          className={`pr-5 cursor-pointer transition duration-300 ${selectedOption === "get_analytics"
            ? "text-blue-700 font-semibold"
            : "text-gray-700 hover:text-blue-700"
            }`}
        >
          Analytics
        </a>
        <a
          onClick={() => { setSelectedOption("aboutus"); }}
          className={`pr-5 cursor-pointer transition duration-300 ${selectedOption === "aboutus"
            ? "text-blue-700 font-semibold"
            : "text-gray-700 hover:text-blue-700"
            }`}
        >
          About Us
        </a>

        <div className="relative flex items-center">
          <input type="text" placeholder="Search" className="border-2 border-gray-300 rounded-lg px-3 py-1 focus:outline-none" />
          <button className="ml-2 px-3 py-1 bg-blue-700 text-white rounded-lg hover:bg-blue-600 transition duration-300">Search</button>
        </div>
      </div>
      <div className="relative" ref={profileOptionRef}>
        <button onClick={toggleProfileMenu} className="flex items-center space-x-2 text-gray-700">
          <span>Profile</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A7.5 7.5 0 1116.879 6.196M12 14v1m0 4h.01M12 8h.01" />
          </svg>
        </button>
        {profileMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
            <a onClick={() => { console.log("edit user data "); setEditUserData(!editUserData); setProfileMenuOpen(false) }} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">View Account Data</a>
            <a onClick={handleLogout} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">Logout</a>
            <a onClick={handleDeleteAccount} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">Delete Account</a>
          </div>
        )}
      </div>


      {editUserData && (


        <div className="flex  flex-col items-center justify-center fixed inset-0  bg-black  bg-opacity-50 z-50 backdrop-blur-sm">
          <div ref={editUserRef} className="bg-white rounded-lg shadow-lg">
            <EditUser />

          </div>
          <div> <button onClick={() => { setEditUserData(false) }} className="p-2 w-[100px]  bg-slate-50  hover:bg-black hover:text-white border rounded mt-3"> close  </button></div>
        </div>
      )}


      {/* // <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm z-50">
  //   <div className="bg-white p-6 rounded-lg shadow-lg">
  //     {<EditUser />}
  //   </div>
  // </div> */}

      {/* Confirmation Modal for Deletion */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-700">Are you sure you want to delete your account?</h3>
            <div className="mt-4 flex space-x-4">
              <button
                onClick={confirmDeleteAccount}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition duration-300"
              >
                Yes, Delete
              </button>
              <button
                onClick={cancelDeleteAccount}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </nav >


  </>
  );
}

export default Header;
