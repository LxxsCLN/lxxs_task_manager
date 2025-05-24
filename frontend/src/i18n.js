import i18n from "i18next";
// import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
    //.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: "es",
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {
                translation: {
                    home: {
                        title: "Task Manager",
                        description: "Manage and track your team's tasks",
                        newTask: "New Task",
                        totalTasks: "Total Tasks",
                        completed: "Completed",
                        inProgress: "In Progress",
                        pending: "Pending",
                        urgent: "Urgent",
                        noTasks: "No tasks available",
                    },
                },
            },
            es: {
                translation: {
                    home: {
                        title: "Gestor de Tareas",
                        description:
                            "Gestiona y realiza un seguimiento de las tareas de tu equipo",
                        newTask: "Nueva Tarea",
                        totalTasks: "Total de Tareas",
                        completed: "Completadas",
                        inProgress: "En Progreso",
                        pending: "Pendientes",
                        urgent: "Urgentes",
                        noTasks: "No hay tareas disponibles",
                    },
                },
            },
        },
    });

export default i18n;
