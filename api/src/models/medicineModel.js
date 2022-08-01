const {Schema,model}=require("mongoose");


const medicineSchema= new Schema({
    medName:String,
    medType:String
})

const Medicine= model('Medicine',medicineSchema);

module.exports=Medicine;