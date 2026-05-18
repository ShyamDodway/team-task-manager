import {
PieChart,
Pie,
Cell,

BarChart,
Bar,

XAxis,
YAxis,

Tooltip

} from "recharts";

import {
useEffect,
useState
}
from "react";

import API from "../services/api";

import Sidebar from "../components/Sidebar";


const Reports=()=>{

const [stats,setStats]=useState({});


useEffect(()=>{

fetchReports();

},[]);



const fetchReports=async()=>{

try{

const res=

await API.get(
"/api/dashboard/stats"
);

setStats(
res.data
);

}
catch(error){

console.log(
error
);

}

};



const taskData=[

{

name:"Total Tasks",

value:

stats.totalTasks || 0

},

{

name:"Pending Tasks",

value:

stats.pendingTasks || 0

},

{

name:"Completed Tasks",

value:

stats.completedTasks || 0

}

];



const projectData=

stats.projectTasks || [];



const colors=[

"#FFBB28",
"#0088FE",
"#00C49F"

];


return(

<div className="flex bg-gray-100 min-h-screen">

<Sidebar/>

<div className="ml-64 p-8 w-full">

<h1 className="text-4xl font-bold mb-8">

Reports

</h1>


<div className="grid grid-cols-2 gap-8">


{/* Pie Chart */}

<div className="bg-white p-6 rounded shadow">

<h2 className="font-bold mb-4">

Task Status Overview

</h2>


<PieChart
width={350}
height={300}
>

<Pie

data={taskData}

dataKey="value"

outerRadius={100}

label

>

{

taskData.map(

(entry,index)=>(

<Cell

key={index}

fill={

colors[index]

}

/>

)

)

}

</Pie>

<Tooltip/>

</PieChart>

</div>



{/* Bar Chart */}

<div className="bg-white p-6 rounded shadow">

<h2 className="font-bold mb-4">

Tasks Assigned Per Project

</h2>



<BarChart
width={450}
height={300}
data={projectData.length ? projectData : [
{
projectName:"No Data",
count:0
}
]}
>
<XAxis

dataKey="projectName"

/>

<YAxis/>

<Tooltip/>


<Bar

dataKey="count"

fill="#0088FE"

/>

</BarChart>

</div>


</div>

</div>

</div>

)

}

export default Reports;