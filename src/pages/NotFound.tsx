import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="text-center flex flex-col justify-center items-center">
      <div className="text-center flex flex-col justify-center items-center mt-20 max-w-[664px]">
        <img
          src="/images/404.png"
          alt="Page Not Found"
          className="max-w-[600px]"
        />
        <h1 className="text-4xl font-bold text-txtBlack">Page Not Found</h1>
        <p className="text-lg text-gray-500">
          We’re sorry, the page you requested could not be found. Please go back
          to the homepage.
        </p>
        <button
          onClick={goHome}
          className="bg-blue-600 rounded-md text-whitetext-center text-[20px] font-semibold leading-[1.3] text-white w-52 py-4 mt-8"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}

export default NotFound;
