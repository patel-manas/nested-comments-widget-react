import { ChangeEvent, useContext } from "react"

import { UserContex } from "../context/user-context"

export const Header = () => {
    const { users, setCurrentUser } = useContext(UserContex)
    const userChangeHandler = (evt: ChangeEvent<HTMLSelectElement>) => {
        console.log('user change', evt.target.value)
        const selectedUser = users.find(user => user.id === Number(evt.target.value))
        setCurrentUser(selectedUser)
    }
    return (
        <div className="header">
            <div className="title">Nested Comment Widget</div>
            <div className="user-selector">
                <select onChange={userChangeHandler}>
                    {
                        users.map(user => {
                            return <option key={user.id} value={user.id}>{user.name}</option>
                        })
                    }
                </select>
            </div>
        </div>
    )
}