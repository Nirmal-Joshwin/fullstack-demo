import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../api";

export default function Dashboard() {
  const { user, token, logout } = useAuth();
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  // Fetch the user's notes from the database on mount.
  useEffect(() => {
    async function load() {
      try {
        const data = await api.getNotes(token);
        setNotes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [token]);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function addNote(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;
    setBusy(true);
    setError("");
    try {
      const note = await api.createNote(form, token);
      setNotes([note, ...notes]); // optimistic prepend
      setForm({ title: "", content: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function removeNote(id) {
    const prev = notes;
    setNotes(notes.filter((n) => n._id !== id)); // optimistic
    try {
      await api.deleteNote(id, token);
    } catch (err) {
      setError(err.message);
      setNotes(prev); // roll back on failure
    }
  }

  return (
    <div className="dash">
      <header className="topbar">
        <span className="brand">Inkwell</span>
        <div className="topbar-right">
          <span className="muted">Hi, {user?.name}</span>
          <button className="ghost" onClick={logout}>
            Log out
          </button>
        </div>
      </header>

      <main className="dash-main">
        <section className="composer">
          <h2>New note</h2>
          <form onSubmit={addNote}>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={update}
              placeholder="Title"
              maxLength={120}
            />
            <textarea
              name="content"
              value={form.content}
              onChange={update}
              placeholder="Write something worth keeping…"
              rows={4}
              maxLength={5000}
            />
            <button type="submit" disabled={busy}>
              {busy ? "Saving…" : "Add note"}
            </button>
          </form>
        </section>

        {error && <div className="alert">{error}</div>}

        <section className="notes">
          <h2>
            Your notes <span className="count">{notes.length}</span>
          </h2>

          {loading ? (
            <p className="muted">Loading your notes…</p>
          ) : notes.length === 0 ? (
            <p className="empty">No notes yet. Write your first one above.</p>
          ) : (
            <div className="note-grid">
              {notes.map((note) => (
                <article key={note._id} className="note">
                  <button
                    className="del"
                    title="Delete"
                    onClick={() => removeNote(note._id)}
                  >
                    ×
                  </button>
                  <h3>{note.title}</h3>
                  <p>{note.content}</p>
                  <time>
                    {new Date(note.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
