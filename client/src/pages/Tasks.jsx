import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

const Tasks = () => {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [projects, setProjects] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [assignedTo, setAssignedTo] = useState("");
  const [project, setProject] = useState("");

  useEffect(() => {

    fetchTasks();

    if(user?.role==="Admin"){

      fetchMembers();
      fetchProjects();

    }

  }, []);


  // Fetch Tasks

  const fetchTasks = async () => {

    try{

      const res =
      await API.get("/tasks");

      setTasks(res.data);

    }
    catch(error){

      console.log(error);

    }

  };


  // Fetch Members

  const fetchMembers = async()=>{

    try{

      const res=
      await API.get("/users");

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

      console.log(error);

    }

  };


  // Fetch Projects

  const fetchProjects = async()=>{

    try{

      const res=
      await API.get("/projects");

      setProjects(
      res.data
      );

    }
    catch(error){

      console.log(error);

    }

  };


  // Create Task

  const createTask=async()=>{

    try{

      await API.post(

      "/tasks",

      {

      title,
      description,
      dueDate,
      assignedTo,
      project

      }

      );

      setTitle("");
      setDescription("");
      setDueDate("");
      setAssignedTo("");
      setProject("");

      fetchTasks();

    }
    catch(error){

      console.log(error);

      alert(

      error.response?.data?.message ||

      "Task creation failed"

      );

    }

  };


  // Update Task Status

  const updateStatus=async(

    id,
    status

  )=>{

    try{

      await API.put(

      `/tasks/${id}/status`,

      {
      status
      }

      );

      fetchTasks();

    }
    catch(error){

      console.log(error);

    }

  };


  return (

    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar/>

      <div className="ml-64 p-8 w-full">

        <h1 className="text-4xl font-bold mb-8">

          Tasks

        </h1>


        {user?.role==="Admin" && (

        <div className="bg-white p-6 rounded-xl shadow mb-8">

          <h2 className="text-xl font-bold mb-4">

            Create Task

          </h2>


          <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e)=>
          setTitle(
          e.target.value
          )}
          className="w-full border p-3 rounded mb-4"
          />


          <textarea
          placeholder="Description"
          value={description}
          onChange={(e)=>
          setDescription(
          e.target.value
          )}
          className="w-full border p-3 rounded mb-4"
          />


          <select
          value={project}
          onChange={(e)=>
          setProject(
          e.target.value
          )}
          className="w-full border p-3 rounded mb-4"
          >

          <option value="">
          Select Project
          </option>

          {projects.map((project)=>(

          <option
          key={project._id}
          value={project._id}
          >

          {project.title}

          </option>

          ))}

          </select>


          <select
          value={assignedTo}
          onChange={(e)=>
          setAssignedTo(
          e.target.value
          )}
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


          <input
          type="date"
          value={dueDate}
          onChange={(e)=>
          setDueDate(
          e.target.value
          )}
          className="w-full border p-3 rounded mb-4"
          />


          <button
          onClick={createTask}
          className="bg-blue-600 text-white px-5 py-3 rounded"
          >

          Create Task

          </button>

        </div>

        )}


        <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="bg-gray-100">

                <th className="p-3">
                  Title
                </th>

                <th className="p-3">
                  Project
                </th>

                <th className="p-3">
                  Assigned To
                </th>

                <th className="p-3">
                  Status
                </th>

                <th className="p-3">
                  Due Date
                </th>

                <th className="p-3">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

            {tasks.length===0?

            (

            <tr>

            <td
            colSpan="6"
            className="text-center p-6"
            >

            No assigned tasks

            </td>

            </tr>

            )

            :

            (

            tasks.map((task)=>(

            <tr
            key={task._id}
            className="border-b"
            >

            <td className="p-3">

            {task.title}

            </td>

            <td className="p-3">

            {task.project?.title}

            </td>

            <td className="p-3">

            {task.assignedTo?.name}

            </td>

            <td className="p-3">

            {task.status}

            </td>

            <td className="p-3">

            {task.dueDate?.substring(
            0,
            10
            )}

            </td>

            <td className="p-3">

            <select
            value={task.status}
            onChange={(e)=>

            updateStatus(
            task._id,
            e.target.value
            )

            }
            className="border p-2 rounded"
            >

            <option>

            Pending

            </option>

            <option>

            In Progress

            </option>

            <option>

            Completed

            </option>

            </select>

            </td>

            </tr>

            ))

            )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

};

export default Tasks;