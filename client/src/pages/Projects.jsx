import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

const Projects = () => {

  const [projects,setProjects]=useState([]);
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");

  useEffect(()=>{

    fetchProjects();

  },[]);

  const fetchProjects=async()=>{

    try{

      const res=await API.get("/projects");

      setProjects(res.data);

    }catch(err){

      console.log(err);

    }

  };

  const createProject=async()=>{

    try{

      await API.post("/projects",{

        title,
        description

      });

      setTitle("");
      setDescription("");

      fetchProjects();

    }catch(err){

      console.log(err);

    }

  };

  return(

    <div className="flex">

      <Sidebar/>

      <div className="ml-64 p-8 w-full">

        <h1 className="text-3xl font-bold mb-5">
          Projects
        </h1>

        <div className="bg-white p-5 rounded shadow mb-5">

          <input
          className="border p-3 w-full mb-3"
          placeholder="Project Title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          />

          <textarea
          className="border p-3 w-full mb-3"
          placeholder="Description"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          />

          <button
          onClick={createProject}
          className="bg-blue-600 text-white p-3 rounded"
          >
          Create Project
          </button>

        </div>

        <div className="grid grid-cols-3 gap-4">

        {projects.map(project=>(

        <div
        key={project._id}
        className="bg-white p-5 rounded shadow"
        >

        <h2 className="font-bold">

        {project.title}

        </h2>

        <p>

        {project.description}

        </p>

        </div>

        ))}

        </div>

      </div>

    </div>

  )

}

export default Projects