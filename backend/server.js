require('dotenv').config();
const cors = require('cors');

const express= require('express');
const app=express();
const http=require('http').Server(app);

const userRoutes = require('./routes/userRoutes');
const founderRoutes = require('./routes/founderRoutes');
const blogRoutes = require('./routes/blogRoutes');
const investorRoutes = require('./routes/investorRoutes');
const connectionRoutes = require('./routes/connectionRoutes');
const chatRoutes = require('./routes/chatRoutes');

const io = require('socket.io')(http, {
   cors: {
     origin: ["https://pitch-point.netlify.app","http://localhost:3000"],
     methods: ["GET", "POST"]
   }
 });
const chatSocket = require('./sockets/chatSocket');

const { default: mongoose } = require('mongoose');

//middleware
app.use(cors());

app.use((req,res,next) => {
   console.log(req.path, req.method);
   next();
})

//routes
app.use('/api/user', userRoutes);
app.use('/api/founder',founderRoutes);
app.use('/api/blogs',blogRoutes);
app.use('/api/investor',investorRoutes);
app.use('/api/connections',connectionRoutes);
app.use('/api/chat',chatRoutes);

//sockets
chatSocket(io);

//connecting to db
mongoose.connect(process.env.MONGO_URI)
   .then(()=>{
      //listening requests
      http.listen(process.env.PORT, () => {
         console.log("listening to port "+process.env.PORT);
      })
   })
   .catch((err)=>{
      console.log(err.message);
   })