import React from 'react'
import User from '../user/User';
import "./users.css";

function Users({ users }) {
  return (
    <div className="users">
      {users.map((u) => (
        <User user={u} />
      ))}
    </div>
  );
}

export default Users