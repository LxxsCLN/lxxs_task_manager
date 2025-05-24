import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { getUsers } from "./api/users.js";
import Home from "./pages/Home.jsx";

function App() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUsers();
                setUsers(data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} /> */}
        </Routes>
    );
}

export default App;
