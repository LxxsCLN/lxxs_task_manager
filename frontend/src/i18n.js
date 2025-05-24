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
                        in_progress: "In Progress",
                        pending: "Pending",
                        low: "Low",
                        medium: "Medium",
                        high: "High",
                        urgent: "Urgent",
                        multiPending: "Pending",
                        multiCompleted: "Completed",
                        multiUrgent: "Urgent",
                        noTasks: "No tasks found",
                        tryAdjustingFilters:
                            "Try adjusting the filters to see more tasks",
                        filters: "Filters",
                        search: "Search",
                        status: "Status",
                        priority: "Priority",
                        assignedUser: "Assigned User",
                        searchTasks: "Search tasks...",
                        allStatuses: "All Statuses",
                        allPriorities: "All Priorities",
                        allUsers: "All Users",
                        created: "Created",
                        all: "All",
                        all2: "All",
                        tasks: "Tasks",
                        completed_at: "Completed at",
                        next: "Next",
                        previous: "Previous",
                        page: "Page",
                    },
                    addTaskModal: {
                        modalTitle: "Add a new task",
                        modalDescription: "Enter details about the task below.",
                        taskTitle: "Task title",
                        description: "Description",
                        status: "Status",
                        priority: "Priority",
                        assignedUser: "Assigned User",
                        save: "Save Task",
                        selectUser: "Select User",
                        titleUserError:
                            "Both the title and the assigned user are required.",
                        genericError:
                            "An error occurred while saving the task.",
                        networkError: "Network error. Please try again.",
                        requiredField: "Required field",
                        requiredTitle: "Title is required",
                        titleError: "The title must be at least 3 characters.",
                        titleMaxError:
                            "The title must be at most 50 characters.",
                        userError: "The user must be selected.",
                        descriptionMaxError:
                            "The description must be at most 200 characters.",
                        taskCreated: "Task created successfully!",
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
                        completed: "Completada",
                        in_progress: "En Progreso",
                        pending: "Pendiente",
                        multiPending: "Pendientes",
                        multiCompleted: "Completadas",
                        low: "Baja",
                        medium: "Media",
                        high: "Alta",
                        urgent: "Urgente",
                        multiUrgent: "Urgentes",
                        noTasks: "No se encontraron tareas",
                        tryAdjustingFilters:
                            "Intenta ajustar los filtros para ver más tareas",
                        filters: "Filtros",
                        search: "Buscar",
                        status: "Estatus",
                        priority: "Prioridad",
                        assignedUser: "Usuario Asignado",
                        searchTasks: "Buscar tareas...",
                        allStatuses: "Todos los Estatus",
                        allPriorities: "Todas las Prioridades",
                        allUsers: "Todos los Usuarios",
                        created: "Creada",
                        all: "Todos",
                        all2: "Todas",
                        tasks: "Tareas",
                        completed_at: "Completada el",
                        next: "Siguiente",
                        previous: "Anterior",
                        page: "Página",
                    },
                    addTaskModal: {
                        modalTitle: "Agregar una nueva tarea",
                        modalDescription:
                            "Ingresa los detalles de la tarea a continuación.",
                        taskTitle: "Título de la tarea",
                        description: "Descripción",
                        status: "Estatus",
                        priority: "Prioridad",
                        save: "Guardar Tarea",
                        selectUser: "Seleccionar Usuario",
                        titleUserError:
                            "El título y el usuario asignado son obligatorios",
                        genericError: "Ocurrió un error al guardar la tarea.",
                        networkError:
                            "Error de red. Por favor, inténtalo de nuevo.",
                        requiredField: "Campo requerido",
                        requiredTitle: "El título es obligatorio",
                        titleError:
                            "El título debe tener al menos 3 caracteres.",
                        titleMaxError:
                            "El título debe tener como máximo 50 caracteres.",
                        userError: "El usuario debe ser seleccionado.",
                        descriptionMaxError:
                            "La descripción debe tener como máximo 200 caracteres.",
                        taskCreated: "¡Tarea creada exitosamente!",
                    },
                },
            },
        },
    });

const language = i18n.language || "es";

export { i18n as default, language };
