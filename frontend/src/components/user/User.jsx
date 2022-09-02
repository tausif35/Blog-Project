import React from 'react'
import { Link } from 'react-router-dom';
import "./user.css";

function User({ user }) {
  return (
    <Link to={`/?user=${user.userId}`} className="user">
      <div className="userInfo">
        <div className="link">
          <span className="userName">{user.name}</span>
        </div>
        <hr />
        <span className="userEmail">
          {user.email}
        </span>
      </div>
    </Link>
  );
}

export default User