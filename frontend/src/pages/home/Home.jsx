import { useEffect, useState } from "react";
import Posts from "../../components/posts/Posts";
import Header from "../../components/header/Header";
import "./home.css";
import axios from "../../axios";
import { useLocation } from "react-router";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    console.log(search)
    if (search !== '') {
      const id = search.split('=')[1];
      console.log(id)
      const fetchPosts = async () => {
        const res = await axios.get("/blogs/user/" + id);
        setPosts(res.data);
      };
      fetchPosts();
    }
    else {
      const fetchPosts = async () => {
        const res = await axios.get("/blogs/");
        setPosts(res.data);
      };
      fetchPosts();
    }
  }, [search]);
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
      </div>
    </>
  );
}
