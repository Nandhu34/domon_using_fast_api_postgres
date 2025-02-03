import React, { useState } from "react"
import Multiselect from 'multiselect-react-dropdown';
  
function GetAnalytics()
{

    const scheduleType=[ "Domain", "Domaon-Expiry"]
    const options = [
        { name: "Option 1️⃣", id: 1 },
        { name: "Option 2️⃣", id: 2 }
      ];
    
      // State to store selected options
      const [selectedValues, setSelectedValues] = useState([]);
    
      // Handle select event
      const handleSelect = (selectedList) => {
        setSelectedValues(selectedList);
      };
    
      // Handle remove event
      const handleRemove = (selectedList) => {
        setSelectedValues(selectedList);
      };

      
return (<>
   


   <div >
   
        <div> 
        <select className="rounded-lg">
  <option value="all">All</option> {/* Default option */}
  {scheduleType &&
    scheduleType.map((key, index) => (
      <option key={index} value={key}>{key}</option>
    ))}
</select>

        </div>


        <div>
        <Multiselect
      options={options} // Available options
      selectedValues={selectedValues} // Selected values
      onSelect={handleSelect} // Function triggers when an option is selected
      onRemove={handleRemove} // Function triggers when an option is removed
      displayValue="name" // Property name to display in dropdown
    />

    
        </div>



   </div>

    </>)






}




export default GetAnalytics ; 
