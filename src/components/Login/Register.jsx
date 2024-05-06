import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { getMediums } from "../../services/resourceServices.js";

export const Register = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    preferred_medium: 0,
    bio: "",
    phone_number: 0,
    address: "",
  });
  const [mediums, setMediums] = useState([]);


  const navigate = useNavigate();

  useEffect(() => {
    // Fetch mediums when component mounts
    const fetchMediums = async () => {
      try {
        const data = await getMediums();
        setMediums(data);
      } catch (error) {
        console.error("Error fetching mediums:", error);
      }
    };
    fetchMediums();
  }, []);

  const createUser = async (newUser) => {
    try {
      const response = await fetch("http://localhost:8000/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        const createdUser = await response.json();
        return createdUser;
      } else {
        throw new Error("Error creating user");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const createdUser = await createUser(user);
      localStorage.setItem(
        "art_user",
        JSON.stringify({
          id: createdUser.id,
          token: createdUser.token,
        })
      );
      navigate("/");
    } catch (error) {
      console.error("Error registering user:", error);
      // You can handle errors here, e.g., display an error message to the user
    }
  };

  const updateUser = (evt) => {
    const { id, value } = evt.target;
    setUser((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));
  };

  return (
    <main style={{ textAlign: "center" }}>
      <form className="form-login" onSubmit={handleRegister}>
        <h1>Muse</h1>
        <h2>Please Register</h2>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateUser}
              type="text"
              id="first_name"
              className="form-control"
              placeholder="Enter your first name"
              required
              autoFocus
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateUser}
              type="text"
              id="last_name"
              className="form-control"
              placeholder="Enter your last name"
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateUser}
              type="email"
              id="email"
              className="form-control"
              placeholder="Email address"
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateUser}
              type="text"
              id="username"
              className="form-control"
              placeholder="Enter your desired username"
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateUser}
              type="password"
              id="password"
              className="form-control"
              placeholder="Password"
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateUser}
              type="integer"
              id="phone_number"
              className="form-control"
              placeholder="Phone Number"
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateUser}
              type="text"
              id="bio"
              className="form-control"
              placeholder="Bio"
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateUser}
              type="text"
              id="address"
              className="form-control"
              placeholder="Address"
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="preferred_medium">Preferred Medium:</label>
            <select
              onChange={(e) => setUser((prevUser) => ({
                ...prevUser,
                preferred_medium: parseInt(e.target.value),
              }))}
              className="form-control"
              id="preferred_medium"
              required
            >
              <option value="">Select Preferred Medium</option>
              {mediums.map((medium) => (
                <option key={medium.id} value={medium.id}>
                  {medium.type}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <button className="login-btn btn-info text-dark" type="submit">
              Register
            </button>
          </div>
        </fieldset>
      </form>
    </main>
  );
};
