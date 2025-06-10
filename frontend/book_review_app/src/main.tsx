import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AddBook from './component/add_book/AddBook.tsx';
import BookShowAll from './component/book_show_all/BookShowAll.tsx';
import Login from './component/login/Login.tsx';
import Review from './component/review/Review.tsx';
import Signup from './component/signup/Signup.tsx';
import { AuthProvider } from './auth/Auth.tsx';
import { ProtectedRoute } from './auth/ProtecedRouter.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element:
     <AuthProvider>
        <App />
     </AuthProvider>
   
     ,
    children: [
      {
        path: "add/book",
        element: (
          <ProtectedRoute>
            <AddBook />
          </ProtectedRoute>
        ),
      },
      {
        path: "home",
        element: (
            <BookShowAll />
        ),
      },
      {
        path: "/login",
        element: (
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        ),
      },

        {
        path: "/review",
        element: (
          <ProtectedRoute>
            <Review />
          </ProtectedRoute>
        ),
      },  {
        path: "/signup",
        element: (
          <ProtectedRoute>
            <Signup />
          </ProtectedRoute>
        ),
      },

    ],
  },
]);
createRoot(document.getElementById('root')!).render(

 <StrictMode>
 <RouterProvider router={router} />
  </StrictMode>

)
