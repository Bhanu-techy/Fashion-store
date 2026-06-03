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

     const token = jwt.sign(
      { id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" }
    );

    await user.save();

    res.status(200).json({token, user: {id: user.id, email: user.email,},});

    try {
      await sendRegistrationEmail(email, name);
    } catch (err) {
      res.json({msg: err.message});
    }
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

  try {
    const user = await User.findOne({email});

    if (!user) {
      return res.status(400).json({message: "Invalid Email",});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({message: "Invalid Password",});
    }

    const token = jwt.sign(
      { id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" }
    );

    res.status(200).json({token, user: {id: user.id, email: user.email,},});

  } catch (error) {
    res.status(500).json({message: error.message, });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.send(product)

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
  
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});


