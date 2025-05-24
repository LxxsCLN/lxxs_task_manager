import LanguageToggle from "@/components/ui/language-toggle";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { UserResponse } from "@/interfaces/users";
import { t } from "i18next";
import { AddTaskModal } from "./AddTask";

export const Header = ({ users }: UserResponse) => {
    console.log(" Header users: ", users);
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
                <AddTaskModal users={users} />
                <div className="flex gap-4">
                    <LanguageToggle />
                    <ThemeToggle />
                </div>
            </div>
        </div>
    );
};

export default Header;
