import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { BigSidebar, Navbar, SmallSidebar } from "../components";
import customFetch from "../utils/customerFetch";
import Wrapper from "../assets/wrappers/Dashboard";
import {toast} from "react-toastify"
import { useState, useContext, createContext } from "react";

export const loader = async () => {
  try {
    const { data } = await customFetch.get('/users/current-user')
    return data
  } catch (error) {
    return redirect('/')
  }
}

const DashboardContext = createContext();

const DashboardLayout = ({ isDashboardEnabled }) => {
  const { user } = useLoaderData();
  const navigate = useNavigate()

  // temp
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(isDashboardEnabled);

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    navigate('/')
    await customFetch.get('/auth/logout')
    toast.success('logged out')
  };
  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar></SmallSidebar>
          <BigSidebar></BigSidebar>
          <div>
            <Navbar></Navbar>
            <div className="dashboard-page">
              <Outlet context={{user}}></Outlet>
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
