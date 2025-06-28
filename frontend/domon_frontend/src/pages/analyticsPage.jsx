import React, { useEffect, useState } from "react";
import { MultiSelect } from "primereact/multiselect";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import config from "../config_file.js";

import Cookies from "js-cookie";
import { Card, Typography } from "@material-tailwind/react";
import DataTable from 'react-data-table-component';
import { useNavigate } from "react-router-dom";
import Dashboard from "./pieChartPage";
import globalErrorHandler from "../global_error_handler.js";
function GetAnalytics() {
  const [pagginationStartNo, setPagginationPageNo] = useState(1);
  const [pagginationResultsPerPage, setPagginationresultsPerPage] = useState(10);
  const [responseFromApi, setResponseFromApi] = useState([]);
  const [selectedKeywordsFilter, setSelectedKeywordFilter] = useState([]);
  const [selectedScheduledType, setSelectedScheduledType] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  let cookieData = Cookies.get(config.COOKIENAME);
  cookieData = cookieData ? JSON.parse(cookieData) : null;

  // Schedule types
  const scheduleType = ["domain", "domain_expiry"];
  const [options, setOptions] = useState([])
  // Options for MultiSelect
  // const options = [
  //   { name: "All", code: "all" },
  //   ...Array.from({ length: 11 }, (_, i) => ({
  //     name: `irctc${i}.com`,
  //     code: `irctc${i}.com`,
  //   })),
  // ];

  const clearAllFilters = () => {
    setSelectedKeywordFilter([]);
    setSelectedScheduledType("all");
    setStartDate("");
    setEndDate("");
  };
  const getAllKeywords = async () => {
    try {
      const url = config.GET_ALL_KEYWORDS_URL + cookieData.email;

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${cookieData.access_token}`,
        },
        body: JSON.stringify({}),
        redirect: "follow",
      };

      const response = await fetch(url, requestOptions);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const result = await response.json();
      if (result && result.detail === "Invalid token") {
        document.cookie.split(";").forEach((c) => {

          document.cookie = c.trim().split("=")[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";

        });

        window.location.href = "/login";  // Redirect to login page
      }
      console.log("Result:", result);
      setOptions(result);
    } catch (error) {
      console.error("Error fetching keywords:", error);
    }
  };

  const HandleFilterButton = async () => {
    let arraySelectedKeywordValue = [];
    if (selectedKeywordsFilter) {
      selectedKeywordsFilter.forEach((key) => {
        arraySelectedKeywordValue.push(key.name);
      });
    }

    console.log("scheduled type ", selectedScheduledType);
    console.log("keyword list ", arraySelectedKeywordValue);
    console.log("start date ", startDate);
    console.log("end date ", endDate);

    let url = `${config.GET_ANALYTICS_URL}?page_no=${pagginationStartNo}&no_of_results=${pagginationResultsPerPage}`;

    const body = {
      domain_type: selectedScheduledType,
      keywords_list: arraySelectedKeywordValue,
      start_date: startDate,
      end_date: endDate,
      email: cookieData?.email,
    };
    console.log(body)

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${cookieData.access_token}`,

        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      console.log("Response Data:", data);
      if (data && data.detail === "Invalid token") {
        document.cookie.split(";").forEach((c) => {

          document.cookie = c.trim().split("=")[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";

        });

        window.location.href = "/login";  // Redirect to login page
      }
      setResponseFromApi(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getAllKeywords();
    HandleFilterButton();
  }, [])

  return (
    <>
      <div className="flex justify-between p-6 flex-nowrap">
        {/* Schedule Type Dropdown */}
        <div className="flex flex-col items-center gap-2 ">
          <p> Select Type </p>
          <select
            // className="rounded-lg border border-gray-300 p-2"
            className="w-[20rem] h-[3rem] border border-gray-400 rounded-md "
            onChange={(e) => setSelectedScheduledType(e.target.value)}
            value={selectedScheduledType}
          >
            <option value="all">All</option>
            {scheduleType.map((key, index) => (
              <option key={index} value={key}>
                {key}
              </option>
            ))}
          </select>
        </div>

        {/* MultiSelect Dropdown */}
        <div className="flex flex-col items-center gap-2">
          <p> Select Keywords </p>
          <MultiSelect
            value={selectedKeywordsFilter}
            onChange={(e) => setSelectedKeywordFilter(e.value)}
            options={options}
            optionLabel="name"
            placeholder="Select Domains"
            maxSelectedLabels={3}
            className="w-[20rem] h-[3rem] border border-gray-400 rounded-md "
          />

        </div>

        {/* Date Pickers */}
        <div className="flex gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-center" >Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-center">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg"
            />
          </div>
        </div>

        {/* Buttons */}
        <div>

          <button
            className="px-4 py-2 mt-8 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
            onClick={clearAllFilters}
          >
            Clear All
          </button>


        </div>

        <div>


          <button className=" pr-10 px-4 py-2 mt-8 bg-green-500 text-white rounded-lg shadow-md hover:bg-red-600" onClick={HandleFilterButton}>Apply</button>

        </div>

      </div>

      <hr />
      {/* <div className="w-full px-4 mt-8 bg-white shadow-lg rounded-xl border isolate"> */}
      <DisplayAnalyticsData responseFromApi={responseFromApi} />
      {/* </div> */}



    </>
  );
}

function DisplayAnalyticsData({ responseFromApi }) {
  const filterOptions = ['keyword', 'type'];
  const [selectedSubMenu, setSelectedSubMenu] = useState('domain');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10); // default rows per page

  const columns = [
    { name: 'domain_name', selector: (row) => row.domain_name },
    { name: 'creation_date', selector: (row) => row.creation_date },
    { name: 'updated_date', selector: (row) => row.updated_date },
    { name: 'expiration_date', selector: (row) => row.expiration_date },
    { name: 'registrar', selector: (row) => row.registrar },
    { name: 'organization', selector: (row) => row.organization },
    { name: 'name_servers', selector: (row) => row.name_servers },
    { name: 'whois_server', selector: (row) => row.whois_server },
    { name: 'date_of_collection', selector: (row) => row.date_of_collection },
  ];

  const ExpandedComponent = ({ data }) => (
    <pre>
      <button
        id="copyButton"
        onClick={() => {
          console.log('button clicked');
          const button = document.getElementById('copyButton');
          button.innerText = 'Copied!';
          setTimeout(() => {
            button.innerText = 'Copy';
          }, 3000);
          navigator.clipboard.writeText(JSON.stringify(data));
        }}
        className="bg-cyan-400 text-white rounded-lg ml-3"
      >
        Copy
      </button>
      {JSON.stringify(data, null, 2)}
    </pre>
  );

  // Handle pagination changes
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (newPerPage, page) => {
    setRowsPerPage(newPerPage);
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="flex gap-20 pl-20 pt-4">
        <div className="flex flex-wrap items-end justify-end gap-6">
          <a
            onClick={() => {
              setSelectedSubMenu('domain');
            }}
            className={`hover:underline hover:cursor-pointer hover:underline-offset-8 ${selectedSubMenu === 'domain' ? 'underline underline-offset-8 text-green-600' : ''
              }`}
          >
            Domain
          </a>
          <a
            onClick={() => {
              setSelectedSubMenu('domain_expiry');
            }}
            className={`hover:underline hover:cursor-pointer hover:underline-offset-8 ${selectedSubMenu === 'domain_expiry' ? 'underline underline-offset-8 text-green-600' : ''
              }`}
          >
            Domain Expiry
          </a>
          <a
            onClick={() => {
              setSelectedSubMenu('analytics');
            }}
            className={`hover:underline hover:cursor-pointer hover:underline-offset-8 ${selectedSubMenu === 'analytics' ? 'underline underline-offset-8 text-green-600' : ''
              }`}
          >
            Analytics
          </a>
        </div>
      </div>

      <div>
        {selectedSubMenu === 'domain' && (
          <>
            {responseFromApi &&
              responseFromApi.map((key, index) => {
                return (
                  <>
                    {/* {key?.schedule_type === 'domain' && (
                      <div key={index}>
                        <br />
                        <hr />
                        <div className="flex justify-around pt-5 bg-purple-400 text-white">
                          <p>KEYWORD USED -- {key.keyword_used}</p>
                          <br />
                          <br />
                        </div>

                        <hr />

                        <div className="max-h-[400px] overflow-auto">
                          <DataTable
                            columns={columns}
                            data={key.whois_result}
                            expandableRows
                            expandableRowsComponent={ExpandedComponent}
                            pagination
                            paginationPerPage={rowsPerPage} // Set rows per page
                            paginationPageNumber={currentPage} // Set current page
                            onChangePage={handlePageChange} // Handle page change
                            onChangeRowsPerPage={handlePerPageChange} // Handle rows per page change
                          />
                        </div>
                      </div>
                    )} */}
                    {responseFromApi?.map((key, index) => {
                      if (key?.schedule_type !== 'domain') return null;

                      return (
                        <div key={index}>
                          <br />
                          <hr />
                          <div className="flex justify-around pt-5 bg-purple-400 text-white">
                            <p>KEYWORD USED -- {key.keyword_used}</p>
                            <br />
                            <br />
                          </div>

                          <hr />
                          {/* "max-h-[400px] overflow-auto" */}
                          <div className="">
                            <DataTable
                              columns={columns}
                              data={key.whois_result}
                              expandableRows
                              expandableRowsComponent={ExpandedComponent}
                              pagination
                              paginationPerPage={rowsPerPage}
                              paginationPageNumber={currentPage}
                              onChangePage={handlePageChange}
                              onChangeRowsPerPage={handlePerPageChange}
                            />
                          </div>
                        </div>
                      );
                    })}

                  </>
                );
              })}
          </>
        )}

        {selectedSubMenu === 'domain_expiry' && (
          <>
            {responseFromApi &&
              responseFromApi.map((key, index) => {
                return (
                  <>
                    {key?.schedule_type === 'domain_expiry' && (
                      <div key={index}>
                        <br />
                        <hr />
                        <div className="flex justify-around pt-5 bg-purple-400 text-white">
                          <p>KEYWORD USED -- {key.keyword_used}</p>
                          <br />
                          <br />
                        </div>

                        <hr />

                        <div className="max-h-[100px]">
                          <DataTable
                            columns={columns}
                            data={key.whois_result}
                            expandableRows
                            expandableRowsComponent={ExpandedComponent}
                            pagination
                            paginationPerPage={rowsPerPage} // Set rows per page
                            paginationPageNumber={currentPage} // Set current page
                            onChangePage={handlePageChange} // Handle page change
                            onChangeRowsPerPage={handlePerPageChange} // Handle rows per page change
                          />
                        </div>
                      </div>
                    )}
                  </>
                );
              })}
          </>
        )}

        {selectedSubMenu === 'analytics' && (

          <Dashboard />

        )}


      </div>
    </div>
  );
}


export default GetAnalytics;
