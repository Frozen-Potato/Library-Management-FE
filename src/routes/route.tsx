import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";


import { Layout } from "../layout/Layout";
import { ErrorPage } from "../error/ErrorPage";

import { config } from "../config";
import { BooksList } from "../books/components/BooksList";
import { BookSingle } from "../books/components/BookSingle";
import UserProfile from "../user/components/UserProfile";

export const router = createBrowserRouter([
    {
        path: `${config.landingURL}`,
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: <BooksList />
            },
            {
                path: 'Books/:ISBN',
                element: <BookSingle />
            },
            { 
                path: "Profile", 
                element: <UserProfile />
            },
            { 
                path: "*", 
                element: <Navigate to="/" replace /> 
            }
        ]

    }
])