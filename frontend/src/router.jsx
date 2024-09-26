import { createBrowserRouter } from "react-router-dom";

import NotFound from "./layouts/NotFound";
import HomeLayout from "./layouts/HomeLayout";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Post from "./Pages/Post";
import Job from "./Pages/Job";
import Resume from "./Pages/Resume";
import Course from "./Pages/Course";
import FeedBack from "./Pages/Feedback";
import Login from "./Pages/auth/Login";
import SignUp from "./Pages/auth/Signup";
import Profile from "./Pages/Profile";

const router = createBrowserRouter([
    {
        element: <HomeLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/home",
                element: <Home />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/post",
                element: <Post />,
            },
            {
                path: "/job-section",
                element: <Job />,
            },
            {
                path: "/resume-build",
                element: <Resume />,
            },
            {
                path: "/course",
                element: <Course />,
            },
            {
                path: "/feedback",
                element: <FeedBack />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/sign-up",
        element: <SignUp />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
