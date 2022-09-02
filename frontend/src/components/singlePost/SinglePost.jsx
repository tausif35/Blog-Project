import axios from "../../service/api";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./singlePost.css";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    console.log(path)
    const getPost = async () => {
      const res = await axios().get("/blogs/blog/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.description);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios().delete(`/blogs/delete/${post.blogId}`);
      window.location.replace("/");
    } catch (err) { }
  };

  const handleUpdate = async () => {
    try {
      await axios().patch(`/blogs/edit`, {

        blogId: post.blogId,
        title,
        description,
      });
      setUpdateMode(false)
    } catch (err) { }
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}

          </h1>
        )}
        <span className="singlePostAuthor">
          Author:
          <Link to={`/?user=${post.userId}`} className="link">
            <b> {post.name}</b>
          </Link>
        </span>
        <span className="singlePostDate">
          {new Date(post.dateCreated).toDateString()}
        </span>
        {post.name === user?.name && (
          <div className="singlePostEdit">
            <i
              className="singlePostIcon far fa-edit"
              onClick={() => setUpdateMode(true)}
            ></i>
            <i
              className="singlePostIcon far fa-trash-alt"
              onClick={handleDelete}
            ></i>
          </div>
        )}
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={description}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{description}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
