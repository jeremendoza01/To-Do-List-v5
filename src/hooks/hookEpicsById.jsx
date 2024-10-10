import { useState, useEffect } from "react";

export const useFetchEpicsById = (epicId) => {

    const getEpicsById = async (epicId) => {
        const url = `https://lamansysfaketaskmanagerapi.onrender.com/api/epics/${epicId}`;

        try {
            const resp = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    auth: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOnsiZmlyc3QiOiJXYWx0ZXIiLCJsYXN0IjoiTW9saW5hIn0sIl9pZCI6IjYyMDE0Y2RhNGM2NGEzNGNjODg4MWJmZCIsImVtYWlsIjoid2FsdGVybW9saW5hQG1zbi5jb20iLCJ1c2VybmFtZSI6IndhbHRlcm1vbGluYSIsIl9fdiI6MH0sImlhdCI6MTcyODUyNTQ2NiwiZXhwIjoxNzI4NjExODY2fQ.31XEHC0k0hL3XZbzhpZc4ckCsTlKcarDZsQxnXwYkMs"
                }
            });

            if (!resp.ok) {
                throw new Error(`Error: ${resp.status}`);
            }

            const { data } = await resp.json();
            return data;

        } catch (error) {
            console.error("Error fetching epics:", error);
            throw error;
        }
    }


    const [state, setState] = useState({
        data: [],
        loading: true
    })

    useEffect(() => {
        getEpicsById(epicId)
            .then(epic => {
                setState({
                    data: epic,
                    loading: false
                })
            })
            .catch(() => {
                setState({
                    data: null,
                    loading: false
                })
            })
    }, [])


    return state;
}