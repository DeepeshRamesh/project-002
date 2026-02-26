import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Signup(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { signup } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignup = async () => {
        const result = await signup(email, password);

        if(!result.success){
            setError(result.message);
            return;
        }

        navigate("/");
    };

    return(
        <div style={{ padding:"40px"}}>
            <h1>Sign up</h1>

            <input 
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ display:"block",marginBottom:"10px",padding:"6px"}}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{display:"block",marginBottom:"10px",padding:"6px"}}
            />

            <button onClick={handleSignup}>
                Sign up
            </button>

            {error && (
                <p style={{ marginTop: "10px" }}>
                    {error}
                </p>
            )}

            <p style={{marginTop:"10px"}}>
                Already have an account? <Link to="/">Login</Link>
            </p>
        </div>
    )
}

export default Signup;