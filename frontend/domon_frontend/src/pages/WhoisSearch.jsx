import React, { useEffect, useState } from "react";
import WhoisResult from "./WhoisResult"; // Import the result component
import WhoisDisplay from "./whoisDataDisplay";
import config from "../config";


function WhoisSearch() {
  const [domain, setDomain] = useState("");
  const [whoisData, setWhoisData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    if (whoisData?.status === "failure") {
      const timer = setTimeout(() => {
        setWhoisData({});
      }, 5000);
    }
  }, [whoisData]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(config.GETWHOISURL+domain);
      const data = await response.json();
      setWhoisData(data);
    } catch (error) {
      console.error("Error fetching WHOIS data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-10 shadow-lg rounded-lg max-w-4xl w-full">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">WHOIS Information Lookup</h1>
          
          <p className="text-gray-600 mb-4">
            The WHOIS system is an integral part of the internet infrastructure. It allows users to query databases that store the registered users or assignees of a domain name, IP address, or an autonomous system. This information is crucial for a variety of purposes, including network administration, domain name management, and cybersecurity.
          </p>
          
          <p className="text-gray-600 mb-4">
            By looking up WHOIS data, you can discover the registrant's name, address, phone number, email, and the domain's expiration date. This information can help identify ownership, detect fraudulent activities, and resolve domain disputes. It also plays a vital role in ensuring the accountability of domain registrations.
          </p>
          
          <p className="text-gray-600 mb-8">
            WHOIS databases are maintained by domain registrars and the Internet Corporation for Assigned Names and Numbers (ICANN). They offer a transparent view into who is responsible for internet resources, which helps foster a safer and more secure internet.
          </p>
          
          <div className="mt-10 text-center">
            {whoisData?.status === "success" && <WhoisDisplay whoisData={whoisData} />}
            {whoisData?.status === "failure" && (
              <p className="text-red-500 font-bold text-lg mt-4 p-2 border border-red-400 rounded bg-red-100 inline-block">
                {whoisData.message || "No details found"}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 w-full bg-white shadow-md p-6">
        <div className="max-w-xl mx-auto flex flex-col">
          <div className="flex space-x-4">
            <input
              className="flex-1 bg-gray-50 border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="Enter domain name"
            />
            <button
              className="bg-blue-600 text-white px-4 py-3 rounded-md shadow hover:bg-blue-500 transition disabled:bg-gray-400"
              type="button"
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? "Loading..." : "Search"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default WhoisSearch;
