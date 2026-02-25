import { useState } from "react";
import API from "../services/api";

export default function Register() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleRegister = async () => {
    const res = await API.post("register/", data);

    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);

    alert("Registered & Logged In");
    window.location.href = "/";
  };

  return (
    <div>
      <h2>Register</h2>

      <input
        placeholder="Username"
        onChange={(e)=>setData({...data, username:e.target.value})}
      />

      <input
        placeholder="Email"
        onChange={(e)=>setData({...data, email:e.target.value})}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e)=>setData({...data, password:e.target.value})}
      />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}