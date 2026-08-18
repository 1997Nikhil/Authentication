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
        const response = await api.get(
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