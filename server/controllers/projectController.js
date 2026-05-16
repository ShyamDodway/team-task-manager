const Project=require("../models/Project");


// Create Project

exports.createProject=async(req,res)=>{

try{

const {

title,
description,
assignedTo

}=req.body;


// validation

if(!title){

return res.status(400).json({

message:"Project title required"

});

}


const project=await Project.create({

title,
description,
assignedTo:assignedTo || null,
createdBy:req.user.id

});

const populatedProject=

await Project.findById(

project._id

)

.populate(

"assignedTo",
"name email"
)

.populate(

"createdBy",
"name"
);


res.status(201).json(

populatedProject

);

}

catch(error){

res.status(500).json({

message:error.message

});

}

};


// Get Projects

exports.getProjects=async(req,res)=>{

try{

let projects=[];


if(req.user.role==="Admin"){

projects=

await Project.find()

.populate(

"assignedTo",
"name email"

)

.populate(

"createdBy",
"name"

);

}

else{

projects=

await Project.find({

assignedTo:req.user.id

})

.populate(

"assignedTo",
"name email"

)

.populate(

"createdBy",
"name"

);

}


res.json(projects);

}

catch(error){

res.status(500).json({

message:error.message

});

}

};


// Dummy addMember so routes don't break

exports.addMember=async(req,res)=>{

res.json({

message:"Member feature pending"

});

};