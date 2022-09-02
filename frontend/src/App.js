import Home from "./pages/home/Home";
import TopBar from "./components/topbar/TopBar";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { Route, Outlet, Routes } from "react-router-dom";
import Protected from "./components/protected";
import UserPage from "./pages/users/UserPage";


function App() {

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="/" element={<Protected><TopBar /><Outlet /></Protected>}>
        <Route index element={<Home />} />

        <Route path="write" element={<Write />} />
        <Route path="settings" element={<Settings />} />
        <Route path="users" element={<UserPage />} />
        <Route path="post/:postId" element={<Single />} />
      </Route>
    </Routes>
  );
}

export default App;
