import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [token, setToken] = useState(() => {
        return localStorage.getItem("token");
    });

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });
    
    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    const signup = async (email, password) => {
        try{
            const res = await fetch("http://localhost:5000/signup",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if(!res.ok){
                return { success: false, message: data.message };
            }

            return { success: true };
        } catch (error) {
            return{ success: false, message: "Server error" };
        }
    };

    const login = async (email,password) => {
        try {
            const res = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                return { success: false, message: data.message };
            }

            setToken(data.token);
            setUser({ email: data.email });

            return { success: true };
        } catch (error) {
            return { success: false, message: "Server error" };
        }
    };

    const logout =  () => {
        setToken(null);
        setUser(null);
    };

    return(
        <AuthContext.Provider value ={{ user, token, login, logout, signup }}>
            {children}
        </AuthContext.Provider>
    );

}
