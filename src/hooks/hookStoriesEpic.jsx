import { useEffect, useState } from "react"
import { API_URL } from "../api"

export const useFetchStoriesEpic = (epicId) => {

    const [state, setState] = useState({
        data: [],
        loading: true
    })

    const getStoriesEpic = async (epicId) => {
        const url = `${API_URL}/epics/${epicId}/stories`
        const resp = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                auth: localStorage.getItem('token'),
            }
        })

        const { data } = await resp.json();
        return data;
    }


    useEffect(() => {
        getStoriesEpic(epicId)
            .then(epics => {
                setState({
                    data: epics,
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
}