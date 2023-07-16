const Login = require("../models/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "keyForMadadService";

exports.register = async (req, res) => {
  const { name, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await Login.findOne({ name });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = new Login({ name, password: hashedPassword });
    await newUser.save();

    res.json({ message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// read route
exports.login = async (req, res) => {
  const { name, password } = req.body;

  try {
    // Find the user by name in the database
    const user = await Login.findOne({ name });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate a JWT
    const token = jwt.sign({ id: user._id }, SECRET_KEY);

    // Send the JWT back to the client
    res.cookie("token", token, { httpOnly: true }).json({
      success: true,
      name: name,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
// exports.login = async (req, res) => {
//   const { name, password, token } = req.body;
//   const encryptedPassword = await bcrypt.hash(password, 10);
//   if (name === default_name && password === default_password) {
//     await Login.save().then(() => res.json({ success: true }));
//   } else {
//     res.json({ success: false });
//   }
// };

// update route
exports.login_update = async (req, res) => {
  const { name, password } = req.body;
  const user1 = await Login.findOne({ name });
  const isPasswordValid = await bcrypt.compare(password, user1.password);
  const newLogin = { name: name, password: isPasswordValid };
  const user = await Login.findOneAndUpdate({}, { $set: newLogin })
    .then((data) => res.json({ success: true, data: data }))
    .catch(() => res.json({ success: false }));
};

// read route
exports.get_login = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    res.status(401).json({ success: false });
  } else if (token) {
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.id;
    const user = await Login.findById({ _id: userId });
    res.status(200).json({ success: true, token: token });
  }
};
