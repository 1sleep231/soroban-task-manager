import { useState } from "react";

function App({ cardColors }) {
  const [notes, setNotes] = useState([
    { id: 1, title: "Welcome to StellarNotes", content: "Click the edit button to change this note, or create a new one!", colorIndex: 0 },
    { id: 2, title: "What is Stellar Soroban?", content: "Soroban is a smart contract platform built into the Stellar network.", colorIndex: 1 },
    { id: 3, title: "Deploy your first contract", content: "Use the stellar CLI to deploy and interact with smart contracts on testnet.", colorIndex: 2 },
  ]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Fungsi ketika tombol "Create Note" di tekan
  const handleCreate = (e) => {
    const colorIndex = notes.length % cardColors.length;

    // Menambahkan note baru ke variable notes
    setNotes([...notes, { id: Date.now(), title, content, colorIndex }]);

    // Tutup modal
    closeModal();
  };

  // Fungsi ketika tombol "Edit Note" di tekan
  const handleUpdate = (id) => {
    // Mengupdate note yang sedang di edit
    setNotes(notes.map((note) => (note.id === id ? { ...note, title, content } : note)));

    // Tutup modal
    closeModal();
  };

  // Fungsi ketika tombol Delete di tekan
  const handleDelete = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const closeModal = () => {
    setTitle("");
    setContent("");
    setEditingId(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Top Navbar */}
      <nav className="flex items-center px-8 py-5 border-b border-gray-100">
        <span className="font-bold text-xl tracking-tight mr-auto">StellarNotes</span>
      </nav>

      <div className="flex">
        {/* Left Sidebar FAB */}
        <aside className="flex flex-col items-center px-6 pt-8 gap-4">
          <button onClick={() => setIsModalOpen(true)} className="w-11 h-11 bg-gray-900 hover:bg-gray-700 text-white rounded-full flex items-center justify-center shadow-md transition-all active:scale-95 cursor-pointer" title="Create new note">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-6 pt-8 pb-16">
          <h1 className="text-5xl font-bold mb-10 tracking-tight">Notes</h1>

          {notes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-gray-400">
              <p className="text-lg">
                No notes yet. Hit the <span className="font-bold text-gray-900">+</span> button to start.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {notes.map((note) => (
                <div key={note.id} className={`${cardColors[note.colorIndex % cardColors.length]} rounded-3xl p-6 flex flex-col gap-4 relative group h-56`}>
                  {/* Edit button top-right */}
                  <button
                    onClick={() => {
                      if (!window.confirm("Delete this note?")) return;
                      handleDelete(note.id);
                    }}
                    className="absolute top-4 right-4 w-9 h-9 bg-gray-900 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 cursor-pointer"
                    title="Delete note">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  {/* Title */}
                  <h3 className="text-xl font-bold leading-snug pr-8 text-gray-900">{note.title}</h3>

                  {/* Content */}
                  <p className="text-sm text-gray-700 leading-relaxed flex-grow">{note.content}</p>

                  {/* Footer */}
                  <div className="flex justify-end items-center mt-auto">
                    <button
                      onClick={() => {
                        setTitle(note.title);
                        setContent(note.content);
                        setEditingId(note.id);
                        setIsModalOpen(true);
                      }}
                      className="w-9 h-9 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer"
                      title="Edit note">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 1 1 3.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => {
              setTitle("");
              setContent("");
              setEditingId(null);
              setIsModalOpen(false);
            }}></div>

          <div className="relative w-full max-w-md bg-white border border-gray-200 rounded-3xl shadow-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">{editingId ? "Edit Note" : "New Note"}</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-700 transition-colors cursor-pointer">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!title || !content) return;

                if (editingId) {
                  handleUpdate(editingId);
                } else {
                  handleCreate(e);
                }
              }}
              className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1.5">Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all text-sm" placeholder="Give your note a title..." />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1.5">Content</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} required rows="4" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all resize-none text-sm" placeholder="Write something meaningful..." />
              </div>

              <div className="flex items-center justify-end gap-3 mt-2">
                <button type="button" onClick={closeModal} className="px-5 py-2.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors rounded-xl cursor-pointer">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2.5 text-sm font-semibold bg-gray-900 hover:bg-gray-700 text-white rounded-xl transition-all active:scale-95 cursor-pointer">
                  {editingId ? "Edit Note" : "Create Note"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
