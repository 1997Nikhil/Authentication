import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext.jsx";

function Profile() {
  const { user, logout } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await api.get(    // This line makes an HTTP GET request to the "/user/profile" endpoint of the backend API using the Axios instance (api) that was created earlier. The request includes the JWT token in the Authorization header, which allows the server to verify the user's identity and return their profile information. If the request is successful, the response will contain the user's data, which is then stored in the profile state using setProfile(response.data.user). If the request fails (e.g., due to an invalid or expired token), an error will be caught, and an error message will be logged to the console.
          "/user/profile"
        );

        setProfile(response.data.user);
      } catch (error) {
        console.log(
          error.response?.data?.message
        );
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="profile-container">
      <h1>Profile</h1>

      {profile ? (
        <div className="profile-card">
          <p>
            <strong>User ID:</strong>{" "}
            {profile.userId}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {profile.email}
          </p>
        </div>
      ) : (
        <p>Unable to load profile</p>
      )}

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Profile;