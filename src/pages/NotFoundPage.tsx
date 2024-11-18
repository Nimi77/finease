import { RxDoubleArrowLeft } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/dashboard");
  };

  return (
    <div className="h-screen flex flex-col gap-2 items-center justify-center text-gray-800 max-w-sm mx-auto px-4">
      <h1 className="text-2xl font-medium">404 - Page Not Found</h1>

      <button
        onClick={navigateHome}
        className="mt-6 flex items-center justify-center hover:text-linkText transition-transform transform hover:-translate-x-1"
      >
        <RxDoubleArrowLeft className="mr-1 animate-pulse" aria-hidden="true" />{" "}
        Go Back Home
      </button>
    </div>
  );
}
