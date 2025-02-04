require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// Initialize Express app
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());










// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));







  
// Define User Schema & Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 100 },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true, minlength: 8 },
  schoolName: { type: String, required: true }, // Security question answer
});
const User = mongoose.model("User", userSchema);

// Register User Route
app.post("/api/auth/register", async (req, res) => {
  const { name, email, password, schoolName } = req.body;

  try {
    if (!name || !email || !password || !schoolName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword, schoolName });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Login Route
// Login Route code to login the user
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    }); // generating a token once logged in

    // Set the token as an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true, // Ensures the cookie cannot be accessed via JavaScript 
      secure: process.env.NODE_ENV === "production", // Set to true in production for HTTPS
      maxAge: 3600000, // 1 hour for cookie storeage 
    });

    res.json({ message: "Login successful",authToken:token,email,name:user.name,identity:user.identity});
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


// Password Reset Route takes email and the security question to reset
app.post("/api/auth/password-reset", async (req, res) => {
  const { email, schoolName, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.schoolName !== schoolName) {
      return res.status(400).json({ message: "Incorrect answer to the security question" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.get("/auth/validateToken", (req, res) => {
  console.log('cookie::',req.cookies)
  const token = req.cookies.authToken; // Get token from cookie

    if (!token) {
        return res.status(401).json({ message: "Unauthorized",code:"01" });
    }

    jwt.verify(token, "your_secret_key", (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token",code:"01" });
        }
        req.user = decoded; // Attach user info to request
        res.json({ message: "Access granted", code:'00' });
    });
});










//admin login and register



// Define Admin Schema
const superAdminSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 100 },
  identity :{type:Number, required:true},
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true, minlength: 8 },
  schoolName: { type: String, required: true }, // Security question answer
});

const SuperAdmin = mongoose.model("SuperAdmin", superAdminSchema);


// Fix the incorrect schema reference here

//register for admin

app.post("/api/auth/superadminregister", async (req, res) => {
  const { name,identity, email, password, schoolName } = req.body;

  try {
    if (!name || !email || !password || !schoolName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let superAdmin = await SuperAdmin.findOne({ email });
    if (superAdmin) return res.status(400).json({ message: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    superAdmin = new SuperAdmin({ name, identity, email, password: hashedPassword, schoolName });
    await superAdmin.save();

    res.status(201).json({ message: "SuperAdmin registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


//login for admin 

app.post("/api/auth/superadminlogin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const superAdmin = await SuperAdmin.findOne({ email });  // ✅ Use SuperAdmin model
    console.log(superAdmin);
    if (!superAdmin) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, superAdmin.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: superAdmin._id, role: "superadmin" }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });

    res.json({ message: "SuperAdmin login successful", authToken: token,email,name:superAdmin.name,identity:superAdmin.identity });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});












// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
