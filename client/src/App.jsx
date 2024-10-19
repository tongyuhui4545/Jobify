import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  AddJob,
  Admin,
  AllJobs,
  DashboardLayout,
  DeleteJob,
  EditJob,
  Error,
  HomeLayout,
  Landing,
  Login,
  Profile,
  Register,
  Stats,
} from "./pages";
import {action as registerAction }  from "./pages/Register"
import {action as loginAction }  from "./pages/Login"

import {action as registerAction} from './pages/Register';

const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme
};

const isDarkThemeEnabled = checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Landing /> },
<<<<<<< HEAD
      {
        path: "register", element: <Register />, 
        action: registerAction
      },
      { path: "login", element: <Login />, action: loginAction },
=======
      { path: "register", element: <Register />, action: registerAction},
      { path: "login", element: <Login /> },
>>>>>>> 5be76ac8dd8d2d2c3a3b694e721af8a8a3c2aa44
      {
        path: "dashboard",
        element: <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled} />,
        children: [
          { index: true, element: <AddJob /> },
          { path: "stats", element: <Stats /> },
          { path: "all-jobs", element: <AllJobs /> },
          { path: "profile", element: <Profile /> },
          { path: "admin", element: <Admin /> }
        ],
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
