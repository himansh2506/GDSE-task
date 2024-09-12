/*1. Develop a set of backend APIs covering CRUD operations for file storage, authentication,
real-time communication using Sockets
Tasks:
CRUD APIs for File Storage:
Objective: Create APIs to upload, retrieve, update, and delete files on the server.
Requirements:
POST /files: Upload a file to the server.
GET /files/:id: Retrieve a file by its unique ID.
PUT /files/:id: Update an existing file by replacing it with a new one.
DELETE /files/:id: Delete a file from the server.
Store files in a directory on the server and keep metadata (e.g., file name, upload date) in a
database.*/





import express, { json } from "express";
import mongoose from "mongoose";
import path from "path";
import multer from "multer";

mongoose.connect( "mongodb://127.0.0.1:27017", {
  dbName: "api",
})
.then(() => console.log("Database connected"))
.catch((e) => console.log(e));

//file schema
const fileSchema = new mongoose.Schema({
  Name: String,
  filepath: String,
  uploadDate : { type: Date, default: Date.now},
});
const File = mongoose.model("file", fileSchema);

const upload = multer({dest: 'upload/' });

app.use(express.json());


const app = express();
//server created
app.listen(4000, () => {
    console.log("Server is working http://localhost:4000");
 
});

//post /files
app.post('/files', upload.single('file'), async (req, res) =>{
  try{
    const file = new File({
      Name : req.file.Name,
      filepath : req.file.path,
    });
    await file.save();
    res.status(201).json(file);

  } catch(error){
    res.status(500).json({message: 'error uploading file', error});
  }

  
});


//get /file
app.get('/files/id:', async (req, res) => {
  
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
        return res.status(404).json({ message: 'File not found' });
    }
    res.download(path.resolve(__dirname, file.filePath), file.originalName);
} catch (error) {
    res.status(500).json({ message: 'Error retrieving file', error });
}
});
app.put('/files/:id', upload.single('file'), async (req, res) => {
  try {
      const file = await File.findById(req.params.id);
      if (!file) {
          return res.status(404).json({ message: 'File not found' });
      }

      // Delete the old file
      await fs.unlink(file.filePath);

      // Update file metadata
      file.originalName = req.file.originalname;
      file.filePath = req.file.path;
      await file.save();

      res.json(file);
  } catch (error) {
      res.status(500).json({ message: 'Error updating file', error });
  }
});

// DELETE /files/:id: 
app.delete('/files/:id', async (req, res) => {
  try {
      const file = await File.findById(req.params.id);
      if (!file) {
          return res.status(404).json({ message: 'File not found' });
      }

      // Delete the file from the server
      await fs.unlink(file.filePath);
      await file.remove();

      res.json({ message: 'File deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Error deleting file', error });
  }
});
