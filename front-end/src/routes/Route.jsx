import { createBrowserRouter } from "react-router-dom";
import Home from "src/components/Home";

export const AppRoute = createBrowserRouter([
    {
        path:'/',
        element:<Home/>
    }
])