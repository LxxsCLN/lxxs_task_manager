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
                    landing: {
                        title: "NEXT Task Manager",
                        description:
                            "Manage & Track Your Team's Tasks Efficiently",
                        description2:
                            "Stay organized and keep your team on track with real-time updates, task assignments, and progress monitoring.",
                        getStarted: "Get Started",
                        register: "Sign Up",
                        welcome: "Welcome to Task Manager",
                        welcomeDescription:
                            "A place to manage and track your team's tasks.",
                        submit_login: "Log In",
                        submit_signup: "Sign Up",
                        username: "Username",
                        password: "Password",
                        enterName: "Enter your name",
                        enterUsername: "Enter your username",
                        enterPassword: "Enter your password",
                        enterPasswordAgain: "Enter your password again",
                        invalid_password: "Incorrect password",
                        invalid_username: "The User was not found",
                        min_username: "Username must be at least 3 characters",
                        min_password: "Password must be at least 6 characters",
                        max_password: "Password must be at most 50 characters",
                        max_username: "Username must be at most 50 characters",
                        min_name: "Name must be at least 3 characters",
                        max_name: "Name must be at most 50 characters",
                        passwords_doNotMatch: "Passwords do not match",
                        name: "Name",
                        confirmPassword: "Confirm Password",
                        copyright: "NEXT Task Manager. All rights reserved.",
                    },
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
                        loading: "Loading...",
                        loadingTasks: "Loading tasks...",
                        pleaseWait: "Please wait...",
                        unauthorized: "Please log in again.",
                        error: "An error occurred. Please try again.",
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
                    editTaskModal: {
                        modalTitle: "Edit task",
                        modalDescription: "Edit the details of the task below.",
                        taskTitle: "Task title",
                        description: "Description",
                        status: "Status",
                        priority: "Priority",
                        assignedUser: "Assigned User",
                        save: "Save Changes",
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
                        delete: "Delete Task",
                        deleteConfirmation:
                            "Are you sure you want to delete this task?",
                        deleteConfirmationDescription:
                            "This action cannot be undone. This will permanently delete the task.",
                        deleteConfirmationCancel: "Cancel",
                        deleteConfirmationAction: "Delete",
                        taskUpdated: "Task updated successfully!",
                        taskDeleted: "Task deleted successfully!",
                        taskUpdateError:
                            "An error occurred while updating the task.",
                        taskDeleteError:
                            "An error occurred while deleting the task.",
                    },
                    confirmTaskModal: {
                        modalTitle: "Confirm task completed",
                        modalDescription:
                            "Confirm that the task has been completed.",
                        confirm: "Confirm",
                        cancel: "Cancel",
                        confirmationSuccess: "Task confirmed successfully!",
                        confirmationError:
                            "An error occurred while confirming the task.",
                        notes: "Notes",
                        enterNotes: "Enter your notes here...",
                        noNotes: "- No notes -",
                        close: "Close",
                        taskCompleted: "Task Completed",
                    },
                },
            },
            es: {
                translation: {
                    landing: {
                        title: "Gestor de Tareas NEXT",
                        description:
                            "Gestiona las Tareas de tu Equipo de Manera Eficiente",
                        description2:
                            "Mantente organizado y mantén a tu equipo en el camino correcto con actualizaciones en tiempo real, asignaciones de tareas y monitoreo del progreso.",
                        getStarted: "Comenzar",
                        login: "Iniciar Sesión",
                        register: "Registrarse",
                        welcome: "Bienvenido al Gestor de Tareas",
                        welcomeDescription:
                            "Un lugar para gestionar y realizar un seguimiento de las tareas de tu equipo.",
                        submit_login: "Iniciar Sesión",
                        submit_signup: "Registrarse",
                        username: "Nombre de Usuario",
                        password: "Contraseña",
                        enterName: "Ingresa tu nombre",
                        enterUsername: "Ingresa tu nombre de usuario",
                        enterPassword: "Ingresa tu contraseña",
                        enterPasswordAgain: "Ingresa tu contraseña nuevamente",
                        invalid_password: "Contraseña incorrecta",
                        invalid_username: "El usuario no fue encontrado",
                        min_username:
                            "El nombre de usuario debe tener al menos 3 caracteres",
                        min_password:
                            "La contraseña debe tener al menos 6 caracteres",
                        max_password:
                            "La contraseña debe tener como máximo 50 caracteres",
                        max_username:
                            "El nombre de usuario debe tener como máximo 50 caracteres",
                        min_name: "El nombre debe tener al menos 3 caracteres",
                        max_name:
                            "El nombre debe tener como máximo 50 caracteres",
                        passwords_doNotMatch: "Las contraseñas no coinciden",
                        name: "Nombre",
                        confirmPassword: "Confirmar Contraseña",
                        copyright:
                            "Gestor de Tareas NEXT. Todos los derechos reservados.",
                    },
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
                        loading: "Cargando...",
                        loadingTasks: "Cargando tareas...",
                        pleaseWait: "Por favor, espera...",
                        unauthorized: "Por favor inicia sesión nuevamente.",
                        error: "Ocurrió un error. Por favor intenta de nuevo.",
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
                    editTaskModal: {
                        modalTitle: "Editar tarea",
                        modalDescription:
                            "Edita los detalles de la tarea a continuación.",
                        taskTitle: "Título de la tarea",
                        description: "Descripción",
                        status: "Estatus",
                        priority: "Prioridad",
                        assignedUser: "Usuario Asignado",
                        save: "Guardar Cambios",
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
                        delete: "Eliminar Tarea",
                        deleteConfirmation:
                            "¿Estás seguro de que deseas eliminar esta tarea?",
                        deleteConfirmationDescription:
                            "Esta acción no se puede deshacer. Esto eliminará permanentemente la tarea.",
                        deleteConfirmationCancel: "Cancelar",
                        deleteConfirmationAction: "Eliminar",
                        taskUpdated: "¡Tarea actualizada exitosamente!",
                        taskDeleted: "¡Tarea eliminada exitosamente!",
                        taskUpdateError:
                            "Ocurrió un error al actualizar la tarea.",
                        taskDeleteError:
                            "Ocurrió un error al eliminar la tarea.",
                    },
                    confirmTaskModal: {
                        modalTitle: "Confirmar tarea completada",
                        modalDescription:
                            "Confirma que la tarea ha sido completada.",
                        confirm: "Confirmar",
                        cancel: "Cancelar",
                        confirmationSuccess: "¡Tarea confirmada exitosamente!",
                        confirmationError:
                            "Ocurrió un error al confirmar la tarea.",
                        notes: "Notas",
                        enterNotes: "Ingresa tus notas aquí...",
                        noNotes: "- Sin notas -",
                        close: "Cerrar",
                        taskCompleted: "Tarea Completada",
                    },
                },
            },
        },
    });

const language = i18n.language || "es";

export { i18n as default, language };
