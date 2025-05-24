import { Toaster } from "@/components/ui/sonner";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home.tsx";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} /> */}
            </Routes>
            <Toaster />
        </>
    );
}

export default App;
