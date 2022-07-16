import "./post.css";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  return (
    <div className="post">
      <div className="postInfo">
        <Link to={`/post/${post.blogId}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">
          {new Date(post.dateCreated).toDateString()}
        </span>
      </div>
      <p className="postDesc" style={{ textAlign: 'center' }}>{post.description}</p>
    </div>
  );
}
