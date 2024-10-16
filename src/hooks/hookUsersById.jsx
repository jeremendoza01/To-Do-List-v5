import { useEffect, useState } from "react";

export const useFetchUsersById = (usersIds) => {

    const getUsersById = async (userId) => {
        const url = `https://lamansysfaketaskmanagerapi.onrender.com/api/users/${userId}`;
        const resp = await fetch(url, {
            headers: {
                'Content-type': 'application/json',
                auth: localStorage.getItem('token'),
            }
        });

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

        if (usersIds) {
            fetchMembers();
        } else {
            setState({ data: [], loading: false });
        }
    }, [usersIds]);

    return state;
};
