import { useEffect, useState } from "react";
import { API_URL } from "../api";

export const useFetchTasksStory = (storyId) => {
    const [state, setState] = useState({
        data: [],
        loading: true,
    });

    const fetchTasks = async () => {
        setState({ data: [], loading: true }); // Resetear el estado antes de la carga
        try {
            const response = await fetch(`${API_URL}/stories/${storyId}/tasks`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    auth: localStorage.getItem('authToken'),
                },
            });
            const result = await response.json();
            setState({ data: result.data || [], loading: false });
        } catch (error) {
            console.error("Error fetching tasks:", error);
            setState({ data: [], loading: false });
        }
    };

    useEffect(() => {
        if (storyId) {
            fetchTasks(); // Llama a fetchTasks solo si storyId está definido
        }
    }, [storyId]);

    return {
        data: state.data,
        loading: state.loading,
        refetch: fetchTasks, // Proveer refetch para recargar las tareas
    };
};
