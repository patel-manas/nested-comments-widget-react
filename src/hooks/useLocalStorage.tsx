import { useState } from "react";

/**
 * This is a custom hooks which stores a value to loval storage. The usage of local storage through hook is intutive and easy to use.
 * @param key string
 * @returns 
 */
export const useLocalStorage = <T,>(
    key: string
): [T | null, (value: T | ((prevState: T | null) => T)) => void] => {
    const [storedValue, setStoredValue] = useState<T | null>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    });

    const setValue = (value: T | ((prevState: T | null) => T)) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.log(error);
        }
    };

    return [storedValue, setValue];
};
