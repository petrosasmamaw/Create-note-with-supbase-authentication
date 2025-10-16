import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import Navbar from "./Navbar";
import Home from "./Home";
import Create from "./Create";
import Favorites from "./Favorites";
import Blogdetail from "./Blogdetail";
import Login from "./login";
import Signup from "./signup";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check session
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      <Navbar user={user} />
      <Routes>
        {!user ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/create" element={<Create user={user} />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/blog/:id" element={<Blogdetail />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
