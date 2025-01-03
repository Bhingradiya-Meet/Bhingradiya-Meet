"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

const ThemeContext = createContext<{
    theme: "light" | "dark" | "system";
    effectiveMode: "light" | "dark";
    toggleTheme: () => void;
    setTheme: React.Dispatch<React.SetStateAction<"light" | "dark" | "system">>;
}>({
    theme: "system",
    effectiveMode: "light",
    toggleTheme: () => { },
    setTheme: () => { },
});

function initializeStorage(storageType: "session" | "local") {
    const set = (key: string, value: any) => {
        if (typeof window !== "undefined") {
            const storage = storageType === "session" ? sessionStorage : localStorage;
            storage.setItem(key, JSON.stringify(value));
        }
    };

    const get = (key: string) => {
        if (typeof window !== "undefined") {
            const storage = storageType === "session" ? sessionStorage : localStorage;
            const item = storage.getItem(key);
            return item ? JSON.parse(item) : null;
        }
        return null;
    };

    return { set, get };
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const storageKey = "theme";
    const storage = React.useMemo(() => initializeStorage("local"), []);
    const { set, get } = storage;
    const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
    const [effectiveMode, setEffectiveMode] = useState<"light" | "dark">("light");

    useEffect(() => {
        const storedTheme = get(storageKey);
        if (storedTheme && storedTheme !== theme) {
            setTheme(storedTheme);
        } else if (!storedTheme) {
            set(storageKey, theme);
        }
    }, [get, theme]);

    useEffect(() => {
        const root = document.documentElement;

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light";
            setEffectiveMode(systemTheme);
            root.classList.remove("light", "dark");
            root.classList.add(systemTheme);
        } else {
            setEffectiveMode(theme);
            root.classList.remove("light", "dark");
            root.classList.add(theme);
        }
    }, [theme]);

    useEffect(() => {
        if (theme === "system") {
            const listener = (e: MediaQueryListEvent) => {
                const systemTheme = e.matches ? "dark" : "light";
                setEffectiveMode(systemTheme);
                document.documentElement.classList.remove("light", "dark");
                document.documentElement.classList.add(systemTheme);
            };
            const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
            mediaQuery.addEventListener("change", listener);

            return () => mediaQuery.removeEventListener("change", listener);
        }
    }, [theme]);

    const toggleTheme = useCallback(() => {
        const newTheme = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
        setTheme(newTheme);
        set(storageKey, newTheme);
    }, [theme, set, storageKey]);

    const contextValue = React.useMemo(
        () => ({ theme, effectiveMode, toggleTheme, setTheme }),
        [theme, effectiveMode, toggleTheme]
    );

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);