import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Dashboard/Loader";

const HomePage = () => {
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
      navigate(path);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {showLoader ? (
        <Loader/>
      ) : (
        <>
          <header className="text-center">
            <h1 className="text-4xl font-bold text-primaryText">
              Welcome to Finease
            </h1>
            <p className="text-gray-600 mt-2 max-w-xl mx-auto">
              Your gateway to financial management. Simplify budgeting, track
              expenses, and achieve financial goals with ease.
            </p>
          </header>

          <div className="flex space-x-6 mt-12 mb-8">
            <button
              onClick={() => handleNavigation("/login")}
              className="px-8 py-2 text-white font-semibold text-[0.94rem] bg-secondary rounded hover:bg-active transition-transform transform ease-in-out hover:scale-105 duration-300 shadow"
            >
              Login
            </button>
            <button
              onClick={() => handleNavigation("/register")}
              className="px-6 py-2 text-white font-semibold text-[0.92rem] bg-active rounded hover:bg-active transition-transform ease-in-out transform hover:scale-105 duration-300 shadow"
            >
              Register
            </button>
          </div>

          <footer className="text-gray-500">
            <p>
              &copy; {new Date().getFullYear()} Finease. All rights reserved.
            </p>
          </footer>
        </>
      )}
    </div>
  );
};

export default HomePage;
