const Task = require("../models/Task");


// Create Task

exports.createTask = async (req, res) => {

try{

const{
title,
description,
project,
assignedTo,
dueDate
}=req.body;


// Validation

if(!title){

return res.status(400).json({

message:"Task title is required"

});

}

if(!project){

return res.status(400).json({

message:"Project is required"

});

}

if(!assignedTo){

return res.status(400).json({

message:"Please assign a member"

});

}


// Create task

const task=

await Task.create({

title,
description,
project,
assignedTo,
dueDate,
createdBy:req.user.id

});


// Populate task

const populatedTask=

await Task.findById(

task._id

)

.populate(
"project",
"title"
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

populatedTask

);

}

catch(error){

console.log(error);

res.status(500).json({

message:error.message

});

}

};



// Get Tasks

exports.getTasks=async(req,res)=>{

try{

let tasks;

if(req.user.role==="Admin"){

// Admin sees all tasks

tasks=

await Task.find()

.populate(
"project",
"title"
)

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

// Member sees only assigned tasks

tasks=

await Task.find({

assignedTo:req.user.id.toString()

})

.populate(
"project",
"title"
)

.populate(
"assignedTo",
"name email"
)

.populate(
"createdBy",
"name"
);

}


// Debug log

console.log({

userId:req.user.id,
role:req.user.role,
taskCount:tasks.length

});


res.json(tasks);

}

catch(error){

console.log(error);

res.status(500).json({

message:error.message

});

}

};



// Update Task Status

exports.updateTaskStatus=async(req,res)=>{

try{

const task=

await Task.findById(

req.params.id

);

if(!task){

return res.status(404).json({

message:"Task not found"

});

}


task.status=

req.body.status;

await task.save();

res.json({

message:"Task updated",

task

});

}

catch(error){

console.log(error);

res.status(500).json({

message:error.message

});

}

};



// Delete Task

exports.deleteTask=async(req,res)=>{

try{

const task=

await Task.findByIdAndDelete(

req.params.id

);

if(!task){

return res.status(404).json({

message:"Task not found"

});

}

res.json({

message:"Task deleted"

});

}

catch(error){

console.log(error);

res.status(500).json({

message:error.message

});

}

};