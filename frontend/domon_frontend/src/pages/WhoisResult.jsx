import React from "react";
import { jsPDF } from "jspdf"; // For PDF generation

function WhoisResult({ data }) {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("WHOIS Information", 10, 10);

    let yPosition = 20;
    Object.keys(data).forEach((key) => {
      const value = Array.isArray(data[key]) ? data[key].join(", ") : data[key];
      doc.text(`${key}: ${value}`, 10, yPosition);
      yPosition += 10;
    });

    doc.save(`${data.domain_name}_whois.pdf`);
  };

  return (
    <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">WHOIS Details for {data.domain_name}</h3>
      <div className="space-y-2">
        {Object.keys(data).map((key) => {
          const value = Array.isArray(data[key]) ? data[key].join(", ") : data[key];
          return (
            <div key={key} className="flex justify-between text-gray-600">
              <span className="font-medium">{key}</span>
              <span>{value}</span>
              <button
                onClick={() => copyToClipboard(value)}
                className="text-blue-700 hover:underline"
              >
                Copy
              </button>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex justify-end space-x-4">
        <button
          onClick={exportToPDF}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition duration-300"
        >
          Export as PDF
        </button>
      </div>
    </div>
  );
}

export default WhoisResult;
