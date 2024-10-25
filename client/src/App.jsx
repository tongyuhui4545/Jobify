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
import { action as registerAction } from "./pages/Register"
import { action as loginAction } from "./pages/Login"
import { loader as dashboardLoader } from './pages/DashboardLayout'
import { action as addJobAction } from './pages/AddJob'
import { loader as allJobsLoader } from './pages/AllJobs'

import { loader as editJobLoader } from './pages/EditJob'
import { action as editJobAction } from './pages/EditJob'

import { loader as adminLoader } from './pages/Admin'
import { action as profileAction } from './pages/Profile'





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
      { path: "login", element: <Login />, action: loginAction },
      { path: "register", element: <Register />, action: registerAction },
      { path: "login", element: <Login /> },
      {
        path: "dashboard",
        element: <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled} />,
        loader: dashboardLoader,
        children: [
          { index: true, element: <AddJob />, action: addJobAction },
          { path: "stats", element: <Stats /> },
          { path: "all-jobs", element: <AllJobs />, loader: allJobsLoader },
          { path: "profile", element: <Profile />, action: profileAction },
          { path: "admin", element: <Admin />, loader: adminLoader },
          { path: "edit-job/:id", element: <EditJob />, loader: editJobLoader, action: editJobAction },
        ],
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
