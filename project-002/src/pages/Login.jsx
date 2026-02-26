import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login(){
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const{ login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async () => {
        const result = await login(email,password);

        if(!result.success){
            setError(result.message);
            return;
        }
        navigate("/dashboard");
    };

    return (
        <div style={{ padding: "40px" }}>
            <h1>Login</h1>

            <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ marginRight: "10px", padding: "6px" }}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ display: "block", marginBottom: "10px", padding: "6px" }}
            />

            <button onClick={handleLogin}>
                Login
            </button>

            <p style={{ marginTop:"10px" }}>
                No account? <Link to="/signup">Signup</Link>
            </p>
        </div>
    );
}

export default Login;