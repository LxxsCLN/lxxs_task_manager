import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home.jsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} /> */}
        </Routes>
    );
}

export default App;
