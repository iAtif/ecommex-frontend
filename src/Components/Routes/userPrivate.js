import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Spinner from "../Spinner";
import toast from "react-hot-toast";

export default function PrivateRoute() {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = () => {
      // Check if user data is present in local storage
      const user = JSON.parse(localStorage.getItem("auth"));
      if (!user) {
        // User data not found, navigate to login page after 5 seconds
        setTimeout(() => {
          toast.error("Please Login");
          navigate("/login");
        }, 1000);
        return;
      }

      // User data found, user is authenticated
      setAuthenticated(true);
    };

    checkAuthentication();
  }, [navigate]);

  return authenticated ? <Outlet /> : <Spinner />;
}
