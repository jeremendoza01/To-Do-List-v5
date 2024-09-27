import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ProjectProvider } from "./context/ProjectContext";
import "./index.css";
import router from "./routes/Routers"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProjectProvider>
      <RouterProvider router={router} />
    </ProjectProvider>
  </StrictMode>
);