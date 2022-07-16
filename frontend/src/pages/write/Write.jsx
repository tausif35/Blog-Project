import { useState } from "react";
import "./write.css";
import axios from "../../axios";

export default function Write() {
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      title,
      description
    };
    try {
      const res = await axios.post("/blogs/write", newPost);
      window.location.replace("/post/" + res.data.blogId);
    } catch (err) { console.log(err) }
  };
  return (
    <div className="write">
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={e => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
