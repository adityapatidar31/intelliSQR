import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import Navbar from "./components/components/Navbar";
import LoginPage from "./components/components/pages/LoginPage";
import SignupPage from "./components/components/pages/SignupPage";
import HomePage from "./components/components/pages/Homepage";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();
const Layout = () => {
  return (
    <div>
      <Navbar />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

function App() {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={false}
        draggable
        theme={theme}
      />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
