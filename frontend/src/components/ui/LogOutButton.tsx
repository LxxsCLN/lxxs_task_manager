import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const LogOutButton = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/landing");
    };

    return (
        <Button onClick={handleLogout} variant="outline" size="icon">
            <LogOut className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        </Button>
    );
};
