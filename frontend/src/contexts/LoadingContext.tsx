import React, { createContext, useContext, useState } from "react";

type LoadingContextType = {
    show: () => void;
    hide: () => void;
    isLoading: boolean;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context)
        throw new Error("useLoading must be used within LoadingProvider");
    return context;
};

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const show = () => setIsLoading(true);
    const hide = () => setIsLoading(false);

    return (
        <LoadingContext.Provider value={{ show, hide, isLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};
