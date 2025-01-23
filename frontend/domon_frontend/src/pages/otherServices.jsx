import React, { useEffect, useState } from "react";
import config from '../config'
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";

  import { Input } from "@material-tailwind/react";
import { redirect } from "react-router-dom";
 

 async function  HandleApiCall(selectedOption, setResult , domain)
{


    if(selectedOption=="all")
    {
        console.log("all")

        let allResults = {};

        // Call the DNS lookup API
        try {
            const dnsResponse = await fetch(config.GETDNSLOOKUPURL + domain);
            const dnsResult = await dnsResponse.json();
            allResults["dns_lookup"] = dnsResult;
        } catch (error) {
            console.error("Error in DNS Lookup:", error);
            allResults["dns_lookup"] = "Error in DNS Lookup";
        }

        // Call the IP Finder API
        try {
            const ipResponse = await fetch(config.GETIPFINDERURL + domain);
            const ipResult = await ipResponse.json();
            allResults["ip_finder"] = ipResult;
        } catch (error) {
            console.error("Error in IP Finder:", error);
            allResults["ip_finder"] = "Error in IP Finder";
        }

        // Call the MX Record API
        try {
            const mxResponse = await fetch(config.GETMXRECORDURL + domain);
            const mxResult = await mxResponse.json();
            allResults["mx_record"] = mxResult;
        } catch (error) {
            console.error("Error in MX Record:", error);
            allResults["mx_record"] = "Error in MX Record";
        }

        // Call the Register Score API
        try {
            const registerResponse = await fetch(config.GETREGISTERSCOREURL + domain);
            const registerResult = await registerResponse.json();
            allResults["register_score"] = registerResult;
        } catch (error) {
            console.error("Error in Register Score:", error);
            allResults["register_score"] = "Error in Register Score";
        }

        // Set all the results at once
        setResult(allResults);

    }

    else if (selectedOption=="dns_lookup")
    {

        console.log("dns_lookup")
        console.log(config.GETDNSLOOKUPURL+domain)

        const requestOptions = {method:"GET", redirect:"follow"}
        fetch(config.GETDNSLOOKUPURL+domain, requestOptions)
  .then((response) => response.json())
  .then((result) => setResult(result))
  .catch((error) => console.error(error));
        // setResult({"result":"result _______"})
   
    }
    else if (selectedOption=="ip_finder")
        {
            console.log("ip_finder")
            const requestOptions = {method:"GET", redirect:"follow"}
            fetch(config.GETIPFINDERURL+domain, requestOptions)
      .then((response) => response.json())
      .then((result) => setResult(result))
      .catch((error) => console.error(error));
    
        }
        else if (selectedOption=="mx_record")
            {
                console.log("mx_record")
                const requestOptions = {method:"GET", redirect:"follow"}
                fetch(config.GETMXRECORDURL+domain, requestOptions)
          .then((response) => response.json())
          .then((result) => setResult(result))
          .catch((error) => console.error(error));
        
            }
            else if (selectedOption=="register_score")
                {
                    console.log("register_score")
                    const requestOptions = {method:"GET", redirect:"follow"}
                    fetch(config.GETREGISTERSCOREURL+domain, requestOptions)
              .then((response) => response.json())
              .then((result) => setResult(result))
              .catch((error) => console.error(error));
   
                }


}





