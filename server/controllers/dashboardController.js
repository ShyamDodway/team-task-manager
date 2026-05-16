const Task = require("../models/Task");
const Project = require("../models/Project");

exports.getDashboardStats = async (req,res)=>{

try{

let taskFilter={};

let projectFilter={};


// Member sees only assigned data

if(req.user.role==="Member"){

taskFilter={

assignedTo:req.user.id

};

projectFilter={

assignedTo:req.user.id

};

}


// Total Tasks

const totalTasks=

await Task.countDocuments(

taskFilter

);


// Completed Tasks

const completedTasks=

await Task.countDocuments({

...taskFilter,

status:"Completed"

});


// Pending Tasks

const pendingTasks=

await Task.countDocuments({

...taskFilter,

status:"Pending"

});


// In Progress Tasks

const inProgressTasks=

await Task.countDocuments({

...taskFilter,

status:"In Progress"

});


// Overdue Tasks

const overdueTasks=

await Task.countDocuments({

...taskFilter,

dueDate:{

$lt:new Date()

},

status:{

$ne:"Completed"

}

});


// Total Projects

const totalProjects=

await Project.countDocuments(

projectFilter

);


// Tasks grouped by project

const projectTasks=

await Task.aggregate([

{

$match:{

...taskFilter,

project:{

$exists:true,

$ne:null

}

}

},

{

$lookup:{

from:"projects",

localField:"project",

foreignField:"_id",

as:"projectData"

}

},

{

$unwind:"$projectData"

},

{

$group:{

_id:"$projectData.title",

count:{

$sum:1

}

}

},

{

$project:{

_id:0,

projectName:"$_id",

count:1

}

}

]);


res.json({

totalTasks,
completedTasks,
pendingTasks,
inProgressTasks,
overdueTasks,
totalProjects,
projectTasks

});

}

catch(error){

res.status(500).json({

message:error.message

});

}

};