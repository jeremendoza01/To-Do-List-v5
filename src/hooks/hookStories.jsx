import { useEffect, useState } from "react";

export const useFetchStories = () => {

    const getStories = async () => {
        const url = `https://lamansysfaketaskmanagerapi.onrender.com/api/stories`
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

