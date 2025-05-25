import { LogOutButton } from "@/components/ui/LogOutButton";
import LanguageToggle from "@/components/ui/language-toggle";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useTranslation } from "react-i18next";
import { AddTaskModal } from "./AddTask";

export const Header = () => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center sm:text-start">
                    {t("home.title")}
                </h1>
                <p className="text-gray-600 mt-1 dark:text-gray-300 text-center sm:text-start">
                    {t("home.description")}
                </p>
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between">
                <AddTaskModal />
                <div className="flex gap-4">
                    <LanguageToggle />
                    <ThemeToggle />
                    <LogOutButton />
                </div>
            </div>
        </div>
    );
};

export default Header;
