import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import token from "../../service/token";
import "./topbar.css";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const PF = "https://www.freeiconspng.com/thumbs/person-icon/person-icon-8.png"

  const handleLogout = () => {
    token.removeUser();
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="top">
      <div className="topLeft">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              BLOGS
            </Link>
          </li>

          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>

          <li className="topListItem">
            <Link className="link" to="/users">
              USERS
            </Link>
          </li>

          <li className="topListItem" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="/settings">
            <img className="topImg" src={PF} alt="" />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
