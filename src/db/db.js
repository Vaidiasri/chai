import  mongoose from "mongoose"
// database  is  in another  space 
const connection=async()=>{
    try{
        const  connecionInstance=await mongoose.connect(`${process.env.DATABASE_URI}`)
        console.log(`connection connect  ho gaya ${connecionInstance}` )

    }catch(error){
        console.log("error  hai bhai error  hai ")
        process.exit(1)
    } 
    

}