function  OtherServices(
    

    {
        OtherServices
    }
)
{
    const [isLoading , setIsLoading] = useState(false )
    const [Result , setResult]=useState({})
    const [domain, setDomain] = useState('');
  const [showCards, setShowCards] = useState(false);

  const handleInputChange = (e) => {
    setDomain(e.target.value);
  };

  const handleGetInsight = (option) => {
    if (domain) {
      setIsLoading(true )
      setShowCards(true);
      setResult({})
      HandleApiCall(option, setResult, domain)
    }
  };


  useEffect(()=>
  {
    if(Object.keys(Result).length>1)
    {
      setIsLoading(false)
    }
    
  },[Result ])
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert(`Copied: ${text}`);
  };


  return (
    <>
      <div className="flex flex-col transition-all duration-500 ease-in-out">
        <div className="flex justify-center">
          <div className="flex justify-center mt-[100px]">
            <input 
              type="text" 
              className="rounded p-2 border" 
              placeholder="Enter domain" 
              value={domain}
              onChange={handleInputChange}
            />
            <button 
              onClick={()=>handleGetInsight("all")}
              className="bg-red-200 p-3 rounded ml-8 hover:bg-slate-500 hover:text-blue-300">
               {isLoading &&  isLoading ?  <p>Loading......</p> : <p>Enquire Data</p>}
            </button>
            {Object.keys(Result).length>1 &&
            
            
            <button 
              onClick={()=>{setShowCards(false); setResult({}); setDomain('')}}
              className="bg-red-200 p-3 rounded ml-8 hover:bg-slate-500 hover:text-blue-300">
              
clear             </button>
            
            }
          </div>
        </div>
        <div className="flex flex-wrap justify-center mt-8 p-3">


  {Object.keys(Result).length > 1  && showCards && 

 ['DNS Lookup', 'IP Finder', 'MX Record', 'Register Score'].map((title) => (
    <div
      key={title}
      className="bg-white p-4 m-6 shadow-2xl rounded w-[300px] h-[500px] text-center flex flex-col justify-between"
    >
      <h2 className="font-bold mb-2">{title}</h2>
      <p>Information about {title.toLowerCase()} for {domain}</p>

      <div className="bg-black text-white rounded-md overflow-auto flex-1 p-4 mt-10 ">
      {title === 'DNS Lookup' && Result.dns_lookup && (
    typeof Result.dns_lookup.result === "string" ? (
      <p>{Result.dns_lookup.result}</p>
    ) : (
      <p>{JSON.stringify(Result.dns_lookup.result, null, 2)}</p>
    )
  )}
        {title === 'IP Finder' && Result.ip_finder && (
          <p>{Result.ip_finder.result}</p>
        )}
        {title === 'MX Record' && Result.mx_record && (
          <p>{Result.mx_record.result}</p>
        )}
        {title === 'Register Score' && Result.register_score && (
          <p>{Result.register_score.result}</p>
        )}
      </div>

      <button
        onClick={() => {
          let contentToCopy = '';
          if (title === 'DNS Lookup' && Result.dns_lookup) {
            contentToCopy = JSON.stringify(Result.dns_lookup.result);
          } else if (title === 'IP Finder' && Result.ip_finder) {
            contentToCopy = Result.ip_finder.result;
          } else if (title === 'MX Record' && Result.mx_record) {
            contentToCopy = Result.mx_record.result;
          } else if (title === 'Register Score' && Result.register_score) {
            contentToCopy = Result.register_score.result;
          }
          navigator.clipboard.writeText(contentToCopy);
          alert(`${title} data copied to clipboard!`);
        }}
        className="mt-9 bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
      >
        Copy
      </button>
    </div>
  ))}
</div>

      
      
            </div>
    </>
  );
}


function DnsLookup ()
{
    const [Result , setResult]=useState({})
    const [domainName, setDomainName] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isCopied , setIscopied] = useState(false)


    useEffect(()=>{
         if(Result?.status || Result?.error )
         {
          setIsLoading(false )
         }
    },[Result])
    const title = "Dns Lookup "
    const content ="DNS (Domain Name System) lookup is a vital process for translating human-readable domain names into IP addresses, enabling browsers to load websites. It allows users to access websites with ease by converting domain names like 'google.com' into the machine-readable IP addresses needed to establish connections. DNS lookup ensures seamless internet navigation, reduces website loading times, and plays a key role in network security by identifying legitimate sites and preventing malicious attacks. Without it, the user experience would be limited to numeric IP addresses, making internet browsing much more complex."
    return    (
        <>

        <br /><br /><br />
        <div className="flex  items-center flex-col direction-center ">
            <div className="break-words max-w-lg rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 ">
                <p className="text-white dark:text-white text-lg font-medium  text-center"><u>{title}</u></p>
                <br />
                <p className="text-white dark:text-white text-lg font-medium">{content}</p>
                <div className="w-full max-w-sm min-w-[200px] pl-10" >
                    <br /><br />
                    
                        <div className="relative flex items-center " >
                        
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600">
                            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
                            </svg>
                            
                            <input
                            onChange={(e)=>setDomainName(e.target.value)}
                            className="  w-full bg-transparent placeholder:text-white text-green-400 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            placeholder="domain.com..." 
                            />
                            
                            <button  onClick={()=> { setIsLoading(true);setResult({});HandleApiCall("dns_lookup", setResult, domainName)}}
                            className="rounded-md bg-green-400 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                            type="button"
                            >
                            {isLoading ?<p>Loading...</p>:<p>Search</p>}
                            </button> 

                            {

Result?.result &&(

  <button  onClick={()=>{  navigator.clipboard.writeText(JSON.stringify(Result.result));setIscopied(true)}}
  className="rounded-md bg-green-400 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
  type="button"
  >
 {isCopied? <p> copied</p>:<p>copy</p>}
  </button> 


)




}

                          </div>
                        
                        </div>

                        <br /><br />
                            {console.log(Result)}
                            {
                                    Result?.status === "success" && Result?.result ? (
                                      <div className="border bg-cyan-100 rounded border-sky-500 text-center p-5">
                                        <p>{JSON.stringify(Result.result)}</p>
                                      </div>
                                    ) : ( Result.error && 
                                      <div className="border bg-cyan-100 rounded border-sky-500 text-center p-5">
                                        <p>{Result?.error }</p>
                                      </div>
                                    )
                                  }

            </div>
            
        </div>

         </>
    )

}


