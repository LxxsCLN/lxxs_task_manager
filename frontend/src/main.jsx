import { Loading } from "@/components/Loading.tsx";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext.tsx";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./i18n";
import "./index.css";

createRoot(document.getElementById("root")).render(
    <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        storageKey="vite-ui-theme"
    >
        <LoadingProvider>
            <AuthProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </AuthProvider>
            <Loading />
        </LoadingProvider>
    </ThemeProvider>
);
