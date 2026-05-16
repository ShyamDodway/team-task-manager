import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {

  const [selectedRole, setSelectedRole] =
  useState("Admin");

  const [email,setEmail] =
  useState("");

  const [password,setPassword] =
  useState("");

  const { login } =
  useContext(
    AuthContext
  );

  const navigate =
  useNavigate();


  const handleSubmit = async(e)=>{

    e.preventDefault();

    try{

      const res=
      await API.post(

      "/auth/login",

      {
        email,
        password
      }

      );

      if(

      res.data.user.role
      !==
      selectedRole

      ){

      return alert(

      `This account is not a ${selectedRole}`

      );

      }


      login(

      res.data.user,

      res.data.token

      );


      if(

      selectedRole==="Admin"

      ){

      navigate(
      "/dashboard/admin"
      );

      }

      else{

      navigate(
      "/dashboard/member"
      );

      }

    }

    catch(error){

      alert(

      error.response?.data?.message ||

      "Login Failed"

      );

    }

  };


  return(

<div className="flex justify-center items-center min-h-screen bg-gray-100">

<div className="bg-white p-8 rounded-xl shadow-lg w-96">

<h1 className="text-3xl font-bold text-center mb-2">

Team Task Manager

</h1>

<p className="text-gray-500 text-center mb-6">

Login to continue

</p>


<div className="flex mb-6 rounded overflow-hidden">

<button
type="button"
className={`w-1/2 p-3 font-semibold ${
selectedRole==="Admin"

? "bg-blue-600 text-white"

: "bg-gray-200"

}`}
onClick={()=>setSelectedRole(
"Admin"
)}
>

Admin

</button>


<button
type="button"
className={`w-1/2 p-3 font-semibold ${
selectedRole==="Member"

? "bg-green-600 text-white"

: "bg-gray-200"

}`}
onClick={()=>setSelectedRole(
"Member"
)}
>

Member

</button>

</div>


<form
onSubmit={
handleSubmit
}
>

<input
type="email"
placeholder="Email"
className="w-full border p-3 rounded mb-4"
value={email}
onChange={(e)=>
setEmail(
e.target.value
)
}
required
/>


<input
type="password"
placeholder="Password"
className="w-full border p-3 rounded mb-4"
value={password}
onChange={(e)=>
setPassword(
e.target.value
)
}
required
/>


<button
className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
>

Login

</button>

</form>


<div className="text-center mt-5">

<p>

Don't have an account?

<Link
to="/register"
className="text-blue-600 font-semibold ml-2"
>

Sign Up

</Link>

</p>

</div>

</div>

</div>

);

};

export default Login; 