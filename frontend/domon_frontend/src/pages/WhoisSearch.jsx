import React, { useEffect, useState } from "react";
import WhoisResult from "./WhoisResult"; // Import the result component
import WhoisDisplay from "./whoisDataDisplay";

function WhoisSearch() {
  const [domain, setDomain] = useState("");
  const [whoisData, setWhoisData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(()=>
  {
    if(whoisData?.status==="failure")
    {
      const timer =setTimeout(()=>
      {
        setWhoisData({})
      },5000)
    }
  },[whoisData])
  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/v1/auth/get_whois?get_whois=${domain}`);
      console.log(domain , "domaina ")
      const data = await response.json();
      console.log(data,"data")
      setWhoisData(data);
    } catch (error) {
      console.error("Error fetching WHOIS data:", error);
    } finally {
      setLoading(false);
    }
  };


  return (<>
  <br /><br />

      <div className="p-6 mt-9 bg-white shadow-lg rounded-lg max-w-xl mx-auto flex flex-col "  style={{cursor:loading ?'progress':'pointer' }}>
      <h2 className="text-2xl font-semibold text-gray-700 mb-9 text-center">Get Whois Information</h2>
      
      {/* Search Bar */}
      <div className="flex mb-4">
        <div className="w-full flex space-x-4">
          <div className="w-full"> 
            <input
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="Enter domain name"
            />
          </div>
          <div className="w-1/4"> {/* 3:1 ratio */}
            <button
              className="w-full flex items-center justify-center rounded bg-slate-800 py-2 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={handleSearch}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2">
                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
              </svg>
              {loading ? "Loading..." : "Search"}
              
            </button>
          </div>
        </div>
      </div>
      </div>
      <div style={{ marginLeft: "200px", marginRight: "200px", textAlign: "center" }}>
  {whoisData?.status === "success" && <WhoisDisplay whoisData={whoisData} />}
  {whoisData?.status === "failure" && (
  <p className="text-red-500 font-bold text-lg mt-4 p-1 border-2 border-green-500 rounded-lg bg-red-100 max-w-xs mx-auto pr-4">
    {whoisData.message || "No details found"}
  </p>
)}

</div>

    </>
  );
  
}


export default WhoisSearch