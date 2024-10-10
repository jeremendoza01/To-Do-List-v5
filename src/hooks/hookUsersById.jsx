import { useEffect, useState } from "react";

export const useFetchUsersById = (usersIds) => {

    const getUsersById = async (userId) => {
        const url = `https://lamansysfaketaskmanagerapi.onrender.com/api/users/${userId}`;
        const resp = await fetch(url, {
            headers: {
                'Content-type': 'application/json',
                auth: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOnsiZmlyc3QiOiJXYWx0ZXIiLCJsYXN0IjoiTW9saW5hIn0sIl9pZCI6IjYyMDE0Y2RhNGM2NGEzNGNjODg4MWJmZCIsImVtYWlsIjoid2FsdGVybW9saW5hQG1zbi5jb20iLCJ1c2VybmFtZSI6IndhbHRlcm1vbGluYSIsIl9fdiI6MH0sImlhdCI6MTcyODUyNTQ2NiwiZXhwIjoxNzI4NjExODY2fQ.31XEHC0k0hL3XZbzhpZc4ckCsTlKcarDZsQxnXwYkMs",
            }
        });

        if (!resp.ok) {
            throw new Error(`Error: ${resp.status}`);
        }

        const { data } = await resp.json();
        return data;
    };

    const [state, setState] = useState({
        data: [],
        loading: true
    });

    useEffect(() => {
        const fetchMembers = async () => {
            const idsArray = Array.isArray(usersIds) ? usersIds : [usersIds];

            if (idsArray && idsArray.length > 0) {
                try {
                    const members = await Promise.all(idsArray.map(userId => getUsersById(userId)));
                    setState({ data: members, loading: false });
                } catch (error) {
                    console.log(error);
                    setState({ data: [], loading: false });
                }
            } else {
                setState({ data: [], loading: false });
            }
        };

        if (usersIds) { // Asegurarse de que usersIds no sea nulo o indefinido.
            fetchMembers();
        } else {
            setState({ data: [], loading: false });
        }
    }, [usersIds]);

    return state;
};
