import { useEffect, useState } from "react";
import Posts from "../../components/posts/Posts";
import Header from "../../components/header/Header";
import "./home.css";
import axios from "../../service/api";
import { useSearchParams } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [searchParam] = useSearchParams();
  const id = searchParam.get("user");
  useEffect(() => {
    if (id) {
      console.log(id)
      const fetchPosts = async () => {
        const res = await axios().get("/blogs/user/" + id);
        setPosts(res.data);
      };
      fetchPosts();
    }
    else {
      const fetchPosts = async () => {
        const res = await axios().get("/blogs/");
        setPosts(res.data);
      };
      fetchPosts();
    }
  }, [id]);
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
      </div>
    </>
  );
}
