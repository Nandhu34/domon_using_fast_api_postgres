import React from 'react';
import { jsPDF } from 'jspdf';

const WhoisDisplay = ({ whoisData }) => {
  const handleCopy = () => {
    // Convert the WHOIS data to a string and copy to clipboard
    navigator.clipboard.writeText(JSON.stringify(whoisData.result, null, 2))
      .then(() => alert("WHOIS data copied to clipboard"))
      .catch((error) => alert("Failed to copy: ", error));
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("WHOIS Information", 20, 20);

    // WHOIS data table
    let y = 30;
    doc.setFontSize(12);
    Object.keys(whoisData.result).forEach((key, index) => {
      doc.text(`${key}: ${JSON.stringify(whoisData.result[key])}`, 20, y);
      y += 10;
    });

    // Save the document as PDF
    doc.save(`${whoisData.result.domain_name}_domon.pdf`);
  };

  return (
    <>
      {whoisData && whoisData.result && (
        <div className="p-6 mt-4 bg-white shadow-lg rounded-lg overflow-x-auto">
          <div className="flex justify-center mb-4">
            <button
              onClick={handleCopy}
              className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-blue-400 mr-10"
            >
              Copy Data
            </button>
            <button
              onClick={handleDownloadPDF}
              className="bg-green-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-green-400"
            >
              Download PDF
            </button>
          </div>
          <br />

          {/* Enhanced Table with Centered Text */}
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Key</th>
                  <th scope="col" className="px-6 py-3">Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(whoisData.result).map((key, index) => (
                  <tr 
                    key={index} 
                    className={`${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    } border-b dark:bg-gray-800 dark:border-gray-700`}>
                    <th 
                      scope="row" 
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {key}
                    </th>
                    <td className="px-6 py-4">
                      {JSON.stringify(whoisData.result[key])}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default WhoisDisplay;
