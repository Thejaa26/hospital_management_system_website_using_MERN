const mongoose=require("mongoose");
const doctorSchema=new mongoose.Schema({
    name:{type:String,
         required:true
        },
    email:{type:String,
        required:true,
        unique:true
    },
    password:{type:String,
        required:true
    }
},{
    collection:"students"
}
)
module.exports=mongoose.model("doctorSchema",doctorSchema);