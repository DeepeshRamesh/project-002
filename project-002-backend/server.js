const bcrypt = require("bcrypt");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let users = [];
const tokens = [];

function authMiddleware(req,res,next){
    const authHeader = req.headers.authorization;

    if (!authHeader){
        return res.status(401).json({ message:"No token provided"});
    }

    const token = authHeader.split(" ")[1];

    if (!tokens.includes(token)){
        return res.status(403).json({message:"Invalid token"});
    }

    next();
}

//Signup endpoint
app.post("/signup", async (req,res) => {
    const { email, password } = req.body;

    const existingUser = users.find((user) => user.email === email );

    if (existingUser){
        return res.status(400).json({
            message: "User already exists",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email , hashedPassword });

    res.json({ message: "Signup successful" });
});

//Login endpoint
app.post("/login", async (req,res) => {
    const { email , password } = req.body;

    const user = users.find(
        (u) => u.email === email);

    if (!user){
        return res.status(401).json({
            message:"Invalid credentials",
        });
    }

    const passwordMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!passwordMatch){
        return res.status(401).json({
            message: "Invalid credentials",
        });
    }

    const fakeToken = "token-" + Date.now();
    tokens.push(fakeToken);

    res.json({
        message: "Login successful",
        token: fakeToken,
        email: user.email,
    });
});

//profile
app.get("/profile", authMiddleware,(req,res)=>{
    res.json({
        message: "Protected data access granted",
        data: "Sensitive user information",
    });
});

app.listen(5000,()=>{
    console.log("Server running on http://localhost:5000");
})