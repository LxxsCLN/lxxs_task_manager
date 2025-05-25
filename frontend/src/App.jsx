import { Toaster } from "@/components/ui/sonner";
import { AppDataProvider } from "@/contexts/AppDataContext.tsx";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home.tsx";

function App() {
    return (
        <>
            <AppDataProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    {/* <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} /> */}
                </Routes>
                <Toaster />
            </AppDataProvider>
        </>
    );
}

export default App;