function IpFinder()
{
    
    const [Result , setResult]=useState({})
    const [domainName, setDomainName] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isCopied , setIscopied] = useState(false)


    useEffect(()=>{
         if(Result?.status || Result?.error )
         {
          setIsLoading(false )
         }
    },[Result])
  
    const title = "Ip Finder"
    const content ="Finding the IP address of a domain is crucial for network troubleshooting, server configuration, and security monitoring. By resolving a domain to its IP, network administrators can identify the exact location of a server, check its availability, and ensure that it's operating correctly. It helps in diagnosing connectivity issues, such as server downtime or network bottlenecks, and is an essential step in understanding how a website or service is hosted. Moreover, knowing the IP of a domain is important for cybersecurity tasks like detecting malicious activities, preventing DDoS attacks, and managing firewall rules."
    return    (
        <>

        
<br /><br /><br />
        <div className="flex  items-center flex-col direction-center ">
            <div className="break-words max-w-lg rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 ">
                <p className="text-white dark:text-white text-lg font-medium  text-center"><u>{title}</u></p>
                <br />
                <p className="text-white dark:text-white text-lg font-medium">{content}</p>
                <div className="w-full max-w-sm min-w-[200px] pl-10" >
                    <br /><br />
                    
                        <div className="relative flex items-center " >
                        
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600">
                            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
                            </svg>
                            
                            <input
                            onChange={(e)=>setDomainName(e.target.value)}
                            
                            className="  w-full bg-transparent placeholder:text-white text-green-400 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            placeholder="domain.com..." 
                            />
                            
                            <button   onClick={()=>{ setIsLoading(true);setResult({});HandleApiCall("ip_finder", setResult, domainName)}}
                            className="rounded-md bg-green-400 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                            type="button"
                            >
                            {isLoading ?<p>Loading...</p>:<p>Search</p>}
                            </button> 
                            {

Result?.result &&(

  <button  onClick={()=>{  navigator.clipboard.writeText(Result.result);setIscopied(true)}}
  className="rounded-md bg-green-400 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
  type="button"
  >
 {isCopied? <p> copied</p>:<p>copy</p>}
  </button> 


)




}

                          </div>
                        
                        </div>

                        <br /><br />

                        {
                                    Result?.status === "success" && Result?.result ? (
                                      <div className="border bg-cyan-100 rounded border-sky-500 text-center p-5">
                                        <p>{Result.result}</p>
                                      </div>
                                    ) : ( Result.error && 
                                      <div className="border bg-cyan-100 rounded border-sky-500 text-center p-5">
                                        <p>{Result?.error }</p>
                                      </div>
                                    )
                                  }
                     
                      
            </div>
            
        </div>

         </>
    )


}

