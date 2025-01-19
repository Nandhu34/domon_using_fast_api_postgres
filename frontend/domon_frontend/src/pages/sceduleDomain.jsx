import React, { useState } from 'react';

function SceduleFunctionalities() {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingExpiration, setIsEditingExpiration] = useState(false);
  const [scheduledDomains, setScheduledDomains] = useState([]);
  const [expirationDomains, setExpirationDomains] = useState([]);
  const [domainDetails, setDomainDetails] = useState({
    domainName: "",
    expirationDate: "",
    alertScheduled: false,
  });

  const handleDomainSchedule = () => {
    const domainName = prompt("Enter the domain name to schedule:");
    if (domainName) {
      // Logic to save the domain to the database
      setScheduledDomains((prevState) => [
        ...prevState,
        { domainName, scheduledDate: new Date().toLocaleString() },
      ]);
      alert(`Domain ${domainName} scheduled successfully!`);
    }
  };

  const handleExpirationSchedule = () => {
    const domainName = prompt("Enter the domain name to check expiration:");
    if (domainName) {
      // Logic to save the expiration alert in the database
      setExpirationDomains((prevState) => [
        ...prevState,
        { domainName, scheduledDate: new Date().toLocaleString(), alertScheduled: true },
      ]);
      alert(`Expiration alert scheduled for ${domainName}`);
    }
  };

  const handleEditDomain = (domainName) => {
    const newDomainName = prompt("Edit the domain name:", domainName);
    if (newDomainName) {
      setScheduledDomains((prevState) =>
        prevState.map((domain) =>
          domain.domainName === domainName
            ? { ...domain, domainName: newDomainName }
            : domain
        )
      );
    }
  };

  const handleEditExpiration = (domainName) => {
    const newExpirationDate = prompt("Edit expiration date (YYYY-MM-DD):");
    if (newExpirationDate) {
      setExpirationDomains((prevState) =>
        prevState.map((domain) =>
          domain.domainName === domainName
            ? { ...domain, expirationDate: newExpirationDate }
            : domain
        )
      );
    }
  };

  // Delete Functions
  const handleDeleteDomain = (domainName) => {
    if (window.confirm(`Are you sure you want to delete ${domainName}?`)) {
      setScheduledDomains((prevState) =>
        prevState.filter((domain) => domain.domainName !== domainName)
      );
    }
  };

  const handleDeleteExpiration = (domainName) => {
    if (window.confirm(`Are you sure you want to delete expiration alert for ${domainName}?`)) {
      setExpirationDomains((prevState) =>
        prevState.filter((domain) => domain.domainName !== domainName)
      );
    }
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
              onClick={handleDomainSchedule}
            >
              Schedule a Domain
            </button>
            <button
              className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700"
              onClick={handleExpirationSchedule}
            >
              Schedule Domain Expiration Alert
            </button>
          </div>
        </section>

        {/* Domain List Section */}
        <section className="p-10 bg-white text-gray-800">
          <h2 className="text-3xl font-bold text-center mb-6">Scheduled Domains</h2>
          <div>
            {scheduledDomains.length > 0 ? (
              <div>
                <h3 className="text-2xl mb-4">Domains Scheduled:</h3>
                {scheduledDomains.map((domain, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 p-4 mb-4 rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <p className="font-bold">{domain.domainName}</p>
                      <p className="text-gray-700">Scheduled Date: {domain.scheduledDate}</p>
                    </div>
                    <div className="space-x-4">
                      <button
                        className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                        onClick={() => handleEditDomain(domain.domainName)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        onClick={() => handleDeleteDomain(domain.domainName)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                {/* Add Button */}
                <button
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 mt-4"
                  onClick={handleDomainSchedule}
                >
                  Add New Domain
                </button>
              </div>
            ) : (
              <p>No domains scheduled yet.</p>
            )}
          </div>
        </section>

        {/* Expiration Alert Section */}
        <section className="p-10 bg-white text-gray-800">
          <h2 className="text-3xl font-bold text-center mb-6">Scheduled Expiration Alerts</h2>
          <div>
            {expirationDomains.length > 0 ? (
              <div>
                <h3 className="text-2xl mb-4">Domains with Expiration Alerts:</h3>
                {expirationDomains.map((domain, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 p-4 mb-4 rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <p className="font-bold">{domain.domainName}</p>
                      <p className="text-gray-700">Scheduled Date: {domain.scheduledDate}</p>
                    </div>
                    <div className="space-x-4">
                      <button
                        className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                        onClick={() => handleEditExpiration(domain.domainName)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        onClick={() => handleDeleteExpiration(domain.domainName)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                {/* Add Button for Expiration */}
                <button
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 mt-4"
                  onClick={handleExpirationSchedule}
                >
                  Add New Expiration Alert
                </button>
              </div>
            ) : (
              <p>No expiration alerts set yet.</p>
            )}
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
