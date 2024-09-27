import { createBrowserRouter } from "react-router-dom"
import ErrorPage from "../pages/ErrorPage"
import Home from "../pages/Home"
import { Epic } from "../pages/Epic"
import { MyProjects } from "../pages/MyProjects"
import { Story } from "../pages/Story"
import { MyStories } from "../pages/MyStories"
import ProjectDetails from "../pages/ProjectDetails"
import Settings from "../pages/Settings"
// import Login from "../pages/Login"


const router = createBrowserRouter([{
    path: "/",
    element: <Home />
},
{
    path: "/home",
    element: <Home />
},
{
    path: "my-projects",
    element: <MyProjects />
},
{
    path: "/my-projects/:projectId",
    element: <ProjectDetails />,
},
{
    path: "/my-projects/:projectId/:epicId",
    element: <Epic />,
},
{
    path: "/my-projects/:projectId/:epicId/:storyId",
    element: <Story />,
},
{
    path: "/my-stories",
    element: <MyStories />
},
{
    path: "/settings",
    element: <Settings />
},
{
    path: "*",
    element: <ErrorPage />
}
])


export default router