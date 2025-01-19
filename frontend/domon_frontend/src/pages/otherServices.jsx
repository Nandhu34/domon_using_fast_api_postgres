import React, { useEffect, useState } from "react";
import config from '../config'
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";


function  OtherServices(
    

    {
        OtherServices
    }
)
{


    return (<>

    <div className="flex flex-wrap  justify-around pt-6">
           <div  className="">
           
           <DnsLookup />
           </div>
           <div>
            <IpFinder />
           </div>
           <div>
            <MxRecord />
           </div>
           <div>
            <RegisterScore />
           </div>
    </div>
    </>)



}


function DnsLookup ()
{

    const title = "Dns Lookup "
    const content ="DNS (Domain Name System) lookup is a vital process for translating human-readable domain names into IP addresses, enabling browsers to load websites. It allows users to access websites with ease by converting domain names like 'google.com' into the machine-readable IP addresses needed to establish connections. DNS lookup ensures seamless internet navigation, reduces website loading times, and plays a key role in network security by identifying legitimate sites and preventing malicious attacks. Without it, the user experience would be limited to numeric IP addresses, making internet browsing much more complex."
    const Result ="result kjnbjdsbgjsgunz vjvhjbbghsbghbghbhbgdfsjghurehturehturehiuthrjgjfdbgjfbxjbxnvnxbvnbxcvnbdbvghdbghdsgdsguhguiehgtiuehtiuehtiueutyuyrtujhgjdshgkjdbgkjdsngjkndsjkbgkjbncxmnvjcngjfngjfhgurhguirhgurhgiu"
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
                            <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
                            </svg>
                            
                            <input
                            className="  w-full bg-transparent placeholder:text-white text-green-400 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            placeholder="domain.com..." 
                            />
                            
                            <button
                            className="rounded-md bg-green-400 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                            type="button"
                            >
                            Search
                            </button> 
                          </div>
                        
                        </div>

                        <br /><br />


                        <div className="border  bg-cyan-100 rounded  border-sky-500">
                            <p>{Result} </p>
                        </div>
            </div>
            
        </div>

         </>
    )

}


function IpFinder()
{
    

    const title = "Ip Finder"
    const content ="Finding the IP address of a domain is crucial for network troubleshooting, server configuration, and security monitoring. By resolving a domain to its IP, network administrators can identify the exact location of a server, check its availability, and ensure that it's operating correctly. It helps in diagnosing connectivity issues, such as server downtime or network bottlenecks, and is an essential step in understanding how a website or service is hosted. Moreover, knowing the IP of a domain is important for cybersecurity tasks like detecting malicious activities, preventing DDoS attacks, and managing firewall rules."
    const Result ="result kjnbjdsbgjsgunz vjvhjbbghsbghbghbhbgdfsjghurehturehturehiuthrjgjfdbgjfbxjbxnvnxbvnbxcvnbdbvghdbghdsgdsguhguiehgtiuehtiuehtiueutyuyrtujhgjdshgkjdbgkjdsngjkndsjkbgkjbncxmnvjcngjfngjfhgurhguirhgurhgiu"
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
                            <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
                            </svg>
                            
                            <input
                            className="  w-full bg-transparent placeholder:text-white text-green-400 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            placeholder="domain.com..." 
                            />
                            
                            <button
                            className="rounded-md bg-green-400 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                            type="button"
                            >
                            Search
                            </button> 
                          </div>
                        
                        </div>

                        <br /><br />


                        <div className="border  bg-cyan-100 rounded  border-sky-500">
                            <p>{Result} </p>
                        </div>
            </div>
            
        </div>

         </>
    )


}

function MxRecord()
{




    const title = "MX Record"
    const content ="MX (Mail Exchange) records play a critical role in directing email traffic to the correct mail servers for a domain. In the context of cyber attacks, MX records are often targeted for phishing, spamming, or man-in-the-middle attacks. Attackers may attempt to manipulate or hijack MX records to redirect emails to malicious servers, allowing them to intercept sensitive information, harvest login credentials, or distribute malware. Ensuring the security and integrity of MX records is essential to prevent unauthorized access to email systems and protect against common threats like spear phishing and email spoofing. Regular monitoring and verification of MX records can help detect and mitigate potential risks to domain email security."
    const Result ="result kjnbjdsbgjsgunz vjvhjbbghsbghbghbhbgdfsjghurehturehturehiuthrjgjfdbgjfbxjbxnvnxbvnbxcvnbdbvghdbghdsgdsguhguiehgtiuehtiuehtiueutyuyrtujhgjdshgkjdbgkjdsngjkndsjkbgkjbncxmnvjcngjfngjfhgurhguirhgurhgiu"
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
                            <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
                            </svg>
                            
                            <input
                            className="  w-full bg-transparent placeholder:text-white text-green-400 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            placeholder="domain.com..." 
                            />
                            
                            <button
                            className="rounded-md bg-green-400 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                            type="button"
                            >
                            Search
                            </button> 
                          </div>
                        
                        </div>

                        <br /><br />


                        <div className="border  bg-cyan-100 rounded  border-sky-500">
                            <p>{Result} </p>
                        </div>
            </div>
            
        </div>

         </>
    )







}



function RegisterScore()
{

    const title = "Register Score"
    const content ="Registering scores is crucial for tracking progress, setting goals, and maintaining a record of achievements. It provides a clear measure of performance, whether for academic, gaming, or professional purposes. By recording scores, individuals can reflect on their growth, compare results, and stay motivated. Additionally, it ensures data integrity, enabling accurate reporting and analysis for future improvements."
    const Result ="result kjnbjdsbgjsgunz vjvhjbbghsbghbghbhbgdfsjghurehturehturehiuthrjgjfdbgjfbxjbxnvnxbvnbxcvnbdbvghdbghdsgdsguhguiehgtiuehtiuehtiueutyuyrtujhgjdshgkjdbgkjdsngjkndsjkbgkjbncxmnvjcngjfngjfhgurhguirhgurhgiu"
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
                            <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
                            </svg>
                            
                            <input
                            className="  w-full bg-transparent placeholder:text-white text-green-400 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            placeholder="domain.com..." 
                            />
                            
                            <button
                            className="rounded-md bg-green-400 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                            type="button"
                            >
                            Search
                            </button> 
                          </div>
                        
                        </div>

                        <br /><br />


                        <div className="border  bg-cyan-100 rounded  border-sky-500">
                            <p>{Result} </p>
                        </div>
            </div>
            
        </div>

         </>
    )

}


export {DnsLookup,IpFinder,MxRecord,RegisterScore}

export default OtherServices ;