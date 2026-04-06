import College from "../models/College.js";



export const searchColleges= async(req,res)=>{
    try{
        const search= req.query.search;
        const colleges= await College.find({ name: { $regex:`^${search}`, $options: "i" } }).limit(20);
        res.json(colleges);

    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}