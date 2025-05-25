import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Toaster } from "@/components/ui/sonner";
import { AppDataProvider } from "@/contexts/AppDataContext.tsx";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home.tsx";
import LandingPage from "./pages/LandingPage.tsx";

function App() {
    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <AppDataProvider>
                                <Home />
                            </AppDataProvider>
                        </ProtectedRoute>
                    }
                />
                <Route path="/landing" element={<LandingPage />} />
            </Routes>
            <Toaster position="bottom-center" />
        </>
    );
}

export default App;