function MxRecord()
{



    const [Result , setResult]=useState({})
    const [domainName, setDomainName] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isCopied , setIscopied] = useState(false)


    useEffect(()=>{
         if(Result?.status || Result?.error )
         {
          setIsLoading(false )
         }
    },[Result])
  

   
    const title = "MX Record"
    const content ="MX (Mail Exchange) records play a critical role in directing email traffic to the correct mail servers for a domain. In the context of cyber attacks, MX records are often targeted for phishing, spamming, or man-in-the-middle attacks. Attackers may attempt to manipulate or hijack MX records to redirect emails to malicious servers, allowing them to intercept sensitive information, harvest login credentials, or distribute malware. Ensuring the security and integrity of MX records is essential to prevent unauthorized access to email systems and protect against common threats like spear phishing and email spoofing. Regular monitoring and verification of MX records can help detect and mitigate potential risks to domain email security."
    return    (
        <>

            
        <br /><br /><br />
        <div className="flex  items-center flex-col direction-center ">
            <div className="break-words max-w-lg rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 ">
                <p className="text-white dark:text-white text-lg font-medium  text-center"><u>{title}</u></p>
                <br />
                <p className="text-white dark:text-white text-lg font-medium">{content}</p>
                <div className="w-full max-w-sm min-w-[200px] pl-10" >
                    <br /><br />
                    
                        <div className="relative flex items-center " >
                        
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600">
                            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
                            </svg>
                            
                            <input
                            onChange={(e)=>setDomainName(e.target.value)}
                            
                            className="  w-full bg-transparent placeholder:text-white text-green-400 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            placeholder="domain.com..." 
                            />
                            
                            <button  onClick={()=>{ setIsLoading(true);setResult({});HandleApiCall("mx_record", setResult, domainName)}}
                            className="rounded-md bg-green-400 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                            type="button"
                            >
                           {isLoading ?<p>Loading...</p>:<p>Search</p>}
                           </button> 
                           {

Result?.result &&(

  <button  onClick={()=>{  navigator.clipboard.writeText(Result.result);setIscopied(true)}}
  className="rounded-md bg-green-400 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
  type="button"
  >
 {isCopied? <p> copied</p>:<p>copy</p>}
  </button> 


)




}

                          </div>
                        
                        </div>

                        <br /><br />

 {
                          Result?.status === "success" && Result?.result ? (
                            <div className="border bg-cyan-100 rounded border-sky-500 text-center p-5">
                              <p>{Result.result}</p>
                            </div>
                          ) : ( Result.error && 
                            <div className="border bg-cyan-100 rounded border-sky-500 text-center p-5">
                              <p>{Result?.error }</p>
                            </div>
                          )
                        }

            </div>
            
        </div>

         </>
    )







}



function RegisterScore()
{

    const title = "Register Score"
    const content ="Registering scores is crucial for tracking progress, setting goals, and maintaining a record of achievements. It provides a clear measure of performance, whether for academic, gaming, or professional purposes. By recording scores, individuals can reflect on their growth, compare results, and stay motivated. Additionally, it ensures data integrity, enabling accurate reporting and analysis for future improvements."
    const [Result , setResult]=useState({})
    const [domainName, setDomainName] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isCopied , setIscopied] = useState(false)


    useEffect(()=>{
         if(Result?.status || Result?.error )
         {
          setIsLoading(false )
         }
    },[Result])
  


    return    (
        <>

        
        <br /><br /><br />
        <div className="flex  items-center flex-col direction-center ">
            <div className="break-words max-w-lg rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 ">
                <p className="text-white dark:text-white text-lg font-medium  text-center"><u>{title}</u></p>
                <br />
                <p className="text-white dark:text-white text-lg font-medium">{content}</p>
                <div className="w-full max-w-sm min-w-[200px] pl-10" >
                    <br /><br />
                    
                        <div className="relative flex items-center " >
                        
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600">
                            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
                            </svg>
                            
                            <input
                            onChange={(e)=>setDomainName(e.target.value)}
                            
                            className="  w-full bg-transparent placeholder:text-white text-green-400 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            placeholder="domain.com..." 
                            />
                            
                            <button  onClick={()=>{ setIsLoading(true);setResult({});setIscopied(false);HandleApiCall("register_score", setResult, domainName)}}
                            className="rounded-md bg-green-400 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                            type="button"
                            >
                           {isLoading ?<p>Loading...</p>:<p>Search</p>}
                           </button> 
                            {

                              Result?.result &&(

                                <button  onClick={()=>{  navigator.clipboard.writeText(Result.result);setIscopied(true)}}
                                className="rounded-md bg-green-400 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                                type="button"
                                >
                               {isCopied? <p> copied</p>:<p>copy</p>}
                                </button> 
                            

                              )




                            }
                         
                          </div>
                        
                        </div>

                        <br /><br />
                        {
                          Result?.status === "success" && Result?.result ? (
                            <div className="border bg-cyan-100 rounded border-sky-500 text-center p-5">
                              <p>{Result.result}</p>
                            </div>
                          ) : ( Result.error && 
                            <div className="border bg-cyan-100 rounded border-sky-500 text-center p-5">
                              <p>{Result?.error }</p>
                            </div>
                          )
                        }

            </div>
            
        </div>

         </>
    )

}


export {DnsLookup,IpFinder,MxRecord,RegisterScore}

export default OtherServices ;