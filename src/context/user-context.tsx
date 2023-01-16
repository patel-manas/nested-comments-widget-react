import { createContext, useEffect, useState, ReactNode, FC } from "react";
import { User } from "../Types";
import { initialUsers } from "./initialState";

type UserContextValues = {
    users: User[],
    currentUser: User | undefined,
    setCurrentUser: (user: User | undefined) => void
}
const UserContex = createContext<UserContextValues>({ users: initialUsers, currentUser: {} as User, setCurrentUser: (user: User | undefined) => { } })

type UserContextProviderProps = {
    children: ReactNode
}
const UserContextProvider: FC<UserContextProviderProps> = ({ children }) => {
    const [users] = useState<User[]>(initialUsers)
    const [currentUser, setCurrentUser] = useState<User | undefined>(users[0])

    useEffect(() => setCurrentUser(users[0]), [])

    return (
        <UserContex.Provider value={{ users, currentUser, setCurrentUser }}>
            {children}
        </UserContex.Provider>
    )
}

export { UserContex, UserContextProvider }