import { Loading } from "@/components/Loading.tsx";
import { Toaster } from "@/components/ui/sonner";
import { AppDataProvider } from "@/contexts/AppDataContext.tsx";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home.tsx";

function App() {
    return (
        <>
            <LoadingProvider>
                <AppDataProvider>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        {/* <Route path="/login" element={<LogIn />} />
                        <Route path="/signup" element={<SignUp />} /> */}
                    </Routes>
                    <Toaster />
                </AppDataProvider>
                <Loading />
            </LoadingProvider>
        </>
    );
}

export default App;
