import React from 'react'
import { Link } from 'react-router-dom'
import { supabase } from './supabaseClient'

const Navbar = ({ user }) => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <div className='navbar'>
      <h1>Peter-note</h1>
      <div className="rightnav">
        {!user ? (
          <>
            <Link to="/login"><button>Login</button></Link>
            <Link to="/signup"><button>Signup</button></Link>
          </>
        ) : (
          <>
            <Link to="/"><button>Home</button></Link>
            <Link to="/create"><button>Create Note</button></Link>
            <Link to="/favorites"><button>Favorites</button></Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar;
