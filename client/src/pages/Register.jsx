import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();

  const [loading,setLoading]=useState(false);

  const [formData,setFormData]=useState({

    name:"",
    email:"",
    password:"",
    role:"Member"

  });


  const handleChange=(e)=>{

    setFormData({

      ...formData,
      [e.target.name]:
      e.target.value

    });

  };


  const handleSubmit=async(e)=>{

    e.preventDefault();

    setLoading(true);

    try{

      await API.post(

      "/auth/register",

      formData

      );

      alert(
      "Registration Successful"
      );

      navigate("/");

    }
    catch(error){

      console.log(error);

      alert(

      error.response?.data?.message ||

      "Registration Failed"

      );

    }

    finally{

      setLoading(false);

    }

  };


  return(

<div className="flex justify-center items-center min-h-screen bg-gray-100">

<form
onSubmit={handleSubmit}
className="bg-white p-8 rounded-xl shadow-lg w-96"
>

<h1 className="text-3xl font-bold text-center mb-2">

Team Task Manager

</h1>

<p className="text-gray-500 text-center mb-6">

Create your account

</p>


<input
type="text"
name="name"
placeholder="Full Name"
className="w-full border p-3 rounded mb-4"
value={formData.name}
onChange={handleChange}
required
/>


<input
type="email"
name="email"
placeholder="Email"
className="w-full border p-3 rounded mb-4"
value={formData.email}
onChange={handleChange}
required
/>


<input
type="password"
name="password"
placeholder="Password"
className="w-full border p-3 rounded mb-4"
value={formData.password}
onChange={handleChange}
required
minLength="6"
/>


<select
name="role"
className="w-full border p-3 rounded mb-4"
value={formData.role}
onChange={handleChange}
>

<option value="Member">

Member

</option>

<option value="Admin">

Admin

</option>

</select>


<button
className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700"
disabled={loading}
>

{loading ?

"Registering..."

:

"Register"

}

</button>


<div className="text-center mt-5">

<p>

Already have an account?

<Link
to="/"
className="text-blue-600 font-semibold ml-2"
>

Login

</Link>

</p>

</div>

</form>

</div>

);

};

export default Register;