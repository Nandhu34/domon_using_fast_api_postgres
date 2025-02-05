import React, { useState } from "react";
import { MultiSelect } from "primereact/multiselect";

// Import PrimeReact Styles
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function GetAnalytics() {
  const [selectedKeywordsFilter, setSelectedKeywordFilter] = useState(null);
  const [selectedScheduledType, setSelectedScheduledType] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Schedule types
  const scheduleType = ["Domain", "Domain-Expiry"];
  
  // Options for MultiSelect
  const options = [
    { name: "All", code: "all" },
    ...Array.from({ length: 11 }, (_, i) => ({ name: `irctc${i}.com`, code: `irctc${i}.com` }))
  ];

  const clearAllFilters = () => {
    setSelectedKeywordFilter(null);
    setSelectedScheduledType("all");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="flex items-center gap-6 p-6 flex-wrap">
      {/* Schedule Type Dropdown */}
      <div className="flex flex-col items-center gap-2">
        <select
          className="rounded-lg border border-gray-300 p-2"
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
        <MultiSelect
          value={selectedKeywordsFilter}
          onChange={(e) => setSelectedKeywordFilter(e.value)}
          options={options}
          optionLabel="name"
          placeholder="Select Domains"
          maxSelectedLabels={3}
          className="w-[20rem] p-2"
        />
      </div>

      {/* Date Pickers */}
      <div className="flex gap-6">
        <div className="flex flex-col gap-2">
          <label>Start Date</label>
          <input 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)} 
            className="border border-gray-300 p-2 rounded-lg"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>End Date</label>
          <input 
            type="date" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)} 
            className="border border-gray-300 p-2 rounded-lg"
          />
        </div>
      </div>

      {/* Clear All Filters Button */}
      <button 
        className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
        onClick={clearAllFilters}
      >
        Clear All Filters
      </button>

      <hr className="w-full border-t-2 border-gray-300 my-4" />
      
      {/* Display Selected Filters */}
      <div className="text-gray-700 text-lg font-semibold">
        <p>Selected Keywords: {JSON.stringify(selectedKeywordsFilter)}</p>
        <p>Start Date: {startDate}</p>
        <p>End Date: {endDate}</p>
        <p>Schedule Type: {selectedScheduledType}</p>
      </div>
    </div>
  );
}

export default GetAnalytics;
