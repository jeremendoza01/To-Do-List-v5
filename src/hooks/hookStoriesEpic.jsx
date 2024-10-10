import { useEffect, useState } from "react"

export const useFetchStoriesEpic = (epicId) => {

    const [state, setState] = useState({
        data: [],
        loading: true
    })

    const getStoriesEpic = async (epicId) => {
        const url = `https://lamansysfaketaskmanagerapi.onrender.com/api/epics/${epicId}/stories`
        const resp = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                auth: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOnsiZmlyc3QiOiJXYWx0ZXIiLCJsYXN0IjoiTW9saW5hIn0sIl9pZCI6IjYyMDE0Y2RhNGM2NGEzNGNjODg4MWJmZCIsImVtYWlsIjoid2FsdGVybW9saW5hQG1zbi5jb20iLCJ1c2VybmFtZSI6IndhbHRlcm1vbGluYSIsIl9fdiI6MH0sImlhdCI6MTcyODUyNTQ2NiwiZXhwIjoxNzI4NjExODY2fQ.31XEHC0k0hL3XZbzhpZc4ckCsTlKcarDZsQxnXwYkMs"
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