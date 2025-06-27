
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import Cookies from 'js-cookie';
import config from "../config";
import { Cookie } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

function PieChartResult() {
    const [payloadForChart, setpayloadForChart] = useState([])

    let cookieData = Cookies.get(config.COOKIENAME)
    cookieData = cookieData ? JSON.parse(cookieData) : null;

    const getDataForChart = async () => {
        const url = config.GET_KEYWORDS_RESULT_CHART_URL + cookieData.email
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        myHeaders.append("Authorization", `Bearer ${cookieData.access_token}`)// Add Bearer token here


        const raw = JSON.stringify({});

        const requestOptions = {
            method: "GET",
            headers: myHeaders,

            redirect: "follow"
        };
        console.log(requestOptions)
        console.log(url)
        fetch(url, requestOptions).then((response) => response.json()).then((result) => {

            if (result && result.detail === "Invalid token") {
                document.cookie.split(";").forEach((c) => {

                    document.cookie = c.trim().split("=")[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";

                });

                window.location.href = "/login";  // Redirect to login page
            }

            setpayloadForChart(result?.result)
        }).catch((error) => console.error(error))



    }


    useEffect(() => {
        getDataForChart()

    }, [])

    const chartData = [
        ['Domain', 'Count'], // Column headers
        ...payloadForChart  // Data from state (your payload)
    ];

    return (
        <>
            <div>
                <hr className="mt-9" />
                <h2 className="pt-10 text-center font-sans text-rose-500 text-3xl font-bold tracking-wide leading-relaxed">
                    Domain Found Per Each Keyword Chart
                </h2>


                <Chart
                    chartType="PieChart"
                    data={chartData}
                    options={{
                        title: "Domain Count",
                        is3D: true,  // 3D chart effect
                        slices: {
                            0: { offset: 0.1 },  // Slight offset for first slice
                            1: { offset: 0.1 }   // Slight offset for second slice
                        }
                    }}
                    width={"100%"}
                    height={"400px"}
                />
                <hr />
            </div>
        </>
    );



}


function ChartDomainExpity() {

    const [apiRespionse, setApiResposne] = useState({})
    let cookieData = Cookies.get(config.COOKIENAME)
    cookieData = cookieData ? JSON.parse(cookieData) : null;



    const getApiResponse = async () => {
        const url = config.GET_DOMAIN_EXPIRY_CHART_URL + cookieData.email;
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        myHeaders.append("Authorization", `Bearer ${cookieData.access_token}`)// Add Bearer token here

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };
        console.log(url)
        console.log(requestOptions)
        console.log()
        try {
            const response = await fetch(url, requestOptions);
            const result = await response.json();
            if (result && result.detail === "Invalid token") {
                document.cookie.split(";").forEach((c) => {

                    document.cookie = c.trim().split("=")[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";

                });

                window.location.href = "/login";  // Redirect to login page
            }
            console.log(result, "res");
            setApiResposne(result?.result)
        } catch (error) {
            console.log("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getApiResponse()
    }, [])
    console.log(apiRespionse)
    if (apiRespionse.length > 1) {
        console.log(" perfroming chart data dataser")
        var chartData = apiRespionse.map(item => ({
            expiry_range: item.expiry_range,
            count: item.count,
            domain_names: item.domain_names.join(", "),  // Join domain names with a comma
        }));
    }

    return (
        <div className="">

            <h2 className="pt-10 text-center font-sans text-rose-500 text-3xl font-bold tracking-wide leading-relaxed">
                Domain expiry in days  Chart
            </h2>
            <hr className="mt-4 mb-6" />
            <div className="flex justify-center">

                <ResponsiveContainer width="80%" height={400}   >
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="expiry_range" />
                        <YAxis />
                        <Tooltip
                            content={({ payload }) => {
                                if (payload && payload.length) {
                                    const { domain_names } = payload[0].payload;
                                    return (
                                        <div>
                                            <strong>Domains:</strong> <br /> {domain_names}
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Legend />
                        <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>

            </div>
        </div>
    );


}



function DomainImpersinationchart() {
    const [data, setData] = useState([])




    const makeApiCall = async () => {

        let cookieData = Cookies.get(config.COOKIENAME)
        cookieData = cookieData ? JSON.parse(cookieData) : null


        const url = config.GET_DOMAIN_IMPERSINATION_CHART_URL + cookieData.email
        const myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json");

        myHeaders.append("Authorization", `Bearer ${cookieData.access_token}`)// Add Bearer token here

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"

        }

        const response = await fetch(url, requestOptions)
        const result = await response.json()
        if (result && result.detail === "Invalid token") {
            document.cookie.split(";").forEach((c) => {

                document.cookie = c.trim().split("=")[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";

            });

            window.location.href = "/login";  // Redirect to login page
        }
        console.log(result, " hx")
        console.log(result.result)
        setData(result.result)




    }

    useEffect(() => {
        makeApiCall()


    }, [])


    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-2 shadow-md border rounded-md">
                    <p className="font-bold">{payload[0].payload._id || "Unknown"}</p>
                    <p>Count: {payload[0].value}</p>
                    <p>Domains: {payload[0].payload.domain_list.join(", ")}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <>
            <hr className="mt-9" />
            <h2 className="pt-10 text-center font-sans text-rose-500 text-3xl font-bold tracking-wide leading-relaxed">
                Domain Found Per Each Keyword Chart
            </h2>
            <br />
            <hr />
            {/* <div className="flex justify-center items-center h-screen ">
       */}
            <div className="flex justify-center items-center min-h-[500px] py-10">

                {/* <div className="w-2/3 h-96 bg-white p-4 shadow-lg rounded-lg mb-[300px]"> */}
                <div className="w-2/3 min-h-[400px] bg-white p-4 shadow-lg rounded-lg">

                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <XAxis dataKey="_id" />
                            <YAxis />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="count" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>);










}


function Dashboard() {

    const cookieData = Cookies.get(config.COOKIENAME)



    return (<>

        <div>
            <PieChartResult />
            <ChartDomainExpity />
            <DomainImpersinationchart />
        </div>
    </>)
}



export default Dashboard