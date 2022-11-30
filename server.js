const express = require("express");
const mongoose = require("mongoose");
const BrandName = require("./model");

const app = express();
app.use(express.json());  
mongoose.connect('mongodb+srv://vamsipavan:vamsipavan@cluster0.tzcx2np.mongodb.net/?retryWrites=true&w=majority').then(() => {
    console.log("DB Connected");
  }).catch((error) => console.log("error"));

app.post("/addbrands", async (req, res) => {
  const { brandname } = req.body;
  try {
    const newData = new BrandName({ brandname });
    await newData.save();
    return res.json(await BrandName.find());
  } catch (err) {
    console.log(err.message);
  }
  //   res.send("Helo Server Start")
});
app.get("/getbrands",async(req,res)=>{
  
  try {
    const allData= await BrandName.find();
    return res.json(allData)
  }
  catch(err){
    console.log(err.message)
  }
})
app.get("/getbrands/:id",async(req,res)=>{
  try{
    const data=await BrandName.findById(req.params.id);
    return res.json(data)
  }
  catch(err){
    console.log(err.message)
  }
})
app.delete("/deletebrand/:id",async(req,res)=>{
  try{
    await BrandName.findByIdAndDelete(req.params.id);
    return res.json(await BrandName.find())
  }
  catch(err){
    console.log(err.message)
  }
})

app.listen(3000, () => {
  console.log("server running.....");
});
