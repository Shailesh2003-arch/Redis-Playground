import express from 'express'
import mongoose from 'mongoose'
import User from './models/user.models.js';
import redisClient from './services/redis.js'


// creating a server...
const app = express()

app.use(express.json())

// connecting to local database...
await mongoose.connect('mongodb://localhost:27017/mydb')



// An endpoint for creating new user...
app.post('/user/create', async(req, res) => { 
    const newUser = await User.create(req.body);
    res.status(201).json({
        status: "success",
        data: {
            user:newUser
        }
    })
})


// endpoint for getting user with respective Id.
app.get('/user/:id', async(req, res) => {
  const userId = req.params.id;

  // 1️⃣ Check cache first (If the user's info exists in the cache - fetch it directly from cache!...)
  const cachedUser = await redisClient.get(`user:${userId}`);
  if (cachedUser) {
    console.log("Cache hit!");
    return res.json(JSON.parse(cachedUser));
  }

  // 2️⃣ If not in cache, fetch from MongoDB
  console.log("Cache miss. Fetching from DB...");
  const user = await User.findById(userId);

  if (!user) return res.status(404).json({ message: "User not found" });

    // 3️⃣ Store in cache (stringify it) store the user in the cache now! so to access to it in future!...
    
    await redisClient.set(`user:${userId}`, JSON.stringify(user)); // stored in key-value always!...

    res.status(200).json({
        'status':'sucess',
        'data':user
    })
})



// app listening...
app.listen(3000, () => console.log("Server running on port 3000"));