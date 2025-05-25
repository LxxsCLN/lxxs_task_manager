import { loginUser, registerUser } from "@/api/auth";
import { Loading } from "@/components/Loading";
import { LoginForm } from "@/components/LoginForm";
import { SignupForm } from "@/components/SignupForm";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import LanguageToggle from "@/components/ui/language-toggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function LandingPage() {
    const { t } = useTranslation();
    const { login, user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            navigate("/");
        } else {
            setLoading(false);
        }
    }, []);

    async function onLogIn(values: any) {
        const { username, password } = values;
        try {
            const data = await loginUser({ username, password });
            login(data.token, data.user);
            navigate("/");
        } catch (err: any) {
            if (err.status === 401) {
                return toast(t(`landing.invalid_password`));
            }
            if (err.status === 400) {
                return toast(t(`landing.invalid_username`));
            }
        }
    }

    async function onSignUp(values: any) {
        const { name, username, password, confirmPassword } = values;
        try {
            const data = await registerUser({
                name,
                username,
                password,
                confirmPassword,
            });
            login(data.token, data.user);
            navigate("/");
        } catch (err: any) {
            if (err.status === 409) {
                return toast(t(`landing.username_taken`));
            }
            if (err.status === 400) {
                return toast(t(`home.error`));
            }
        }
    }

    return loading ? (
        <Loading />
    ) : (
        <div className="min-h-screen bg-gray-50 dark:bg-black flex flex-col items-center justify-center px-4">
            <header className="w-full max-w-4xl mx-auto flex items-center justify-between py-6">
                <div className="flex items-center gap-2">
                    <img
                        height={30}
                        width={30}
                        src="https://gruponxt.com/wp-content/uploads/2025/01/nxt-icon-working-with-energy-3-1024x1024-1-150x150.png"
                    />
                    <h1 className="text-2xl font-bold">{t("landing.title")}</h1>
                </div>
                <div className="flex gap-4">
                    <LanguageToggle />
                    <ThemeToggle />
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center gap-6 text-center">
                <h2 className="text-4xl font-extrabold tracking-tight">
                    {t("landing.description")}
                </h2>
                <p className="text-lg max-w-2xl text-gray-400">
                    {t("landing.description2")}
                </p>

                <Tabs defaultValue="login" className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">
                            {" "}
                            {t(`landing.submit_login`)}
                        </TabsTrigger>
                        <TabsTrigger value="signup">
                            {t(`landing.submit_signup`)}
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    {t(`landing.submit_login`)}
                                </CardTitle>
                                <CardDescription></CardDescription>
                            </CardHeader>
                            <LoginForm onSubmit={onLogIn} />
                        </Card>
                    </TabsContent>
                    <TabsContent value="signup">
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    {t(`landing.submit_signup`)}
                                </CardTitle>
                                <CardDescription></CardDescription>
                            </CardHeader>
                            <SignupForm onSubmit={onSignUp} />
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>

            <footer className="text-sm text-gray-500 py-4">
                © {new Date().getFullYear()} {t("landing.copyright")}
            </footer>
        </div>
    );
}
