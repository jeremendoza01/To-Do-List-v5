import { useEffect, useState } from "react";

export const useFetchStoryById = (idStory) => {
    const [state, setState] = useState({
        data: null,
        loading: true,
        error: null
    });

    const getStoryById = async (idStory) => {
        try {
            const url = `https://lamansysfaketaskmanagerapi.onrender.com/api/stories/${idStory}`;
            const resp = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    auth: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOnsiZmlyc3QiOiJXYWx0ZXIiLCJsYXN0IjoiTW9saW5hIn0sIl9pZCI6IjYyMDE0Y2RhNGM2NGEzNGNjODg4MWJmZCIsImVtYWlsIjoid2FsdGVybW9saW5hQG1zbi5jb20iLCJ1c2VybmFtZSI6IndhbHRlcm1vbGluYSIsIl9fdiI6MH0sImlhdCI6MTcyODUyNTQ2NiwiZXhwIjoxNzI4NjExODY2fQ.31XEHC0k0hL3XZbzhpZc4ckCsTlKcarDZsQxnXwYkMs",
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

        getStoryById(idStory)
            .then(story => {
                if (isMounted) {
                    setState({
                        data: story,
                        loading: false,
                        error: null
                    });
                }
            })
            .catch((err) => {
                if (isMounted) {
                    console.error(err);
                    setState({
                        data: null,
                        loading: false,
                        error: err.message
                    });
                }
            });

        return () => {
            isMounted = false;
        };
    }, [idStory]);

    return state;
};
