import { useEffect, useState } from "react";
import { API_URL } from "../api"

export const useFetchTasksStory = (storyId) => {
    const [state, setState] = useState({
        data: [],
        loading: true,
    });

    const getTaskStory = async (storyId) => {
        const url = `${API_URL}/stories/${storyId}/tasks`

        const resp = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                auth: localStorage.getItem('authToken')
            }
        })

        const { data } = await resp.json()
        return data;
    }

    useEffect(() => {
        getTaskStory(storyId)
            .then(tasks => {
                setState({
                    data: tasks,
                    loading: false
                })
            })
            .catch((err) => {
                console.log(err)
                setState({
                    data: [],
                    loading: false
                })
            })
    }, [])

    return state;
};
