import { useEffect, useState } from "react";

export const useFetchTasksStory = (storyId) => {
    const [state, setState] = useState({
        data: [],
        loading: true,
        error: null
    });

    const getTaskStory = async (storyId) => {
        try {
            const url = `https://lamansysfaketaskmanagerapi.onrender.com/api/stories/${storyId}/tasks`;
            const resp = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    auth: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOnsiZmlyc3QiOiJXYWx0ZXIiLCJsYXN0IjoiTW9saW5hIn0sIl9pZCI6IjYyMDE0Y2RhNGM2NGEzNGNjODg4MWJmZCIsImVtYWlsIjoid2FsdGVybW9saW5hQG1zbi5jb20iLCJ1c2VybmFtZSI6IndhbHRlcm1vbGluYSIsIl9fdiI6MH0sImlhdCI6MTcyODUyNTQ2NiwiZXhwIjoxNzI4NjExODY2fQ.31XEHC0k0hL3XZbzhpZc4ckCsTlKcarDZsQxnXwYkMs"
                }
            });

            if (!resp.ok) {
                throw new Error(`Error: ${resp.status} ${resp.statusText}`);
            }

            const { data } = await resp.json();
            return data;
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        let isMounted = true;

        const fetchTaskStory = async () => {
            try {
                const tasks = await getTaskStory(storyId);
                if (isMounted) {
                    setState({ data: tasks, loading: false, error: null });
                }
            } catch (err) {
                if (isMounted) {
                    console.error(err);
                    setState({ data: [], loading: false, error: err.message });
                }
            }
        };

        fetchTaskStory();

        return () => {
            isMounted = false;
        };
    }, [storyId]);

    return state;
};
