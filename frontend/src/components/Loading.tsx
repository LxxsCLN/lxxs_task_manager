import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useLoading } from "@/contexts/LoadingContext";
import { useTranslation } from "react-i18next";

export const Loading = () => {
    const { t } = useTranslation();
    const { isLoading } = useLoading();

    return (
        <AlertDialog open={isLoading}>
            <AlertDialogContent asChild>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                            <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-2xl flex flex-col items-center space-y-4 w-72">
                                <div className="relative">
                                    <div className="h-12 w-12 border-4 border-gray-500 border-t-transparent rounded-full animate-spin" />
                                </div>

                                <div className="text-gray-600 dark:text-gray-300 text-sm text-center">
                                    {t("home.loading")}
                                </div>
                            </div>
                        </div>
                    </AlertDialogTitle>
                    <AlertDialogDescription></AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    );
};
