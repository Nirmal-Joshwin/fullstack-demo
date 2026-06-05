import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function Home() {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const navigate = useNavigate()

  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))

  // load notes when page opens
  useEffect(() => {
    getNotes()
  }, [])

  const getNotes = async () => {
    try {
      const res = await axios.get(API + '/api/notes', {
        headers: { Authorization: 'Bearer ' + token }
      })
      setNotes(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const addNote = async (e) => {
    e.preventDefault()
    try {
      await axios.post(API + '/api/notes',
        { title, content },
        { headers: { Authorization: 'Bearer ' + token } }
      )
      setTitle('')
      setContent('')
      getNotes() // refresh notes
    } catch (err) {
      console.log(err)
      alert('Could not add note')
    }
  }

  const deleteNote = async (id) => {
    try {
      await axios.delete(API + '/api/notes/' + id, {
        headers: { Authorization: 'Bearer ' + token }
      })
      getNotes()
    } catch (err) {
      console.log(err)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <div>
      <nav className="navbar">
        <h3>My Notes App</h3>
        <div>
          <span>Hi {user && user.name}</span>
          <button onClick={logout}>Logout</button>
        </div>
      </nav>

      <div className="home-container">
        <div className="card">
          <h2>Add Note</h2>
          <form onSubmit={addNote}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
            <button type="submit">Add</button>
          </form>
        </div>

        <h2 style={{ color: 'white', marginBottom: '15px' }}>Your Notes</h2>
        {notes.length === 0 ? (
          <p style={{ color: 'white' }}>No notes yet.</p>
        ) : (
          notes.map((note) => (
            <div className="note" key={note._id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <button onClick={() => deleteNote(note._id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Home
