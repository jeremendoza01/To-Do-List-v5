import { useState, useEffect } from "react";
import { API_URL } from "../api"
export const useFetchProjectsById = (projectId) => {

    const getProjectsById = async (projectId) => {
        const url = `${API_URL}/projects/${projectId}`

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                auth: localStorage.getItem('token')
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
