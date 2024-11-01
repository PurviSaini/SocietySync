const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const {userAuth} = require('./middlewares/auth');
const User = require('./models/User');
const Task = require('./models/Task');
const Notice = require('./models/Notice');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Middleware for serving static files from the 'public' folder
app.use("/public", express.static(__dirname + "/public"));

//connect to databse
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(process.env.MONGO_URI, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.log("error in connection to db: ",error)
  }
}
run().catch(console.dir);

//serve pages
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/pages/login.html');
});

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/pages/signup.html');
  });

app.get('/Core', userAuth, (req, res) => {
    res.sendFile(__dirname + '/pages/core.html');
  });

app.get('/Member', userAuth, (req, res) => {
    res.sendFile(__dirname + '/pages/member.html');
  });

app.get('/Team', userAuth, (req, res) => {
    res.sendFile(__dirname + '/pages/team.html');
  });

//APIs
app.post('/signup', async (req, res) => { 
  const { name, username, password, team, role } = req.body;
  try {
    // Check for existing user
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send({ title: "User already exists" });
    }
    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create and save new user
    const user = new User({ name,username, password: hashedPassword,team,role });
    await user.save();
    res.status(200).send({ message: "Signup successful" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send({ message: "Failed to create user" });
  } 
});

app.post('/login',async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).send({ title: "User not Found" });
    }
    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ title: "Invalid Password" });
    }
    // Login successful, Adding JWT Authentication

    //1. Create JWT Token
    const token = await jwt.sign({_id: user._id}, process.env.JWT_SECRET);

    //2. Add the token to cookie and send the reponse back to the user
    res.cookie('token', token);
    
    // req.session.user = user;
    res.send({ message: "Login successful",role:user.role,team:user.team });
  } catch (error) {
    res.status(500).send({ message: "Failed to login" });
  }
 
});

//get associates of a particular team
app.post('/getAssociates', async (req, res) => {
  const { team, role } = req.body;
  try {
    const associates = await User.find({ team, role }).select("username");
    res.status(200).send({ status: true, data: associates });
  } catch (error) {
    console.error("Error fetching associates:", error);
    res.status(500).send({ status: false, message: "Error fetching associates" });
  }
});

//upload task by core member
app.post("/uploadTask",async(req,res)=>{
  const {title,description,team}=req.body;
  try{
    if(Array.isArray(team)){
      for(let i=0; i<team.length; i++){
        const task = new Task({title,description,team: team[i]});
        await task.save();
      }
    } else {
      const task = new Task({title,description,team});
      await task.save();
    }
    res.status(200).send({status:true});
  }
  catch(error){
    console.error("Error uploading task:",error);
    res.status(500).send({status:false});
  }
})

//upload notice by core 
app.post("/uploadNotice",async(req,res)=>{
  const {title,description}=req.body;
  try{
    const notice = new Notice({title,description});
    await notice.save();
    res.status(200).send({status:true,id:notice._id});
  }
  catch(error){
    console.error("Error uploading notice:",error);
    res.status(500).send({status:false});
  }
});

//display tasks
app.post("/getTasks",async(req,res)=>{
  const {team}=req.body;
  try{
    const tasks = await Task.find({ team: { $in: [team, "All"] } });
    res.status(200).send({status:true,data:tasks});
  }
  catch(error){
    console.error("Error fetching tasks:",error);
    res.status(500).send({status:false});
  }
})

//get Notices
app.post("/getNotices",async(req,res)=>{
  try{
    const notices = await Notice.find();
    res.status(200).send({status:true,data:notices});
  }
  catch(error){
    console.error("Error fetching notices:",error);
    res.status(500).send({status:false});
  }
});

// Delete task by ID
app.delete("/deleteTask/:id", async (req, res) => {
  const taskId = req.params.id;
  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).send({ message: "Task not found" });
    }
    res.status(200).send({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Server Error deleting task:", error);
    res.status(500).send({ message: "Failed to delete task" });
  }
});

//Delete notice
app.delete("/deleteNotice/:id", async (req, res) => {
  const noticeId = req.params.id;
  try {
    const deletedNotice = await Notice.findByIdAndDelete(noticeId);
    if (!deletedNotice) {
      return res.status(404).send({ message: "Notice not found" });
    }
    res.status(200).send({ message: "Notice deleted successfully" });
  } catch (error) {
    console.error("Server Error deleting notice:", error);
    res.status(500).send({ message: "Failed to delete notice" });
  }
});

//get list of coordinates
app.post("/getCoordinates",async(req,res)=>{
  const {team}=req.body;
  try{
    const coordinates = await User.find({ team, role: "Coordinator" }).select("username");
    res.status(200).send({status:true,data:coordinates});
  }
  catch(error){
    console.error("Error fetching coordinates:",error);
    res.status(500).send({status:false});
  }
});

//assign Task
app.post("/assignTask",async(req,res)=>{
  const {assignedTo,taskId}=req.body;
  try{
    await Task.findByIdAndUpdate(taskId,{status:"Assigned",assignedTo});
    res.status(200).send({status:true});
  }catch{
    console.error("Error updating task status:",error);
    res.status(500).send({status:false});
  }
});

//mark task as completed
app.put("/updateTaskStatus/:id",async(req,res)=>{
  const taskId=req.params.id;
  try{
    await Task.findByIdAndUpdate(taskId,{status:"Completed"});
    res.status(200).send({status:true});
  }catch{
    console.error("Error updating task:",error);
    res.status(500).send({status:false});
  }
});

//log out
app.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.send({ message: "Logout successful" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
