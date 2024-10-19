import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Homepage from "./components/layout/Homepage";
import AuthLayout from "./components/layout/AuthLayout";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import Posts from "./components/posts/Posts";
import UpdateRole from "./components/auth/UpdateRole";
import EditSinglePost from "./components/posts/EditSinglePost";
import CreatePost from "./components/posts/CreatePost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "posts", element: <Posts /> },
      { path: "/posts/:id", element: <EditSinglePost /> },
      { path: "/posts/create", element: <CreatePost /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "update-role", element: <UpdateRole /> },
    ],
  },
]);

export default router;
