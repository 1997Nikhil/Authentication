import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function Home() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="home">
      <h1>JWT Authentication App</h1>

      {isAuthenticated ? (
        <>
          <h2>
            Welcome {user?.email}
          </h2>

          <Link to="/profile">
            Go to Profile
          </Link>
        </>
      ) : (
        <>
          <p>
            You are not logged in.
          </p>

          <Link to="/login">
            Login
          </Link>

          {" | "}

          <Link to="/register">
            Register
          </Link>
        </>
      )}
    </div>
  );
}

export default Home;