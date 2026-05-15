import {useEffect,useState} from "react";

import API from "../services/api";

import Sidebar from "../components/Sidebar";

const Teams=()=>{

const [members,setMembers]=useState([]);

useEffect(()=>{

fetchMembers();

},[]);

const fetchMembers=async()=>{

try{

const res=await API.get("/users");

setMembers(res.data);

}
catch(error){

console.log(error);

}

};

return(

<div className="flex bg-gray-100 min-h-screen">

<Sidebar/>

<div className="ml-64 p-8 w-full">

<h1 className="text-4xl font-bold mb-8">

Team Members

</h1>

<div className="bg-white p-6 rounded-xl shadow">

<table className="w-full">

<thead>

<tr className="bg-gray-100">

<th className="p-3">

Name

</th>

<th className="p-3">

Email

</th>

<th className="p-3">

Role

</th>

</tr>

</thead>

<tbody>

{members.map(member=>(

<tr
key={member._id}
className="border-b"
>

<td className="p-3">

{member.name}

</td>

<td className="p-3">

{member.email}

</td>

<td className="p-3">

{member.role}

</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

</div>

)

}

export default Teams