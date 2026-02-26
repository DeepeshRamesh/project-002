const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let users = [];

//Signup endpoint
app.post("/signup",(req,res) => {
    const { email, password } = req.body;

    const existingUser = users.find((user) => user.email === email );

    if (existingUser){
        return res.status(400).json({
            message: "User already exists",
        });
    }

    users.push({ email , password });

    res.json({ message: "Signup successful" });
});

//Login endpoint
app.post("/login", (req,res) => {
    const { email , password } = req.body;

    const user = users.find(
        (u) => u.email === email && u.password === password
    );

    if (!user){
        return res.status(401).json({
            message:"Invalid credentials",
        });
    }

    const fakeToken = "token-" + Date.now();

    res.json({
        message: "Login successful",
        token: fakeToken,
        email: user.email,
    });
});

app.listen(5000,()=>{
    console.log("Server running on http://localhost:5000");
})