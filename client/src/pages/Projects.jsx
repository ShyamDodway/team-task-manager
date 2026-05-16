import {
useEffect,
useState
}
from "react";

import API from "../services/api";
import Sidebar from "../components/Sidebar";

const Projects=()=>{

const user=
JSON.parse(
localStorage.getItem(
"user"
)
);

const [projects,setProjects]=useState([]);

const [members,setMembers]=useState([]);

const [title,setTitle]=useState("");

const [description,setDescription]=useState("");

const [assignedTo,setAssignedTo]=useState("");

useEffect(()=>{

fetchProjects();

if(user?.role==="Admin"){

fetchMembers();

}

},[]);


// Fetch Projects

const fetchProjects=async()=>{

try{

const res=
await API.get(
"/projects"
);

setProjects(
res.data
);

}
catch(error){

console.log(
error
);

}

};


// Fetch Members

const fetchMembers=async()=>{

try{

const res=
await API.get(
"/users"
);

const onlyMembers=

res.data.filter(

member=>

member.role==="Member"

);

setMembers(
onlyMembers
);

}
catch(error){

console.log(
error
);

}

};

const createProject=async()=>{

try{

// Debug: verify selected member id
console.log({

title,
description,
assignedTo
});

if(!assignedTo){

return alert(
"Please assign a member"
);

}

const res=await API.post(

"/projects",

{

title,
description,
assignedTo

}

);

console.log(
"Project Created:",
res.data
);

setTitle("");
setDescription("");
setAssignedTo("");

fetchProjects();

}
catch(error){

console.log(error);

alert(

error.response?.data?.message ||

"Project creation failed"

);

}

};

return(

<div className="flex bg-gray-100 min-h-screen">

<Sidebar/>

<div className="ml-64 p-8 w-full">

<h1 className="text-4xl font-bold mb-8">

Projects

</h1>


{user?.role==="Admin" && (

<div className="bg-white p-6 rounded-xl shadow mb-8">

<h2 className="text-xl font-bold mb-4">

Create Project

</h2>


<input
type="text"
placeholder="Project title"
value={title}
onChange={(e)=>
setTitle(
e.target.value
)
}
className="w-full border p-3 rounded mb-4"
/>


<textarea
placeholder="Description"
value={description}
onChange={(e)=>
setDescription(
e.target.value
)
}
className="w-full border p-3 rounded mb-4"
/>


<select
value={assignedTo}
onChange={(e)=>
setAssignedTo(
e.target.value
)
}
className="w-full border p-3 rounded mb-4"
>

<option value="">

Assign Member

</option>

{members.map((member)=>(

<option
key={member._id}
value={member._id}
>

{member.name}

</option>

))}

</select>

<button
onClick={() => {

if(!assignedTo){

return alert(
"Please assign a member"
);

}

createProject();

}}
className="bg-blue-600 text-white px-5 py-3 rounded"
>

Create Project

</button>

</div>

)}


<div className="bg-white rounded-xl shadow p-6">

{projects.length===0 ?

(

<div className="text-center p-6">

<h2 className="text-xl font-semibold">

No assigned projects

</h2>

</div>

)

:

(

projects.map((project)=>(

<div
key={project._id}
className="border-b py-4"
>

<h3 className="font-bold text-lg">

{project.title}

</h3>

<p className="text-gray-600">

{project.description}

</p>

<p className="mt-2">

Assigned To:

<span className="font-medium">

{" "}
{project.assignedTo?.name || "Unassigned"}

</span>

</p>

</div>

))

)

}

</div>

</div>

</div>

)

};

export default Projects;