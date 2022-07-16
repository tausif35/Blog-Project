import "./post.css";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  return (
    <Link to={`/post/${post.blogId}`} className="post">
      <div className="postInfo">
        <div className="link">
          <span className="postTitle">{post.title}</span>
        </div>
        <hr />
        <span className="postDate">
          {new Date(post.dateCreated).toDateString()}
        </span>
      </div>
      <p className="postDesc" style={{ textAlign: 'center' }}>{post.description}</p>
    </Link>
  );
}
