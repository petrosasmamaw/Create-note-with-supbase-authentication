import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

const Create = ({ user }) => {
  const titleRef = useRef();
  const contentRef = useRef();
  const authorRef = useRef();
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const content = contentRef.current.value;
    const author = authorRef.current ? authorRef.current.value : "Anonymous";

    if (title.includes("@")) {
      setError("Title cannot contain '@'");
      return;
    }

    setIsPending(true);

    const { error } = await supabase.from("notes").insert([
      {
        title,
        content,
        author: author || "Anonymous",
        user_id: user.id, // 👈 link to current user
      },
    ]);

    setIsPending(false);
    if (error) setError(error.message);
    else navigate("/");
  };

  return (
    <div className="create-form-container">
      <h2>Create a New Note</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" ref={titleRef} required />
        <textarea placeholder="Content" ref={contentRef} required />
        <input type="text" placeholder="Author" ref={authorRef} />
        <button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create Note"}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Create;
