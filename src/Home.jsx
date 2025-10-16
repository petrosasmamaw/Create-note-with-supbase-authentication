import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Blogprop from "./Blog-props";
import { fetchNotes, selectAllNotes, selectIsLoading, selectError } from "./noteSlice";

const Home = ({ user }) => {
  const allNotes = useSelector(selectAllNotes);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) dispatch(fetchNotes(user.id));
  }, [dispatch, user]);

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {allNotes && <Blogprop note={allNotes} title="My Notes" />}
    </div>
  );
};

export default Home;
