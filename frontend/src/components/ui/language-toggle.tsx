import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function LanguageToggle() {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === "en" ? "es" : "en";
        i18n.changeLanguage(newLang);
    };

    return (
        <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={toggleLanguage}
        >
            <Globe className="h-5 w-5" />
            <span>{i18n.language === "en" ? "EN" : "ES"}</span>
            <span className="sr-only">
                {i18n.language === "en" ? "Toggle language" : "Cambiar idioma"}
            </span>
        </Button>
    );
}
