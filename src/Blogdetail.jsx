import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

const Blogdetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      const { data, error } = await supabase.from("notes").select("*").eq("id", id).single();
      if (error) setError(error.message);
      else setNote(data);
    };
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    await supabase.from("notes").delete().eq("id", id);
    navigate("/");
  };

  if (error) return <div>{error}</div>;
  if (!note) return <div>Loading...</div>;

  return (
    <div className="blog-detail">
      <h2>{note.title}</h2>
      <p>By {note.author}</p>
      <div className="blog-body">{note.content}</div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Blogdetail;
