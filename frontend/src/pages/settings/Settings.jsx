import "./settings.css";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "../../service/api";

export default function Settings() {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDob] = useState(null);
  const [gender, setGender] = useState(null);
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      name,
      email,
      dateOfBirth,
      gender
    };
    try {
      const res = await axios().patch("/users/profile/", updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      console.log(err)
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>

        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>

          <label>name</label>
          <input
            type="text"
            placeholder={user.name}
            onChange={(e) => setname(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          /> */}
          <label>Date Of Birth</label>
          <input
            type="date"
            placeholder={user.dateOfBirth}
            onChange={(e) => setDob(e.target.value)}
          />
          <label>Gender</label>
          <input
            type="text"
            placeholder={user.gender}
            onChange={(e) => setGender(e.target.value)}
          />
          <button className="settingsSubmit" type="submit">
            Update
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}
        </form>
      </div>
    </div>
  );
}
