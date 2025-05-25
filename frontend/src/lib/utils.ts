import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

let logoutFn: () => void;

export const setLogoutHandler = (fn: () => void) => {
    logoutFn = fn;
};

export const triggerLogout = () => {
    if (logoutFn) logoutFn();
};
