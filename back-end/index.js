import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const app = express();
const PORT = process.env.PORT || 8080

dotenv.config()
const MONGO_URI = process.env.CONNECTION_URL || "mongodb://localhost:27017";
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT"],
    }))
app.use(express.json({extend: false}));

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });


const withDB = async (operations, res) => {
    let client;
    try {
        client = new MongoClient(MONGO_URI);
        await client.connect();
        const db = client.db("blog");
        await operations(db);
    }
    catch (error) {
        console.error('Error in withDB:', error);
        res.status(500).json({message: "Error connecting to database", error});
    }
    finally {
        if (client) {
            await client.close();
        }
    }
}

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);



app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

app.get('/api/profile', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1]; // Extract the token from "Bearer <token>"

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ username: user.username });
  } catch (error) {
    console.error('Error in /api/profile:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
});

app.get('/api/articles/:name', async(req, res) => {
    withDB(async(db) => {
        const articleName = req.params.name;
        const articleInfo = await db.collection("articles").findOne({name: articleName})
        res.status(200).json(articleInfo)
    }, res)
});

app.post("/api/articles/:name/add-comments", (req, res) => {
    const {username, text} = req.body;
    const articleName = req.params.name;
    withDB(async(db) => {
        const articleInfo = await db.collection('articles').findOne({name: articleName})
        await db.collection('articles').updateOne({name: articleName} , {
            $set: {
                comments: articleInfo.comments.concat({username, text}),
            },
        }
      );
        const updateArticleInfo = await db.collection("articles").findOne({name: articleName})
        res.status(200).json(updateArticleInfo)
    }, res)
});

app.listen(PORT, () => console.log(`Server started at ${PORT}`));