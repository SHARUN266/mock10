const {Schema,model}=require("mongoose")

const User=new Schema({
    fullName:{type:String,unique:false},
    email:{type:String,unique:true},
    password:{type:Number,unique:false}
},
{
    timestamps:true
},
{
    versionKey:false
})

const UserModel=model("user",User)

module.exports=UserModel