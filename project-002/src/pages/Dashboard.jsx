import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function Dashboard(){
    const { token } = useContext(AuthContext);
    const [ data, setData ] = useState("");

    useEffect(() => {
        const fetchProtectedData = async () => {
            try{
                const res = await fetch("https://localhost:5000/profile",{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const result = await res.json();

                if (res.ok) {
                    setData(result.data);
                }else{
                    setData(result.message);
                }
            }catch(error) {
                setData("Server error");
            }
        };

        fetchProtectedData();
    }, [token]);

    return (
        <div style={{ padding: "40px" }}>
            <h1>Dashboard</h1>
            <p>{data}</p>
        </div>
    );
}

export default Dashboard;