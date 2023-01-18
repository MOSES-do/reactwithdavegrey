import React, { useEffect } from 'react'

const Users = ({ users, setUsers, fetchError, setFetchError, loaded }) => {

    const API_URL3 = 'http://jsonplaceholder.typicode.com/users';

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(API_URL3);
                if (!response.ok) throw Error('Did not receive expected data');
                const listUsers = await response.json();
                // console.log(listUsers);
                setUsers(listUsers);
                //if a successful request, setFetchError to null
                setFetchError(null);
            } catch (err) {
                setFetchError(err.message);
            }
        }

        (async () => await fetchUsers())();

    })

    return (
        <div className="header1">
            {users.map((user) => {
                return <li key={user.id}>{JSON.stringify({ user })}</li>
            })
            }
        </div>
    )
}

export default Users