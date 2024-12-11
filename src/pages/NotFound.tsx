import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="text-center flex flex-col justify-center">
      <img src="/images/404.png" alt="" />
      <h1 className="text-4xl font-bold text-txtBlack">404</h1>
      <p className="text-lg text-gray-500">Page Not Found</p>
      <Link to="/" className="text-hoverBlue hover:underline">
        Go back to Home
      </Link>
    </div>
  );
}

export default NotFound;
