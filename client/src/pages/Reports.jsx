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

import Sidebar from "../components/Sidebar";

const Reports=()=>{

const taskData=[

{
name:"Pending",
value:5
},

{
name:"In Progress",
value:3
},

{
name:"Completed",
value:12
}

];

const projectData=[

{
name:"Project A",
progress:70
},

{
name:"Project B",
progress:50
},

{
name:"Project C",
progress:90
}

];

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

<div className="bg-white p-6 rounded shadow">

<h2 className="font-bold mb-4">

Task Status

</h2>

<PieChart
width={300}
height={300}
>

<Pie
data={taskData}
dataKey="value"
outerRadius={100}
label
>

{taskData.map((entry,index)=>(

<Cell
key={index}
fill={colors[index]}
/>

))}

</Pie>

<Tooltip/>

</PieChart>

</div>


<div className="bg-white p-6 rounded shadow">

<h2 className="font-bold mb-4">

Project Progress

</h2>

<BarChart
width={400}
height={300}
data={projectData}
>

<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>

<Bar dataKey="progress"/>

</BarChart>

</div>

</div>

</div>

</div>

)

}

export default Reports