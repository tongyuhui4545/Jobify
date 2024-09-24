import { Outlet } from "react-router-dom";
import { BigSidebar, Navbar, SmallSidebar } from "../components";
import Wrapper from "../assets/wrappers/Dashboard";
import { useState, useContext, createContext } from "react";

const DashboardContext = createContext();

const DashboardLayout = ({isDashboardEnabled}) => {
  // temp
  const user = { name: "john" };
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
    console.log("gaga");
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
              <Outlet></Outlet>
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
