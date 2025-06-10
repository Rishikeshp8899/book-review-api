import React, { createContext, useContext, useState,ReactNode } from "react";
interface AuthContextType{
    user:string|null;
    login:(username:string,password:string)=>Promise<boolean>;
    logout:()=>void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider=({children}: { children: ReactNode })=>{
    const [user,setUser]=useState<string|null>(null);
    const login=async (username:string,password:string)=>{
        try{
             const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
          if (!response.ok) {
        // Login failed (e.g., 401 Unauthorized)
        return false;
      }
       const data = await response.json();
      if (data.user) {
        setUser(data.user);
      localStorage.setItem("user", username);
      localStorage.setItem("password", password);
        return true;
      }
         return false;
        }
        catch(error){
            console.log(error)
            return false;
            
        }
    }
    const logout = () => {
    setUser(null);
     localStorage.removeItem("user");
     localStorage.removeItem("password");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth=()=>{
     const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}