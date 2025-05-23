import { useEffect, useState } from "react";
import "./App.css";
import { getUsers } from "./api/users.js";

function App() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUsers();
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {users.map((user) => (
                <div key={user.id}>
                    <h2>{user.name}</h2>
                    <p>{user.username}</p>
                </div>
            ))}
        </>
    );
}

export default App;
