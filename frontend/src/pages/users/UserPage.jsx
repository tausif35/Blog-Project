import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import axios from "../../service/api";
import Users from "../../components/users/Users";
import "./userpage.css";

export default function UserPage() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios().get("/users/");
      setUsers(res.data);
    };
    fetchUsers();
  }, []);
  return (
    <>
      <Header />
      <div className="users">
        <Users users={users} />
      </div>
    </>
  );
}
