import { useEffect, useState } from "react";
import { API_URL } from "../api"
export const hookStories = () => {

    const getStories = async () => {
        const url = `${API_URL}/stories`
        const resp = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                auth: localStorage.getItem('token')
            }
        })

        const { data } = await resp.json()
        return data;
    }

    const [state, setState] = useState({
        data: [],
        loading: true
    });

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const stories = await getStories();
                setState({ data: stories, loading: false });
            } catch (err) {
                console.log(err);
                setState({ data: [], loading: false });
            }
        };

        fetchStories();
    }, []);


    return state;
}

