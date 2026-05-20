const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors=require('cors')

const JWT_SECRET = process.env.JWT_SECRET

require('dotenv').config();
const connectDB = require('./config/db');

const app = express();
app.use(cors());

// Connect DB
connectDB();

app.use(express.json());

const Product = require('./models/Product')
const User = require("./models/User");

const {sendRegistrationEmail } = require("./services/emailService");


app.get("/products", async (req, res) => {
  try {
    const data = await Product.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



app.post("/register", async (req, res) => {

  const {name, email, password} = req.body

  try {
    const users = await User.find();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    await sendRegistrationEmail(email, name);

    res.status(201).json({
      msg: "User registered successfully",
      name : user.name, id : user.id
    });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

  
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});


