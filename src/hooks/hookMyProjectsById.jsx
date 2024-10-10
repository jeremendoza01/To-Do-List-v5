import { useState, useEffect } from "react";

export const useFetchProjectsById = (projectId) => {

    const getProjectsById = async (projectId) => {
        const url = `https://lamansysfaketaskmanagerapi.onrender.com/api/projects/${projectId}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                auth: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOnsiZmlyc3QiOiJXYWx0ZXIiLCJsYXN0IjoiTW9saW5hIn0sIl9pZCI6IjYyMDE0Y2RhNGM2NGEzNGNjODg4MWJmZCIsImVtYWlsIjoid2FsdGVybW9saW5hQG1zbi5jb20iLCJ1c2VybmFtZSI6IndhbHRlcm1vbGluYSIsIl9fdiI6MH0sImlhdCI6MTcyODUyNTQ2NiwiZXhwIjoxNzI4NjExODY2fQ.31XEHC0k0hL3XZbzhpZc4ckCsTlKcarDZsQxnXwYkMs",
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const { data } = await response.json();

        return data;
    }

    const [state, setState] = useState({
        data: null,
        loading: true
    });

    useEffect(() => {
        getProjectsById(projectId)
            .then(project => {
                setState({
                    data: project,
                    loading: false
                });
            })
            .catch(() => {
                setState({
                    data: null,
                    loading: false
                });
            });
    }, [projectId]); // Agregado projectId como dependencia

    return state;
}
