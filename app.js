const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const app = express();
 
 
app.use(bodyParser.urlencoded({extendend:false}));
app.use(express.json())


// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/API', { useNewUrlParser : true, useUnifiedTopology : true })
  .then(() => console.log('Database connected'))
  .catch((e) => console.log(e));

// File Schema
const fileSchema = new mongoose.Schema({
  Name: String,
  filepath: String,
  uploadDate: { type: Date, default: Date.now },
});

const File = mongoose.model('file', fileSchema);
//create product
app.post("/api/post/new", async(req, res) =>{
 const fileSchema = await fileSchema.create(req.body);
 res.status(200).json({
  success : true,
  product 
 })
})

app.listen(4000, ()=>{
  console.log("Server is working http://localhost:4000");
});
