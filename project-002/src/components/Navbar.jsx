import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
    const { user, logout } = useContext(AuthContext);

    return(
        <nav style={{
            padding: "16px",
            background: "#111827",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
        }}>
            <div>
                <Link to="/dashboard" style={{ color: "white", textDecoration: "none"}}>
                    Project-002
                </Link>
            </div>

            <div>
                {user && (
                    <>
                        <span style={{marginRight: "12px"}}>
                            {user.email}
                        </span>
                        <button onClick={logout}>
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;