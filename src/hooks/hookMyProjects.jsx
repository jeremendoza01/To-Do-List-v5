import { useEffect, useState } from "react"

export const useFetchProjects = () => {

    const getProjects = async () => {
        const url = 'https://lamansysfaketaskmanagerapi.onrender.com/api/projects'
        const resp = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                auth: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOnsiZmlyc3QiOiJXYWx0ZXIiLCJsYXN0IjoiTW9saW5hIn0sIl9pZCI6IjYyMDE0Y2RhNGM2NGEzNGNjODg4MWJmZCIsImVtYWlsIjoid2FsdGVybW9saW5hQG1zbi5jb20iLCJ1c2VybmFtZSI6IndhbHRlcm1vbGluYSIsIl9fdiI6MH0sImlhdCI6MTcyODMxNjAxNiwiZXhwIjoxNzI4NDAyNDE2fQ.o9-ROZVdGe5_GZoaD62uVWVEibjQEuXdzOGM8XuLvXE',
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