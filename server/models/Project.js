const mongoose=require("mongoose");

const projectSchema=new mongoose.Schema({

title:{
type:String,
required:true
},

description:{
type:String
},

assignedTo:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
},

createdBy:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
}

},
{
timestamps:true
}
);

module.exports=

mongoose.model(
"Project",
projectSchema
);