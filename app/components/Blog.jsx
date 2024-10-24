'use client'

import { useState, useEffect } from 'react'
import { PlusCircle, X, Edit, Trash2, Image } from 'lucide-react'

export default function BlogList() {
  const [blogs, setBlogs] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBlog, setEditingBlog] = useState(null)
  const [newBlog, setNewBlog] = useState({ title: '', excerpt: '', imageUrl: '' })
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false)
  const [blogToDelete, setBlogToDelete] = useState(null)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    const response = await fetch('/api/mongo')
    const data = await response.json()
    setBlogs(data)
  }

  const handleAddBlog = async (e) => {
    e.preventDefault();
    const url = '/api/mongo';
    const method = editingBlog ? 'PUT' : 'POST';
    const body = editingBlog ? { ...editingBlog, ...newBlog } : newBlog;

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Failed to save blog post');
      }

      setNewBlog({ title: '', excerpt: '', imageUrl: '' });
      setIsModalOpen(false);
      setEditingBlog(null);
      fetchBlogs();
    } catch (error) {
      console.error('Error saving blog post:', error);
      alert('Failed to save blog post. Please try again.');
    }
  };

  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
    setNewBlog({ title: blog.title, excerpt: blog.excerpt, imageUrl: blog.imageUrl });
    setIsModalOpen(true);
  };

  const handleDeleteBlog = async () => {
    if (!blogToDelete) return;
    try {
      const response = await fetch(`/api/mongo?id=${blogToDelete._id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to delete blog post');
      }
      setIsDeletePopupOpen(false);
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog post:', error);
      alert('Failed to delete blog post. Please try again.');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewBlog({ ...newBlog, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const openDeletePopup = (blog) => {
    setBlogToDelete(blog);
    setIsDeletePopupOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex flex-col gap-5  md:flex-row  justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Travel Blog Posts</h1>
        <button
          onClick={() => {
            setEditingBlog(null)
            setNewBlog({ title: '', excerpt: '', imageUrl: '' })
            setIsModalOpen(true)
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <PlusCircle className="mr-2" size={20} />
          Add Blog
        </button>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
          >
            <img src={blog.imageUrl} alt={blog.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h2>
              <p className="text-gray-600 mb-4">{blog.excerpt}</p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => handleEditBlog(blog)}
                  className="text-blue-500 hover:text-blue-600"
                  aria-label="Edit blog post"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => openDeletePopup(blog)}
                  className="text-red-500 hover:text-red-600"
                  aria-label="Delete blog post"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Adding or Editing Blog */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{editingBlog ? 'Edit Blog Post' : 'Add New Blog Post'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddBlog}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
                <input
                  type="text"
                  id="title"
                  value={newBlog.title}
                  onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="excerpt" className="block text-gray-700 font-bold mb-2">Excerpt</label>
                <textarea
                  id="excerpt"
                  value={newBlog.excerpt}
                  onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Image</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="image"
                    className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
                  >
                    <Image size={20} className="mr-2" />
                    {newBlog.imageUrl ? 'Change Image' : 'Upload Image'}
                  </label>
                  {newBlog.imageUrl && <span className="text-green-500">Image uploaded</span>}
                </div>
              </div>
              {newBlog.imageUrl && (
                <div className="mb-4">
                  <img src={newBlog.imageUrl} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                </div>
              )}
              <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                {editingBlog ? 'Update Blog Post' : 'Add Blog Post'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {isDeletePopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">Are you sure you want to delete this blog?</h2>
            <p className="text-gray-600 mb-6">{blogToDelete?.title}</p>
            <div className="flex justify-between">
              <button
                onClick={handleDeleteBlog}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setIsDeletePopupOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
