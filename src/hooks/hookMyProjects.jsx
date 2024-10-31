import { useEffect, useState } from "react"
import { API_URL } from "../api";
export const useFetchProjects = () => {

    const getProjects = async () => {
        const url = `${API_URL}/projects`
        const resp = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                auth: localStorage.getItem('authToken'),
            }
        });
        const { data } = await resp.json();
        return data;
    }


    const [state, setState] = useState({
        data: [],
        loading: true
    })

    useEffect(() => {
        getProjects()
            .then(projects => {
                setState({
                    data: projects,
                    loading: false,
                })
            })
            .catch(() => {
                setState({
                    data: [],
                    loading: false
                })
            }
            )
    }, [])

    return state;
}