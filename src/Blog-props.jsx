import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { addNote, selectFavorites } from './noteFavoriteSlice';


const Blogprop = ({note, title}) => {
  const favoriteNotes = useSelector(selectFavorites);
  const dispatch = useDispatch();
  const addNoteToFavorites = (note) => {
    dispatch(addNote(note));
  }
  return (
    <div className="blog-list-container">
      <h2 className="blog-list-title">{title}</h2>
      <div className="blog-cards">
        {(!note || note.length === 0) && (
          <p style={{gridColumn:'1 / -1', textAlign:'center', color:'#666'}}>No notes available.</p>
        )}
        {note && note.map((n) => {
          const isFav = favoriteNotes.some(f => f.id === n.id);
          return (
            <div key={n.id} className="blog-card">
              <Link to={`/blog/${n.id}`} className="blog-card-link">
                <h3 className="blog-card-title">{n.title}</h3>
                <span className="blog-card-author">{n.author}</span>
              </Link>
              <button
                className={`blog-fav-btn${isFav ? ' favorited' : ''}`}
                onClick={() => !isFav && addNoteToFavorites(n)}
                disabled={isFav}
              >
                {isFav ? 'Favorited' : 'Add to Favorites'}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Blogprop;