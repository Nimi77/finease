import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader1 } from "../components/Dashboard/Loader";

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
    <>
      {showLoader ? (
        <Loader1 aria-label="Loading content, please wait." />
      ) : (
        <main
          className="m-auto flex flex-col items-center justify-center"
          aria-labelledby="main-heading"
        >
          <div className="text-center px-4">
            <header>
              <h1
                id="main-heading"
                className="text-3xl font-bold text-primaryText"
              >
                Welcome to Finease
              </h1>
              <p className="text-gray-600 mt-2 max-w-xl">
                Your gateway to financial management. Simplify budgeting, track
                expenses, and achieve financial goals with ease.
              </p>
            </header>

            <div className="flex justify-center space-x-6 mt-12 mb-8">
              <button
                onClick={() => handleNavigation("/login")}
                className="px-8 py-2 text-white font-semibold bg-secondary rounded hover:bg-active transition-transform transform ease-in-out hover:scale-105 duration-300 shadow"
                aria-label="Navigate to login page"
              >
                Login
              </button>
              <button
                onClick={() => handleNavigation("/register")}
                className="px-6 py-2 text-white font-semibold bg-active rounded hover:bg-active transition-transform ease-in-out transform hover:scale-105 duration-300 shadow"
                aria-label="Navigate to register page"
              >
                Register
              </button>
            </div>

            <footer className="text-gray-500">
              <p>
                &copy; {new Date().getFullYear()} Finease. All rights reserved.
              </p>
            </footer>
          </div>
        </main>
      )}
    </>
  );
};

export default HomePage;
